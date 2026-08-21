import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support large audio/video base64 payloads
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Lazy Gemini SDK client with User-Agent telemetry
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// JSON Schema for structured analysis
const analysisResponseSchema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      description: 'One of: Meeting, Lecture, Workshop, Interview, Presentation',
    },
    title: {
      type: Type.STRING,
      description: 'Concise, descriptive title for the session',
    },
    duration: {
      type: Type.STRING,
      description: 'Estimated or calculated duration (e.g., 34:20 or 45 mins)',
    },
    executiveSummary: {
      type: Type.OBJECT,
      properties: {
        paragraph1: {
          type: Type.STRING,
          description: 'Paragraph 1: Context, purpose, and main thesis/objective of the session.',
        },
        paragraph2: {
          type: Type.STRING,
          description: 'Paragraph 2: Core discussions, key arguments, or technical concepts taught.',
        },
        paragraph3: {
          type: Type.STRING,
          description: 'Paragraph 3: Outcomes, conclusions, and agreed next steps.',
        },
      },
      required: ['paragraph1', 'paragraph2', 'paragraph3'],
    },
    topics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: {
            type: Type.STRING,
            description: 'Starting timestamp in MM:SS format (e.g., 04:15)',
          },
          seconds: {
            type: Type.INTEGER,
            description: 'Starting timestamp converted to total integer seconds (e.g., 255)',
          },
          title: {
            type: Type.STRING,
            description: 'Descriptive title for this chronological topic or agenda section',
          },
          speaker: {
            type: Type.STRING,
            description: 'Primary speaker name or role if identified, else "Speaker"',
          },
          bullets: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: '2 to 4 comprehensive bullet points summarizing the discussion in this section.',
          },
        },
        required: ['timestamp', 'seconds', 'title', 'bullets'],
      },
      description: 'Chronological list of all distinct sections with MM:SS timestamps',
    },
    actionItems: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          task: {
            type: Type.STRING,
            description: 'Concrete, actionable task description',
          },
          assignee: {
            type: Type.STRING,
            description: 'Assignee name, or "Unassigned" if not explicitly mentioned. Do not hallucinate.',
          },
          deadline: {
            type: Type.STRING,
            description: 'Strict or implied deadline date/time or "TBD"',
          },
          priority: {
            type: Type.STRING,
            description: 'High, Medium, or Low',
          },
          category: {
            type: Type.STRING,
            description: 'Task domain category e.g. Engineering, Assignment, Operations, Security',
          },
        },
        required: ['id', 'task', 'assignee', 'deadline', 'priority'],
      },
      description: 'All specific action items extracted from the recording',
    },
    flashcards: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          question: {
            type: Type.STRING,
            description: 'High-yield conceptual question testing core definitions, equations, or takeaways',
          },
          answer: {
            type: Type.STRING,
            description: 'Detailed, precise explanation and answer',
          },
          category: {
            type: Type.STRING,
            description: 'Category or topic classification',
          },
          keyConcept: {
            type: Type.STRING,
            description: 'Core term, formula, or concept name',
          },
        },
        required: ['id', 'question', 'answer', 'category'],
      },
      description: '6-10 high-yield conceptual flashcards highlighting core concepts, equations, or definitions',
    },
    calendarEvents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: {
            type: Type.STRING,
            description: 'Calendar event summary/title (e.g. Lab 4 Submission, Sprint Review)',
          },
          description: {
            type: Type.STRING,
            description: 'Detailed description of the meeting or submission',
          },
          approximateDateTime: {
            type: Type.STRING,
            description: 'ISO 8601 datetime format or near-future date string e.g. 2026-08-28T14:00:00',
          },
          durationMinutes: {
            type: Type.INTEGER,
            description: 'Estimated duration in minutes (e.g. 30, 60, 90)',
          },
          location: {
            type: Type.STRING,
            description: 'Location, link, or portal if mentioned',
          },
        },
        required: ['id', 'title', 'description', 'approximateDateTime', 'durationMinutes'],
      },
      description: 'Identified deadlines, follow-up meetings, or submission dates mentioned',
    },
    rawTranscript: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          timestamp: { type: Type.STRING },
          seconds: { type: Type.INTEGER },
          speaker: { type: Type.STRING },
          text: { type: Type.STRING },
        },
        required: ['id', 'timestamp', 'seconds', 'speaker', 'text'],
      },
      description: 'Segmented transcript with timestamps and speakers',
    },
    keyTakeaways: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3-5 high-impact summary takeaways',
    },
  },
  required: [
    'category',
    'title',
    'executiveSummary',
    'topics',
    'actionItems',
    'flashcards',
    'calendarEvents',
  ],
};

const SYSTEM_PROMPT = `You are an expert AI transcription and intelligence engine designed to process audio and video recordings of meetings, seminars, and academic lectures.

Your core objectives:
1. Classification: Automatically classify the recording into exactly ONE of: "Meeting", "Lecture", "Workshop", "Interview", or "Presentation".
2. Title: Create a concise, descriptive title capturing the core topic and institution/participants if known.
3. 3-Paragraph Executive Summary:
   - Paragraph 1: Context, purpose, and main thesis/objective.
   - Paragraph 2: Core discussions, key arguments, or technical concepts taught.
   - Paragraph 3: Outcomes, conclusions, and agreed next steps.
4. Chronological Topic Breakdown:
   - Identify every distinct section with its starting timestamp (MM:SS), converted seconds, topic title, and 2-4 comprehensive bullet points summarizing the discussion.
5. Action Items:
   - Extract all specific tasks.
   - Assignee name (or "Unassigned" if not explicitly mentioned - DO NOT hallucinate).
   - Strict or implied deadline (or "TBD").
   - Priority ("High", "Medium", or "Low").
6. Flashcards:
   - Generate 6-10 high-yield conceptual flashcards (Question, Detailed Answer, Category, Key Concept) highlighting core concepts, equations, or definitions.
7. Calendar Events:
   - Identify any deadlines, follow-up meetings, or submission dates mentioned.
   - Provide summary title, description, approximate date/time (ISO format or realistic future datetime), and estimated duration in minutes.
8. Transcript Segments:
   - If audio/video is provided, transcribe with precise MM:SS timestamps and speaker attribution.

Output strictly valid JSON matching the schema.`;

// POST /api/analyze
app.post('/api/analyze', async (req, res) => {
  try {
    const { mediaType, base64Data, mimeType, transcriptText, fileName } = req.body;

    if (!transcriptText && !base64Data) {
      return res.status(400).json({ error: 'Either transcriptText or base64Data (audio/video) must be provided.' });
    }

    const ai = getGeminiClient();
    const contentsParts: any[] = [];

    if (base64Data && mimeType) {
      // Audio or video file payload
      contentsParts.push({
        inlineData: {
          mimeType,
          data: base64Data,
        },
      });
      contentsParts.push({
        text: `Analyze this ${mediaType || 'audio/video'} recording named "${fileName || 'recording'}". Extract all structured intelligence according to instructions. Ensure precise MM:SS timestamps, 3-paragraph executive summary, chronological topic breakdown, strict action items, 6-10 flashcards, and calendar events.`,
      });
    } else {
      // Transcript / Text payload
      contentsParts.push({
        text: `Analyze the following recording transcript named "${fileName || 'transcript'}":\n\n${transcriptText}\n\nPerform full structured analysis according to instructions. Provide accurate MM:SS timestamps, 3-paragraph executive summary, chronological topic breakdown with 2-4 bullets each, action items with assignees and deadlines, 6-10 conceptual flashcards, and calendar events.`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: { parts: contentsParts },
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: analysisResponseSchema as any,
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('No content returned from Gemini model.');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', responseText);
      return res.status(500).json({ error: 'Failed to parse model output as JSON', raw: responseText });
    }

    // Ensure IDs exist for list items
    parsedResult.id = 'analysis-' + Date.now();
    parsedResult.createdAt = new Date().toISOString();
    parsedResult.mediaType = mediaType || 'transcript';
    parsedResult.fileName = fileName || 'Uploaded Recording';

    if (Array.isArray(parsedResult.actionItems)) {
      parsedResult.actionItems = parsedResult.actionItems.map((item: any, idx: number) => ({
        id: item.id || `act-${idx + 1}`,
        task: item.task || 'Task',
        assignee: item.assignee || 'Unassigned',
        deadline: item.deadline || 'TBD',
        priority: item.priority || 'Medium',
        completed: false,
        category: item.category || 'General',
      }));
    }

    if (Array.isArray(parsedResult.flashcards)) {
      parsedResult.flashcards = parsedResult.flashcards.map((fc: any, idx: number) => ({
        id: fc.id || `fc-${idx + 1}`,
        question: fc.question || '',
        answer: fc.answer || '',
        category: fc.category || 'Core Concept',
        keyConcept: fc.keyConcept || '',
        mastered: false,
      }));
    }

    if (Array.isArray(parsedResult.calendarEvents)) {
      parsedResult.calendarEvents = parsedResult.calendarEvents.map((evt: any, idx: number) => ({
        id: evt.id || `cal-${idx + 1}`,
        title: evt.title || 'Follow-up Event',
        description: evt.description || '',
        approximateDateTime: evt.approximateDateTime || new Date(Date.now() + 86400000 * 3).toISOString(),
        durationMinutes: evt.durationMinutes || 60,
        location: evt.location || 'Remote',
      }));
    }

    res.json(parsedResult);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred during audio/video intelligence processing.',
    });
  }
});

// POST /api/chat: Interactive AI Q&A Assistant grounded in the session analysis
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, sessionContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the AI Intelligence Assistant for this recording session.
You have access to the complete session transcript, 3-paragraph executive summary, chronological topic breakdown, action items, flashcards, and calendar events.

Session Context:
${JSON.stringify(sessionContext, null, 2)}

Instructions:
- Provide direct, precise, factually accurate answers grounded strictly in the session content.
- If asked for timestamps, cite the exact MM:SS timestamps.
- If asked for equations or technical definitions, present them clearly.
- If something was not discussed or mentioned in the recording, state clearly that it was not addressed.`;

    const chatMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: chatMessages,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message || 'Chat assistant error.' });
  }
});

// Start Express server with Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Audio & Video Intelligence Engine server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
