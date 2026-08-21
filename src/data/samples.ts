import { SampleRecording } from '../types';

export const SAMPLE_RECORDINGS: SampleRecording[] = [
  {
    id: 'sample-lecture-mit',
    title: 'MIT 6.S191: Deep Learning & Attention Mechanisms',
    category: 'Lecture',
    subtitle: 'Academic seminar on Transformer architectures, self-attention, and loss surfaces',
    duration: '42:15',
    audioTone: 'Academic, Technical, Engaging',
    description: 'Dr. Alexander Amini breaks down self-attention equations, computational scaling, query-key-value dot product formulations, and gradient propagation in modern Large Language Models.',
    transcriptText: `[00:00] Prof. Amini: Welcome everyone to Lecture 4 of Deep Learning. Today we are unpacking one of the foundational breakthroughs in modern AI: Attention Mechanisms and the Transformer Architecture. By the end of this hour, you will understand why recurrent models hit scaling limits and how Query-Key-Value dot-product attention solves sequence modeling in parallel.

[04:20] Prof. Amini: Let us review why RNNs and LSTMs failed to scale. In an RNN, hidden state h_t depends sequentially on h_{t-1}. Backpropagation through time across 10,000 tokens causes severe vanishing gradients and forces serial computation. We cannot leverage GPU tensor cores when step 500 strictly waits on step 499.

[12:45] Prof. Amini: Enter Self-Attention. Given input embeddings X, we project them via learnable weight matrices W_Q, W_K, and W_V into Queries (Q), Keys (K), and Values (V). The core equation is Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V. The scaling factor 1/sqrt(d_k) prevents softmax from saturating into regions with vanishing gradients when dimension d_k is large.

[23:10] Prof. Amini: Notice the computational complexity: computing Q * K^T for sequence length N requires O(N^2 * d) operations. This quadratic memory footprint is why context windows were historically constrained to 512 or 2048 tokens before FlashAttention and ring-attention algorithms were introduced.

[32:40] Prof. Amini: For your lab assignment due this coming Tuesday by 11:59 PM, you are required to implement scaled dot-product attention from scratch in PyTorch without using torch.nn.MultiheadAttention. Make sure to run the unit tests in the notebook before submitting to Gradescope.

[39:00] Prof. Amini: Next Thursday at 2:00 PM EST, we will have a guest lecture from DeepMind on Sparse Attention and Mixture of Experts. Please read Chapter 11 of the course textbook prior to that session. Have a great afternoon.`,
    data: {
      id: 'sample-lecture-mit',
      createdAt: '2026-08-20T10:00:00Z',
      category: 'Lecture',
      title: 'Deep Learning & Attention Mechanisms (MIT 6.S191)',
      duration: '42:15',
      mediaType: 'sample',
      fileName: 'mit_6s191_lecture4_transformers.mp4',
      executiveSummary: {
        paragraph1: 'This academic lecture delivers an in-depth theoretical and mathematical exposition of attention mechanisms, contrasting parallelizable transformer architectures against sequential recurrent neural networks (RNNs and LSTMs) in deep sequence modeling.',
        paragraph2: 'The core discussion centers on the mathematical formulation of Scaled Dot-Product Attention: Attention(Q, K, V) = softmax((QK^T)/sqrt(d_k))V. The professor analyzes why sequential computation in RNNs induces vanishing gradients and prevents massive GPU tensor parallelization, examines the quadratic O(N^2) memory bottleneck of dense attention, and introduces matrix scaling factors to avoid softmax saturation.',
        paragraph3: 'Students are tasked with implementing multi-head attention from scratch in PyTorch for their upcoming lab assignment due Tuesday. The session concludes with a preview of the upcoming guest lecture on Mixture of Experts (MoE) architectures and required textbook preparation.'
      },
      topics: [
        {
          timestamp: '00:00',
          seconds: 0,
          title: 'Introduction to Transformers & Sequence Modeling',
          speaker: 'Prof. Amini',
          bullets: [
            'Outlined core lecture thesis: transitioning from serial sequential recurrence to parallel self-attention.',
            'Defined target learning objectives: mathematical derivations of QKV projections and scaling factors.',
            'Highlighted real-world applications across large language models and multimodal vision architectures.'
          ]
        },
        {
          timestamp: '04:20',
          seconds: 260,
          title: 'Bottlenecks of RNNs, LSTMs & Serial BPTT',
          speaker: 'Prof. Amini',
          bullets: [
            'Analyzed strict sequential dependency h_t = f(h_{t-1}, x_t) preventing parallel GPU acceleration.',
            'Explained vanishing gradient dynamics during backpropagation through time over extended sequences.',
            'Demonstrated information bottleneck when compressing multi-thousand token contexts into single vectors.'
          ]
        },
        {
          timestamp: '12:45',
          seconds: 765,
          title: 'Mathematical Derivation of Scaled Dot-Product Attention',
          speaker: 'Prof. Amini',
          bullets: [
            'Derived linear projections for Query (Q), Key (K), and Value (V) weight matrices from input tensor X.',
            'Formulated the core equation: Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V.',
            'Demonstrated why the scaling term 1/sqrt(d_k) prevents dot-product values from growing excessively large and pushing softmax into zero-gradient saturation.'
          ]
        },
        {
          timestamp: '23:10',
          seconds: 1390,
          title: 'Quadratic O(N^2) Complexity & Modern Mitigations',
          speaker: 'Prof. Amini',
          bullets: [
            'Calculated exact memory and FLOP complexity: O(N^2 * d) for sequence length N and embedding dimension d.',
            'Discussed physical GPU SRAM vs HBM memory hierarchy constraints during attention computation.',
            'Introduced algorithmic optimizations including FlashAttention kernel fusion and sparse attention patterns.'
          ]
        },
        {
          timestamp: '32:40',
          seconds: 1960,
          title: 'Lab 4 Assignment Requirements & PyTorch Implementation',
          speaker: 'Prof. Amini',
          bullets: [
            'Detailed lab specification: building scaled dot-product attention without using native high-level PyTorch abstractions.',
            'Mandated verification against provided automated test suites prior to submission.',
            'Emphasized correct causal masking techniques for autoregressive generation.'
          ]
        },
        {
          timestamp: '39:00',
          seconds: 2340,
          title: 'Upcoming Guest Lecture & Course Logistics',
          speaker: 'Prof. Amini',
          bullets: [
            'Announced DeepMind guest seminar on Mixture of Experts (MoE) and sparse routing.',
            'Assigned Chapter 11 reading from textbook prior to Thursday session.',
            'Reminded students of teaching assistant office hours schedule.'
          ]
        }
      ],
      actionItems: [
        {
          id: 'act-1',
          task: 'Implement scaled dot-product attention and multi-head attention in PyTorch for Lab 4',
          assignee: 'Students',
          deadline: 'Next Tuesday at 11:59 PM EST',
          priority: 'High',
          completed: false,
          category: 'Coursework'
        },
        {
          id: 'act-2',
          task: 'Read Chapter 11 (Sparse Attention & Mixture of Experts) in course textbook',
          assignee: 'Students',
          deadline: 'Next Thursday before 2:00 PM EST',
          priority: 'Medium',
          completed: false,
          category: 'Preparation'
        },
        {
          id: 'act-3',
          task: 'Verify PyTorch unit tests pass on Gradescope auto-grader',
          assignee: 'Students',
          deadline: 'Next Tuesday at 11:59 PM EST',
          priority: 'High',
          completed: false,
          category: 'Submission'
        },
        {
          id: 'act-4',
          task: 'Publish TA office hours Zoom link and lab starter repository updates',
          assignee: 'Teaching Assistants',
          deadline: 'Monday at 9:00 AM EST',
          priority: 'Medium',
          completed: true,
          category: 'Logistics'
        }
      ],
      flashcards: [
        {
          id: 'fc-1',
          question: 'What is the mathematical equation for Scaled Dot-Product Attention?',
          answer: 'Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V, where Q is Query, K is Key, V is Value, and d_k is the dimensionality of the key vectors.',
          category: 'Mathematics & Equations',
          keyConcept: 'Scaled Dot-Product Attention'
        },
        {
          id: 'fc-2',
          question: 'Why is the scaling factor 1/sqrt(d_k) crucial in self-attention?',
          answer: 'For large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradient problem). Scaling by 1/sqrt(d_k) stabilizes variance to 1.',
          category: 'Deep Learning Theory',
          keyConcept: 'Softmax Gradient Saturation'
        },
        {
          id: 'fc-3',
          question: 'Why do Transformers achieve superior training parallelization compared to RNNs?',
          answer: 'RNNs process tokens serially because hidden state h_t depends on h_{t-1}, creating a sequential computational graph. Transformers process all tokens simultaneously using matrix multiplications that fully saturate GPU tensor cores.',
          category: 'Architectures',
          keyConcept: 'Parallel Computation vs Recurrence'
        },
        {
          id: 'fc-4',
          question: 'What is the computational and memory complexity of standard dense attention with respect to sequence length N?',
          answer: 'O(N^2 * d) time complexity and O(N^2) memory footprint to store the attention score matrix, making long context processing computationally intensive without optimizations.',
          category: 'Computational Complexity',
          keyConcept: 'Quadratic Scaling Bottleneck'
        },
        {
          id: 'fc-5',
          question: 'What are the three learned projection matrices in Multi-Head Self-Attention?',
          answer: 'W_Q (Query weights), W_K (Key weights), and W_V (Value weights), which project input embedding vectors X into distinct query, key, and value representation subspaces.',
          category: 'Transformer Components',
          keyConcept: 'QKV Projections'
        },
        {
          id: 'fc-6',
          question: 'What is the purpose of Causal Masking in autoregressive language models (like GPT)?',
          answer: 'Causal masking sets future token attention weights to -infinity before softmax, ensuring position i can only attend to positions j <= i, preventing information leakage from the future during training.',
          category: 'Language Modeling',
          keyConcept: 'Causal Attention Mask'
        },
        {
          id: 'fc-7',
          question: 'How does Multi-Head Attention differ from Single-Head Attention?',
          answer: 'Multi-Head Attention projects Q, K, and V into h different lower-dimensional subspaces, computes attention in parallel for each head, and concatenates the outputs. This allows the model to simultaneously attend to information from different representation subspaces and positions.',
          category: 'Architectures',
          keyConcept: 'Multi-Head Attention'
        },
        {
          id: 'fc-8',
          question: 'What physical hardware bottleneck does FlashAttention address?',
          answer: 'FlashAttention reorganizes the attention computation into tiles to fit within fast GPU on-chip SRAM, minimizing expensive high-bandwidth memory (HBM) read/write IO operations without ever storing the full N x N matrix in HBM.',
          category: 'Hardware Acceleration',
          keyConcept: 'IO-Aware GPU Kernel Fusion'
        }
      ],
      calendarEvents: [
        {
          id: 'cal-1',
          title: 'MIT 6.S191 Lab 4: Attention Mechanism PyTorch Submission',
          description: 'Submit custom PyTorch implementation of Scaled Dot-Product and Multi-Head Attention to Gradescope auto-grader.',
          approximateDateTime: '2026-08-25T23:59:00',
          durationMinutes: 60,
          location: 'Gradescope Portal'
        },
        {
          id: 'cal-2',
          title: 'Guest Lecture: DeepMind on Sparse Attention & MoE',
          description: 'Seminar covering Mixture of Experts routing algorithms, Switch Transformers, and sparse attention architectures. Read Chapter 11 prior to joining.',
          approximateDateTime: '2026-08-27T14:00:00',
          durationMinutes: 90,
          location: 'Stata Center 32-123 & Zoom'
        }
      ],
      rawTranscript: [
        { id: 't-1', timestamp: '00:00', seconds: 0, speaker: 'Prof. Amini', text: 'Welcome everyone to Lecture 4 of Deep Learning. Today we are unpacking one of the foundational breakthroughs in modern AI: Attention Mechanisms and the Transformer Architecture.' },
        { id: 't-2', timestamp: '04:20', seconds: 260, speaker: 'Prof. Amini', text: 'Let us review why RNNs and LSTMs failed to scale. In an RNN, hidden state h_t depends sequentially on h_{t-1}. Backpropagation through time across 10,000 tokens causes severe vanishing gradients and forces serial computation.' },
        { id: 't-3', timestamp: '12:45', seconds: 765, speaker: 'Prof. Amini', text: 'Enter Self-Attention. Given input embeddings X, we project them via learnable weight matrices W_Q, W_K, and W_V into Queries, Keys, and Values. The core equation is Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V.' },
        { id: 't-4', timestamp: '23:10', seconds: 1390, speaker: 'Prof. Amini', text: 'Notice the computational complexity: computing Q * K^T for sequence length N requires O(N^2 * d) operations. This quadratic memory footprint is why context windows were historically constrained.' },
        { id: 't-5', timestamp: '32:40', seconds: 1960, speaker: 'Prof. Amini', text: 'For your lab assignment due this coming Tuesday by 11:59 PM, you are required to implement scaled dot-product attention from scratch in PyTorch.' },
        { id: 't-6', timestamp: '39:00', seconds: 2340, speaker: 'Prof. Amini', text: 'Next Thursday at 2:00 PM EST, we will have a guest lecture from DeepMind on Sparse Attention and Mixture of Experts. Please read Chapter 11 beforehand.' }
      ],
      keyTakeaways: [
        'Transformers eliminate recurrence, replacing it with parallel QKV matrix operations.',
        '1/sqrt(d_k) scaling prevents softmax saturation in high-dimensional vector spaces.',
        'Dense attention has O(N^2) memory complexity, requiring hardware innovations like FlashAttention.',
        'Lab 4 PyTorch implementation is due Tuesday 11:59 PM; DeepMind guest lecture scheduled for Thursday 2 PM.'
      ]
    }
  },
  {
    id: 'sample-meeting-q3',
    title: 'Q3 Enterprise Product Strategy & Architecture Sync',
    category: 'Meeting',
    subtitle: 'Cross-functional executive alignment on latency SLOs, cloud migration, and billing tiers',
    duration: '28:40',
    audioTone: 'Corporate, Decisive, Collaborative',
    description: 'Engineering, Product, and Infrastructure leads align on migrating multi-tenant workloads to Kubernetes, enforcing P99 < 120ms latency thresholds, and finalizing enterprise SLA contracts before end-of-quarter.',
    transcriptText: `[00:00] Sarah (VP Product): Good morning everyone. We are here to finalize our Q3 enterprise infrastructure roadmap and lock in our technical commitments before the executive board meeting on Friday. Marcus, let us start with the API latency benchmarks.

[03:15] Marcus (Lead Architect): Over the past two weeks, our P99 latency spiked to 340ms during peak APAC trading hours due to unindexed Postgres queries in the audit service. We have drafted a migration plan to Redis caching with automated cache invalidation on write events.

[09:30] Elena (Head of Infra): Regarding the multi-region Kubernetes migration: we tested the Terraform cluster deployment in us-east-1 and eu-central-1. We expect zero-downtime DNS failover using Route53 latency routing, but we need security signoff on the IAM roles by Wednesday 5 PM.

[16:45] Sarah (VP Product): Excellent. Dave, what is the status of the SOC2 Type II compliance audit report required for the Fortune 500 prospect deals?

[17:10] Dave (Compliance Lead): The penetration testing vendor completed their assessment yesterday. There are two medium-severity findings related to TLS 1.1 deprecation on legacy webhooks. We will patch those by Monday and submit the finalized audit package to enterprise sales by Wednesday.

[24:00] Marcus (Lead Architect): Action items summary: I will deploy the Redis caching layer to staging by Thursday 2 PM. Elena will finalize the IAM security configurations by Wednesday. Dave handles the SOC2 package by Wednesday morning.

[27:15] Sarah (VP Product): Let us schedule a 30-minute follow-up sync for next Monday at 10:00 AM PST to verify production deployment metrics. Thanks all.`,
    data: {
      id: 'sample-meeting-q3',
      createdAt: '2026-08-20T14:30:00Z',
      category: 'Meeting',
      title: 'Q3 Enterprise Product Strategy & Architecture Sync',
      duration: '28:40',
      mediaType: 'sample',
      fileName: 'q3_strategy_sync.m4a',
      executiveSummary: {
        paragraph1: 'This cross-functional executive meeting convened leadership across Product, Architecture, Infrastructure, and Security to review system performance bottlenecks, validate multi-region cloud migration schedules, and finalize compliance obligations ahead of the quarterly board review.',
        paragraph2: 'The primary technical discussions evaluated root causes for peak P99 latency spikes (340ms) in the audit service, approving a Redis caching layer with write-through invalidation. Infrastructure confirmed readiness for multi-region Kubernetes cluster failover across us-east-1 and eu-central-1, while Compliance reported on the resolution of SOC2 audit findings regarding legacy webhook TLS deprecation.',
        paragraph3: 'The team established clear ownership for staging deployment, IAM security verification, and audit report delivery, scheduling a production readiness sync for next Monday morning to review live operational telemetry.'
      },
      topics: [
        {
          timestamp: '00:00',
          seconds: 0,
          title: 'Executive Agenda & Objective Alignment',
          speaker: 'Sarah (VP Product)',
          bullets: [
            'Established goal: lock in technical commitments and infrastructure timelines prior to Friday board meeting.',
            'Reviewed quarterly OKR progress across enterprise uptime, SLA guarantees, and enterprise revenue pipeline.'
          ]
        },
        {
          timestamp: '03:15',
          seconds: 195,
          title: 'P99 Latency Spikes & Audit Service Optimization',
          speaker: 'Marcus (Lead Architect)',
          bullets: [
            'Diagnosed 340ms P99 latency degradation to unindexed database queries during APAC peak load.',
            'Approved Redis caching architecture with proactive cache invalidation on write events.',
            'Targeted latency recovery to under 120ms P99 across all global ingress regions.'
          ]
        },
        {
          timestamp: '09:30',
          seconds: 570,
          title: 'Multi-Region Kubernetes Deployment & DNS Failover',
          speaker: 'Elena (Head of Infra)',
          bullets: [
            'Demonstrated automated cluster provisioning in us-east-1 and eu-central-1 using Terraform.',
            'Verified Route53 health-checked latency routing for sub-second failover.',
            'Requested immediate InfoSec review for cross-account IAM role permissions.'
          ]
        },
        {
          timestamp: '16:45',
          seconds: 1005,
          title: 'SOC2 Type II Audit & Security Remediation',
          speaker: 'Dave (Compliance Lead)',
          bullets: [
            'Reviewed external penetration testing results: zero critical/high vulnerabilities.',
            'Remediated two medium findings concerning TLS 1.1 deprecation across legacy webhook listeners.',
            'Scheduled release of official SOC2 Type II audit package for enterprise sales enablement.'
          ]
        },
        {
          timestamp: '24:00',
          seconds: 1440,
          title: 'Action Item Review & Signoff Schedule',
          speaker: 'Marcus & Sarah',
          bullets: [
            'Assigned Redis staging deployment, IAM verification, and SOC2 package distribution.',
            'Locked deadline gates for Wednesday and Thursday before final rollout.'
          ]
        },
        {
          timestamp: '27:15',
          seconds: 1635,
          title: 'Next Steps & Follow-Up Sync Scheduling',
          speaker: 'Sarah (VP Product)',
          bullets: [
            'Scheduled 30-minute sync for Monday at 10:00 AM PST.',
            'Confirmed production deployment telemetry monitoring plan.'
          ]
        }
      ],
      actionItems: [
        {
          id: 'act-m1',
          task: 'Deploy Redis caching layer for audit service to staging environment and run load tests',
          assignee: 'Marcus (Lead Architect)',
          deadline: 'Thursday at 2:00 PM PST',
          priority: 'High',
          completed: false,
          category: 'Architecture'
        },
        {
          id: 'act-m2',
          task: 'Complete IAM security role signoff for multi-region Terraform deployment',
          assignee: 'Elena (Head of Infra)',
          deadline: 'Wednesday at 5:00 PM PST',
          priority: 'High',
          completed: false,
          category: 'Infrastructure'
        },
        {
          id: 'act-m3',
          task: 'Deprecate TLS 1.1 on webhook endpoints and publish finalized SOC2 Type II package to Sales',
          assignee: 'Dave (Compliance Lead)',
          deadline: 'Wednesday at 9:00 AM PST',
          priority: 'Medium',
          completed: false,
          category: 'Security'
        },
        {
          id: 'act-m4',
          task: 'Prepare executive board slide deck with latency SLO graphs and compliance certificates',
          assignee: 'Sarah (VP Product)',
          deadline: 'Thursday at 6:00 PM PST',
          priority: 'High',
          completed: false,
          category: 'Product'
        }
      ],
      flashcards: [
        {
          id: 'fc-m1',
          question: 'What caused the recent P99 latency degradation to 340ms in the audit service?',
          answer: 'Unindexed PostgreSQL queries executed during high-concurrency APAC trading hours, which saturated database worker connection pools.',
          category: 'System Performance',
          keyConcept: 'Database Indexing Bottlenecks'
        },
        {
          id: 'fc-m2',
          question: 'How will the proposed Redis caching layer ensure data consistency upon record updates?',
          answer: 'By implementing automated write-through cache invalidation hooks triggered directly on database mutation events.',
          category: 'Architecture',
          keyConcept: 'Cache Invalidation Strategy'
        },
        {
          id: 'fc-m3',
          question: 'What mechanism provides sub-second multi-region disaster recovery for the Kubernetes cluster?',
          answer: 'AWS Route53 latency-based DNS routing combined with active health-check endpoints across us-east-1 and eu-central-1.',
          category: 'Cloud Infrastructure',
          keyConcept: 'Multi-Region DNS Failover'
        },
        {
          id: 'fc-m4',
          question: 'Why was TLS 1.1 deprecated in the webhook infrastructure?',
          answer: 'TLS 1.0 and 1.1 have known cryptographic vulnerabilities (such as POODLE and BEAST) and are prohibited under modern SOC2 Type II and PCI-DSS compliance frameworks.',
          category: 'Compliance & Security',
          keyConcept: 'TLS Protocol Hardening'
        },
        {
          id: 'fc-m5',
          question: 'What is the targeted P99 latency Service Level Objective (SLO) for enterprise clients?',
          answer: 'P99 latency of less than 120 milliseconds across all global API ingress gateways.',
          category: 'Service Level Objectives',
          keyConcept: 'Latency SLO Metrics'
        },
        {
          id: 'fc-m6',
          question: 'What role does Terraform play in the multi-region Kubernetes rollout?',
          answer: 'It codifies infrastructure as code (IaC), allowing identical, repeatable, and automated cluster provisioning in both us-east-1 and eu-central-1 regions.',
          category: 'DevOps & IaC',
          keyConcept: 'Infrastructure as Code'
        }
      ],
      calendarEvents: [
        {
          id: 'cal-m1',
          title: 'Staging Redis Deployment & Load Benchmark Verification',
          description: 'Deploy Redis caching layer to staging cluster and run synthetic 5,000 req/sec benchmark suites.',
          approximateDateTime: '2026-08-27T14:00:00',
          durationMinutes: 45,
          location: 'Virtual / DevOps Slack Channel'
        },
        {
          id: 'cal-m2',
          title: 'Q3 Post-Deployment Readiness & Telemetry Review Sync',
          description: '30-minute cross-functional review of production P99 latency, failover telemetry, and enterprise client onboarding status.',
          approximateDateTime: '2026-08-31T10:00:00',
          durationMinutes: 30,
          location: 'Google Meet'
        }
      ],
      rawTranscript: [
        { id: 'tm-1', timestamp: '00:00', seconds: 0, speaker: 'Sarah (VP Product)', text: 'Good morning everyone. We are here to finalize our Q3 enterprise infrastructure roadmap and lock in our technical commitments before the executive board meeting on Friday.' },
        { id: 'tm-2', timestamp: '03:15', seconds: 195, speaker: 'Marcus (Lead Architect)', text: 'Over the past two weeks, our P99 latency spiked to 340ms during peak APAC trading hours due to unindexed Postgres queries in the audit service.' },
        { id: 'tm-3', timestamp: '09:30', seconds: 570, speaker: 'Elena (Head of Infra)', text: 'Regarding the multi-region Kubernetes migration: we tested the Terraform cluster deployment in us-east-1 and eu-central-1. We expect zero-downtime DNS failover.' },
        { id: 'tm-4', timestamp: '16:45', seconds: 1005, speaker: 'Dave (Compliance Lead)', text: 'The penetration testing vendor completed their assessment yesterday. We will patch the two TLS 1.1 medium findings by Monday and submit the audit package by Wednesday.' },
        { id: 'tm-5', timestamp: '24:00', seconds: 1440, speaker: 'Marcus (Lead Architect)', text: 'Action items summary: I will deploy the Redis caching layer to staging by Thursday 2 PM. Elena handles IAM roles by Wednesday.' },
        { id: 'tm-6', timestamp: '27:15', seconds: 1635, speaker: 'Sarah (VP Product)', text: 'Let us schedule a 30-minute follow-up sync for next Monday at 10:00 AM PST to verify production deployment metrics.' }
      ],
      keyTakeaways: [
        'Root cause of P99 latency spikes identified and remediated via Redis caching.',
        'Multi-region Kubernetes deployment verified across us-east-1 and eu-central-1.',
        'SOC2 Type II compliance package on track for Wednesday delivery.',
        'Follow-up sync scheduled for Monday at 10:00 AM PST.'
      ]
    }
  },
  {
    id: 'sample-workshop-quantum',
    title: 'Hands-On Quantum Computing & Qubit Algorithms Workshop',
    category: 'Workshop',
    subtitle: 'Interactive lab on Superposition, Quantum Entanglement, and Qiskit Circuit Simulation',
    duration: '54:10',
    audioTone: 'Educational, Exploratory, Code-First',
    description: 'Dr. Evelyn Reed guides engineers through constructing Bell States, simulating Grover search algorithms, analyzing Bloch sphere rotations, and mitigating quantum decoherence using Qiskit.',
    transcriptText: `[00:00] Dr. Reed: Welcome to the Quantum Computing Masterclass. Today we will build our first 2-qubit entangled circuits in Qiskit and simulate Shor and Grover quantum speedups.

[08:15] Dr. Reed: Let us review the Hadamard gate (H). When applied to basis state |0>, H transforms it into the equal superposition (|0> + |1>) / sqrt(2). On the Bloch sphere, this corresponds to a 90-degree rotation around the Y-axis followed by a 180-degree rotation around the X-axis.

[19:40] Dr. Reed: Now let us construct a Bell State |Phi+>. We take Qubit 0, apply a Hadamard gate to put it in superposition, and then apply a Controlled-NOT (CNOT) gate with Qubit 0 as control and Qubit 1 as target. The resulting 2-qubit state is (|00> + |11>) / sqrt(2). Measuring Qubit 0 instantly collapses Qubit 1, regardless of spatial separation.

[34:20] Dr. Reed: Look at the state vector histogram from the QasmSimulator. Notice we get 50% probability for |00> and 50% for |11>, with 0% for |01> or |10>. This is proof of maximal entanglement.

[46:10] Dr. Reed: For your workshop project, you need to implement the 3-qubit Quantum Teleportation protocol in Qiskit and submit your Jupyter notebook by next Wednesday at 6:00 PM.

[51:30] Dr. Reed: We will host a dedicated debugging clinic on Friday at 3:00 PM for anyone struggling with IBM Quantum cloud API tokens or phase-flip error correction.`,
    data: {
      id: 'sample-workshop-quantum',
      createdAt: '2026-08-19T16:00:00Z',
      category: 'Workshop',
      title: 'Hands-On Quantum Computing & Qiskit Circuit Design',
      duration: '54:10',
      mediaType: 'sample',
      fileName: 'quantum_workshop_qiskit.mp4',
      executiveSummary: {
        paragraph1: 'This interactive technical workshop provides engineers and researchers with foundational practical skills in quantum state manipulation, circuit construction, and quantum algorithmic advantage using Qiskit and quantum simulators.',
        paragraph2: 'The workshop demonstrates the operational mechanics of single-qubit quantum gates (Pauli-X, Y, Z, and Hadamard) on the Bloch sphere, details the construction of maximally entangled Bell states (|Phi+>) via Hadamard and CNOT gates, and runs probabilistic state-vector simulations in QasmSimulator to verify entanglement correlations.',
        paragraph3: 'Participants are assigned a hands-on project to code a 3-qubit Quantum Teleportation protocol in Python due next Wednesday, supported by an IBM Quantum cloud debugging office hour on Friday.'
      },
      topics: [
        {
          timestamp: '00:00',
          seconds: 0,
          title: 'Quantum Foundations & Qubit State Vectors',
          speaker: 'Dr. Evelyn Reed',
          bullets: [
            'Defined quantum bit (qubit) state |psi> = alpha|0> + beta|1> where |alpha|^2 + |beta|^2 = 1.',
            'Contrasted classical deterministic bits with quantum probabilistic state representations.'
          ]
        },
        {
          timestamp: '08:15',
          seconds: 495,
          title: 'Single-Qubit Rotations & Hadamard Superposition',
          speaker: 'Dr. Evelyn Reed',
          bullets: [
            'Derived the Hadamard transformation matrix H = 1/sqrt(2) * [[1, 1], [1, -1]].',
            'Visualized state vector rotation onto the equator of the Bloch sphere.',
            'Demonstrated 50/50 measurement probability creation from deterministic ground state.'
          ]
        },
        {
          timestamp: '19:40',
          seconds: 1180,
          title: 'Creating Bell States & Two-Qubit Entanglement',
          speaker: 'Dr. Evelyn Reed',
          bullets: [
            'Constructed the canonical Bell state circuit: Hadamard on Qubit 0 followed by CNOT(0 -> 1).',
            'Derived mathematical state evolution from |00> to (|00> + |11>)/sqrt(2).',
            'Demonstrated instantaneous wavefunction collapse and non-local correlations upon measurement.'
          ]
        },
        {
          timestamp: '34:20',
          seconds: 2060,
          title: 'QasmSimulator Execution & Measurement Statistics',
          speaker: 'Dr. Evelyn Reed',
          bullets: [
            'Configured Qiskit Aer backend with 8,192 shots for statistical noise reduction.',
            'Analyzed histogram output showing 50% |00> and 50% |11> without crosstalk.'
          ]
        },
        {
          timestamp: '46:10',
          seconds: 2770,
          title: 'Workshop Assignment: Quantum Teleportation Protocol',
          speaker: 'Dr. Evelyn Reed',
          bullets: [
            'Specified project deliverables: 3-qubit teleportation circuit with classical feedforward gates.',
            'Mandated verification using simulated density matrices and state fidelity calculations.'
          ]
        },
        {
          timestamp: '51:30',
          seconds: 3090,
          title: 'IBM Quantum Cloud Tokens & Office Hours',
          speaker: 'Dr. Evelyn Reed',
          bullets: [
            'Announced Friday debugging clinic for IBM Quantum hardware access tokens.',
            'Provided references to Nielsen & Chuang quantum computation textbook.'
          ]
        }
      ],
      actionItems: [
        {
          id: 'act-w1',
          task: 'Implement 3-qubit Quantum Teleportation protocol notebook in Qiskit',
          assignee: 'Workshop Attendees',
          deadline: 'Next Wednesday at 6:00 PM EST',
          priority: 'High',
          completed: false,
          category: 'Project'
        },
        {
          id: 'act-w2',
          task: 'Generate IBM Quantum Experience API token and configure local Qiskit runtime',
          assignee: 'Workshop Attendees',
          deadline: 'Friday at 2:00 PM EST',
          priority: 'Medium',
          completed: false,
          category: 'Setup'
        },
        {
          id: 'act-w3',
          task: 'Host Zoom debugging clinic for quantum phase error corrections and API issues',
          assignee: 'Dr. Evelyn Reed',
          deadline: 'Friday at 3:00 PM EST',
          priority: 'Medium',
          completed: false,
          category: 'Mentorship'
        }
      ],
      flashcards: [
        {
          id: 'fc-w1',
          question: 'What is a Hadamard gate and how does it transform the basis state |0>?',
          answer: 'The Hadamard gate (H) creates an equal superposition of basis states. Applied to |0>, it produces (|0> + |1>) / sqrt(2), which has an equal 50% probability of collapsing to 0 or 1 upon measurement.',
          category: 'Quantum Gates',
          keyConcept: 'Hadamard Transformation'
        },
        {
          id: 'fc-w2',
          question: 'How do you generate a maximally entangled Bell State (|Phi+>) from two ground-state qubits (|00>)?',
          answer: 'Apply a Hadamard gate to the first qubit (creating superposition on qubit 0), and then apply a CNOT gate with qubit 0 as control and qubit 1 as target.',
          category: 'Quantum Circuits',
          keyConcept: 'Bell State Synthesis'
        },
        {
          id: 'fc-w3',
          question: 'What is the geometric representation of a single-qubit state space?',
          answer: 'The Bloch Sphere, a unit sphere where the north and south poles represent pure states |0> and |1>, and points along the equator represent equal superpositions with different relative phases.',
          category: 'Quantum Geometry',
          keyConcept: 'Bloch Sphere'
        },
        {
          id: 'fc-w4',
          question: 'What is Quantum Teleportation?',
          answer: 'A protocol that transfers an unknown quantum state (|psi>) between two locations using a shared entangled Bell pair and 2 bits of classical communication, without physically transmitting the qubit itself.',
          category: 'Quantum Protocols',
          keyConcept: 'Quantum Teleportation'
        },
        {
          id: 'fc-w5',
          question: 'Why does measuring one qubit in a Bell pair instantaneously determine the state of the other?',
          answer: 'Because the composite quantum state (|00> + |11>)/sqrt(2) cannot be factored into independent single-qubit states (it is non-separable). Measuring qubit 0 to be |0> collapses the entangled wave function to |00>.',
          category: 'Quantum Mechanics',
          keyConcept: 'Wavefunction Collapse & Non-Separability'
        },
        {
          id: 'fc-w6',
          question: 'What is the role of the CNOT (Controlled-NOT) gate in quantum circuits?',
          answer: 'It is a 2-qubit entangling gate that flips the state of the target qubit (applies Pauli-X) if and only if the control qubit is in state |1>.',
          category: 'Quantum Logic',
          keyConcept: 'CNOT Gate'
        }
      ],
      calendarEvents: [
        {
          id: 'cal-w1',
          title: 'IBM Quantum API & Qiskit Debugging Clinic',
          description: 'Live interactive troubleshooting for IBM Quantum real-device execution and Qiskit simulator configuration.',
          approximateDateTime: '2026-08-28T15:00:00',
          durationMinutes: 60,
          location: 'Zoom Workshop Room'
        },
        {
          id: 'cal-w2',
          title: 'Quantum Teleportation Qiskit Project Submission',
          description: 'Submit completed Jupyter notebook with circuit diagrams and state fidelity benchmark graphs to GitHub Classroom.',
          approximateDateTime: '2026-09-02T18:00:00',
          durationMinutes: 30,
          location: 'GitHub Classroom'
        }
      ],
      rawTranscript: [
        { id: 'tw-1', timestamp: '00:00', seconds: 0, speaker: 'Dr. Reed', text: 'Welcome to the Quantum Computing Masterclass. Today we will build our first 2-qubit entangled circuits in Qiskit and simulate Shor and Grover quantum speedups.' },
        { id: 'tw-2', timestamp: '08:15', seconds: 495, speaker: 'Dr. Reed', text: 'Let us review the Hadamard gate. When applied to basis state |0>, H transforms it into the equal superposition (|0> + |1>) / sqrt(2).' },
        { id: 'tw-3', timestamp: '19:40', seconds: 1180, speaker: 'Dr. Reed', text: 'Now let us construct a Bell State |Phi+>. We take Qubit 0, apply a Hadamard gate, and then apply a CNOT gate with Qubit 0 as control and Qubit 1 as target.' },
        { id: 'tw-4', timestamp: '34:20', seconds: 2060, speaker: 'Dr. Reed', text: 'Look at the state vector histogram from the QasmSimulator. Notice we get 50% probability for |00> and 50% for |11>.' },
        { id: 'tw-5', timestamp: '46:10', seconds: 2770, speaker: 'Dr. Reed', text: 'For your workshop project, you need to implement the 3-qubit Quantum Teleportation protocol in Qiskit and submit by next Wednesday at 6:00 PM.' },
        { id: 'tw-6', timestamp: '51:30', seconds: 3090, speaker: 'Dr. Reed', text: 'We will host a dedicated debugging clinic on Friday at 3:00 PM for anyone struggling with IBM Quantum cloud API tokens.' }
      ],
      keyTakeaways: [
        'Hadamard gates rotate state vectors to create 50/50 quantum superpositions.',
        'Entanglement requires combining superposition (H) with conditional entanglement (CNOT).',
        'Teleportation requires 1 entangled pair and 2 classical bits to transfer a quantum state.',
        'Teleportation lab submission deadline is next Wednesday at 6:00 PM EST.'
      ]
    }
  },
  {
    id: 'sample-interview-lead',
    title: 'Staff Distributed Systems Architect Technical Interview',
    category: 'Interview',
    subtitle: 'Deep-dive architectural evaluation on Raft consensus, distributed transactions, and LSM-Trees',
    duration: '45:00',
    audioTone: 'Inquisitive, Deeply Technical, Structured',
    description: 'Principal Engineer conducts a systems architecture interview evaluating candidate knowledge of leader election in Raft, two-phase commit vs Saga patterns, and write-amplification in Log-Structured Merge Trees.',
    transcriptText: `[00:00] Interviewer (Alex): Welcome Jordan. Today we will assess your distributed systems expertise. Let us start with consensus protocols: walk me through how the Raft consensus algorithm handles network partitions and leader split-brain.

[06:20] Candidate (Jordan): In Raft, leader election requires a candidate to secure votes from a strict majority (quorum = floor(N/2) + 1) of cluster nodes. If a network partition isolates 2 nodes from 3 in a 5-node cluster, the minority partition cannot elect a leader because it cannot achieve a 3-node quorum. The majority partition continues electing a valid leader and committing log entries with term numbers.

[17:45] Interviewer (Alex): Excellent. Now let us pivot to storage engines. Why would you choose an LSM-Tree (Log-Structured Merge-Tree) like RocksDB over a B+ Tree for high-throughput write workloads?

[20:10] Candidate (Jordan): B+ Trees perform in-place random disk writes, which suffer from severe write amplification and IOPS bottlenecks on spinning disks or SSD flash blocks. In contrast, LSM-Trees append all incoming mutations sequentially into an in-memory MemTable and write-ahead log (WAL). Once full, the MemTable is flushed as an immutable Sorted String Table (SSTable) to disk sequentially. Compaction happens in the background.

[32:15] Interviewer (Alex): How do you mitigate read amplification in LSM-Trees when searching for non-existent keys?

[33:00] Candidate (Jordan): We use probabilistic Bloom Filters on each SSTable level. Bloom filters allow O(1) checks that return either 'definitely not present' or 'possibly present' with tunable false positive rates, avoiding expensive disk reads for missing keys.

[40:30] Interviewer (Alex): Great discussion. The recruiting team will share official interview feedback by tomorrow at 5:00 PM EST, and if approved, the hiring committee will meet on Monday.`,
    data: {
      id: 'sample-interview-lead',
      createdAt: '2026-08-18T11:00:00Z',
      category: 'Interview',
      title: 'Staff Systems Architect Technical Interview',
      duration: '45:00',
      mediaType: 'sample',
      fileName: 'staff_architect_interview.mp3',
      executiveSummary: {
        paragraph1: 'This technical architecture interview evaluated a Staff Distributed Systems candidate on fault-tolerant consensus algorithms, distributed transaction protocols, and high-throughput database storage engines.',
        paragraph2: 'The candidate demonstrated deep mastery of the Raft consensus protocol by explaining quorum requirements (floor(N/2)+1), randomized election timeouts, and log replication during network splits. Furthermore, the candidate contrasted LSM-Trees against B+ Trees, explaining how sequential append-only writes eliminate random disk IO and how Bloom filters mitigate read amplification.',
        paragraph3: 'The interviewer concluded the session with a strong rating, establishing a follow-up deadline for recruiting feedback by tomorrow afternoon and a hiring committee review on Monday.'
      },
      topics: [
        {
          timestamp: '00:00',
          seconds: 0,
          title: 'Consensus & Raft Protocol Deep-Dive',
          speaker: 'Alex & Jordan',
          bullets: [
            'Analyzed leader election states: Follower, Candidate, and Leader.',
            'Evaluated randomized election timeouts preventing split votes across nodes.'
          ]
        },
        {
          timestamp: '06:20',
          seconds: 380,
          title: 'Network Partition & Quorum Guarantees',
          speaker: 'Jordan (Candidate)',
          bullets: [
            'Proved that minority partitions in an N-node cluster cannot commit writes without floor(N/2) + 1 votes.',
            'Explained leader lease mechanisms and term number monotonically increasing increments.'
          ]
        },
        {
          timestamp: '17:45',
          seconds: 1065,
          title: 'Storage Engine Comparison: B+ Trees vs LSM-Trees',
          speaker: 'Alex & Jordan',
          bullets: [
            'Compared in-place mutation patterns against sequential write-ahead logging.',
            'Analyzed write amplification, read amplification, and space amplification trade-offs.'
          ]
        },
        {
          timestamp: '20:10',
          seconds: 1210,
          title: 'LSM-Tree Internals: MemTable, WAL & SSTables',
          speaker: 'Jordan (Candidate)',
          bullets: [
            'Detailed in-memory SkipList MemTable flushing to immutable disk SSTables.',
            'Explained Leveled vs Size-Tiered background compaction algorithms.'
          ]
        },
        {
          timestamp: '32:15',
          seconds: 1935,
          title: 'Bloom Filters & Read Amplification Mitigation',
          speaker: 'Jordan (Candidate)',
          bullets: [
            'Explained bit-array hashing with multiple hash functions to eliminate disk seeks for missing keys.',
            'Analyzed false positive rate equations with respect to bits per key.'
          ]
        },
        {
          timestamp: '40:30',
          seconds: 2430,
          title: 'Interview Debrief & Next Steps',
          speaker: 'Alex (Interviewer)',
          bullets: [
            'Communicated evaluation timeline: feedback submission within 24 hours.',
            'Outlined hiring committee review process scheduled for Monday.'
          ]
        }
      ],
      actionItems: [
        {
          id: 'act-i1',
          task: 'Submit candidate written evaluation and technical scorecards to Greenhouse ATS',
          assignee: 'Alex (Interviewer)',
          deadline: 'Tomorrow at 5:00 PM EST',
          priority: 'High',
          completed: false,
          category: 'Hiring'
        },
        {
          id: 'act-i2',
          task: 'Send formal interview recap and status notification to candidate',
          assignee: 'Recruiting Team',
          deadline: 'Tomorrow at 6:00 PM EST',
          priority: 'Medium',
          completed: false,
          category: 'Recruiting'
        },
        {
          id: 'act-i3',
          task: 'Convene Staff Engineering Hiring Committee for final hiring decision',
          assignee: 'Hiring Committee',
          deadline: 'Monday at 2:00 PM EST',
          priority: 'High',
          completed: false,
          category: 'Decision'
        }
      ],
      flashcards: [
        {
          id: 'fc-i1',
          question: 'What is the quorum formula required to elect a leader and commit log entries in Raft?',
          answer: 'Quorum = floor(N / 2) + 1, where N is the total number of voting nodes in the cluster. This guarantees that any two quorums overlap by at least one node.',
          category: 'Distributed Consensus',
          keyConcept: 'Raft Quorum Formulation'
        },
        {
          id: 'fc-i2',
          question: 'Why do LSM-Trees provide superior write throughput compared to B+ Trees?',
          answer: 'LSM-Trees convert random write operations into high-speed sequential appends to an in-memory MemTable and Write-Ahead Log (WAL), avoiding random disk seeks and expensive in-place page overwrites.',
          category: 'Database Engines',
          keyConcept: 'Sequential Writes vs Random IO'
        },
        {
          id: 'fc-i3',
          question: 'How do Bloom Filters optimize read queries in LSM-Trees?',
          answer: 'Bloom Filters are space-efficient probabilistic data structures that quickly determine whether an element is definitely NOT in an SSTable, preventing unnecessary disk seeks for non-existent keys.',
          category: 'Data Structures',
          keyConcept: 'Bloom Filter Optimization'
        },
        {
          id: 'fc-i4',
          question: 'What is Write Amplification in storage systems?',
          answer: 'The ratio of bytes written to non-volatile storage (disk/SSD) relative to the number of bytes requested to be written by the application. High write amplification degrades performance and SSD lifespan.',
          category: 'Systems Storage',
          keyConcept: 'Write Amplification Factor'
        },
        {
          id: 'fc-i5',
          question: 'What happens during an LSM-Tree SSTable Compaction?',
          answer: 'Background worker threads read multiple SSTables, perform merge-sort on sorted key ranges, discard deleted/tombstoned or overwritten keys, and write compact new SSTables to the next level.',
          category: 'Database Internals',
          keyConcept: 'SSTable Compaction'
        },
        {
          id: 'fc-i6',
          question: 'How does Raft prevent split votes when multiple nodes simultaneously trigger leader election?',
          answer: 'Raft uses randomized election timeouts (e.g. 150ms to 300ms) for each node so that typically one follower times out first, increments the term, and gathers votes before others timeout.',
          category: 'Consensus Protocols',
          keyConcept: 'Randomized Election Timeouts'
        }
      ],
      calendarEvents: [
        {
          id: 'cal-i1',
          title: 'Candidate Scorecard Submission Deadline',
          description: 'Submit comprehensive technical evaluation scores and notes for Staff Systems Architect interview.',
          approximateDateTime: '2026-08-22T17:00:00',
          durationMinutes: 30,
          location: 'Greenhouse Recruiting'
        },
        {
          id: 'cal-i2',
          title: 'Staff Engineering Hiring Committee Review',
          description: 'Review candidate interview packet, architectural scores, and make final hiring offer decision.',
          approximateDateTime: '2026-08-24T14:00:00',
          durationMinutes: 45,
          location: 'Conference Room 4B & Zoom'
        }
      ],
      rawTranscript: [
        { id: 'ti-1', timestamp: '00:00', seconds: 0, speaker: 'Alex (Interviewer)', text: 'Welcome Jordan. Today we will assess your distributed systems expertise. Let us start with consensus protocols: walk me through how the Raft consensus algorithm handles network partitions.' },
        { id: 'ti-2', timestamp: '06:20', seconds: 380, speaker: 'Jordan (Candidate)', text: 'In Raft, leader election requires a candidate to secure votes from a strict majority (quorum = floor(N/2) + 1) of cluster nodes.' },
        { id: 'ti-3', timestamp: '17:45', seconds: 1065, speaker: 'Alex (Interviewer)', text: 'Excellent. Now let us pivot to storage engines. Why would you choose an LSM-Tree over a B+ Tree for high-throughput write workloads?' },
        { id: 'ti-4', timestamp: '20:10', seconds: 1210, speaker: 'Jordan (Candidate)', text: 'B+ Trees perform in-place random disk writes. In contrast, LSM-Trees append all incoming mutations sequentially into an in-memory MemTable and write-ahead log.' },
        { id: 'ti-5', timestamp: '32:15', seconds: 1935, speaker: 'Alex (Interviewer)', text: 'How do you mitigate read amplification in LSM-Trees when searching for non-existent keys?' },
        { id: 'ti-6', timestamp: '33:00', seconds: 1980, speaker: 'Jordan (Candidate)', text: 'We use probabilistic Bloom Filters on each SSTable level to perform O(1) membership checks.' },
        { id: 'ti-7', timestamp: '40:30', seconds: 2430, speaker: 'Alex (Interviewer)', text: 'Great discussion. The recruiting team will share official interview feedback by tomorrow at 5:00 PM EST.' }
      ],
      keyTakeaways: [
        'Candidate exhibited deep mastery of Raft quorum calculations and split-brain resilience.',
        'Clear breakdown of LSM-Tree MemTable/SSTable architectures and Bloom filter indexing.',
        'Scorecard submission required by tomorrow at 5:00 PM EST.',
        'Hiring Committee review set for Monday 2:00 PM EST.'
      ]
    }
  },
  {
    id: 'sample-presentation-climate',
    title: 'ClimateTech Series-A Venture Keynote & Pitch',
    category: 'Presentation',
    subtitle: 'Investor pitch on Direct Air Carbon Capture (DAC), solid-sorbent thermal regeneration, and unit economics',
    duration: '35:20',
    audioTone: 'Persuasive, Visionary, Metric-Driven',
    description: 'CEO and Chief Scientist present proprietary solid-sorbent Direct Air Capture technology achieving $85/ton carbon removal with sub-100C waste heat utilization to institutional climate investors.',
    transcriptText: `[00:00] Maya (Founder & CEO): Good morning investors. Current Direct Air Capture technologies cost upwards of $600 per metric ton of CO2 removed, largely due to high-temperature thermal calcination at 900 degrees Celsius. Today, TerraCapture is unveiling our proprietary solid-sorbent matrix that operates at just 85 degrees Celsius, unlocking a path to $85 per ton.

[07:40] Dr. Chen (Chief Scientist): Our breakthrough is a metal-organic framework (MOF) coated with polyethylenimine that selectively binds CO2 molecules even at ambient 420 ppm concentrations. Desorption requires only low-grade industrial waste heat (85C), reducing electrical energy consumption by 72% compared to liquid-solvent amine systems.

[18:15] Maya (Founder & CEO): Looking at our unit economics: our pilot facility in Nevada captured 2,000 tons in Q2. We have signed $14M in binding multi-year carbon removal pre-purchase contracts with Microsoft and Stripe Climate at $250/ton blended price.

[26:30] Maya (Founder & CEO): For our Series A round, we are raising $25 million to build our 50,000 ton/year Megaton-1 facility. We have $15M committed from lead investors, and we are closing the remaining syndicate by September 15th.

[31:00] Maya (Founder & CEO): We welcome technical due diligence questions. Our virtual data room is open, and all material transfer agreements for independent lab verification must be submitted by August 28th at 5 PM.`,
    data: {
      id: 'sample-presentation-climate',
      createdAt: '2026-08-17T15:00:00Z',
      category: 'Presentation',
      title: 'ClimateTech Series A Direct Air Capture Keynote',
      duration: '35:20',
      mediaType: 'sample',
      fileName: 'terracapture_series_a_presentation.mp4',
      executiveSummary: {
        paragraph1: 'This investor presentation introduced TerraCapture’s proprietary low-temperature Direct Air Carbon Capture (DAC) system, proposing a cost reduction from industry standards of $600/ton down to $85/ton of sequestered carbon dioxide.',
        paragraph2: 'The technical demonstration highlighted a breakthrough metal-organic framework (MOF) sorbent functionalized with polyethylenimine that operates at 85 degrees Celsius using low-grade industrial waste heat, cutting electricity consumption by 72% relative to traditional 900C calcination. Commercial validation included 2,000 tons captured in Q2 and $14 million in signed off-take agreements with enterprise buyers.',
        paragraph3: 'The leadership team invited participation to complete their $25 million Series A financing round ($15M already committed), establishing firm deadlines for due diligence agreements and round close.'
      },
      topics: [
        {
          timestamp: '00:00',
          seconds: 0,
          title: 'The Direct Air Capture Cost Barrier ($600/ton vs $85/ton)',
          speaker: 'Maya (CEO)',
          bullets: [
            'Analyzed legacy DAC cost structures dominated by high-temperature (900C) natural gas calcination.',
            'Introduced TerraCapture core mission: achieving sub-$100/ton carbon removal via low-temp desorption.'
          ]
        },
        {
          timestamp: '07:40',
          seconds: 460,
          title: 'MOF Sorbent Chemistry & 85°C Waste Heat Desorption',
          speaker: 'Dr. Chen (Chief Scientist)',
          bullets: [
            'Explained polyethylenimine-impregnated metal-organic framework selective CO2 binding kinetics.',
            'Demonstrated 72% electrical energy reduction through waste heat utilization.'
          ]
        },
        {
          timestamp: '18:15',
          seconds: 1095,
          title: 'Pilot Performance & $14M Commercial Off-take Agreements',
          speaker: 'Maya (CEO)',
          bullets: [
            'Presented operational data from 2,000-ton Nevada pilot plant.',
            'Showcased binding commercial pre-purchase agreements with Microsoft and Stripe Climate.'
          ]
        },
        {
          timestamp: '26:30',
          seconds: 1590,
          title: 'Series A $25M Financing Round & Megaton-1 Facility',
          speaker: 'Maya (CEO)',
          bullets: [
            'Outlined capital allocation for 50,000-ton commercial scale facility.',
            'Confirmed $15M lead commitment with remaining allocation open to syndicate.'
          ]
        },
        {
          timestamp: '31:00',
          seconds: 1860,
          title: 'Investor Due Diligence Timelines & Data Room Access',
          speaker: 'Maya (CEO)',
          bullets: [
            'Opened virtual data room access for technical due diligence.',
            'Established August 28 deadline for material transfer testing agreements.'
          ]
        }
      ],
      actionItems: [
        {
          id: 'act-p1',
          task: 'Submit Material Transfer Agreement (MTA) for independent laboratory sorbent validation',
          assignee: 'Interested Investors',
          deadline: 'August 28, 2026 at 5:00 PM EST',
          priority: 'High',
          completed: false,
          category: 'Due Diligence'
        },
        {
          id: 'act-p2',
          task: 'Finalize Series A syndicate commitments and legal term sheets',
          assignee: 'Maya (CEO) & Legal Counsel',
          deadline: 'September 15, 2026 at 11:59 PM EST',
          priority: 'High',
          completed: false,
          category: 'Financing'
        },
        {
          id: 'act-p3',
          task: 'Distribute third-party life-cycle carbon accounting audit report to data room',
          assignee: 'Dr. Chen (Chief Scientist)',
          deadline: 'Friday at 12:00 PM EST',
          priority: 'Medium',
          completed: true,
          category: 'Documentation'
        }
      ],
      flashcards: [
        {
          id: 'fc-p1',
          question: 'What is the primary thermodynamic cost driver of legacy Direct Air Capture (DAC) systems?',
          answer: 'High-temperature thermal regeneration (calcination at ~900°C), which requires massive natural gas or electric heating to release CO2 from liquid solvents or calcium carbonate matrices.',
          category: 'Climate Engineering',
          keyConcept: 'Thermal Regeneration Thermodynamics'
        },
        {
          id: 'fc-p2',
          question: 'How does TerraCapture’s solid-sorbent material achieve desorption at only 85°C?',
          answer: 'It utilizes a metal-organic framework (MOF) coated with polyethylenimine that lowers the activation energy required to release bound CO2 molecules, enabling regeneration using low-grade industrial waste heat.',
          category: 'Materials Science',
          keyConcept: 'MOF Sorbent Desorption'
        },
        {
          id: 'fc-p3',
          question: 'What is the levelized cost per ton target for TerraCapture at commercial scale?',
          answer: '$85 per metric ton of permanently sequestered CO2, down from current commercial rates of $600/ton.',
          category: 'Unit Economics',
          keyConcept: 'Carbon Removal Levelized Cost'
        },
        {
          id: 'fc-p4',
          question: 'What atmospheric CO2 concentration must Direct Air Capture systems process?',
          answer: 'Approximately 420 parts per million (0.042%), requiring highly selective sorbents and high-volume air contactor fans.',
          category: 'Atmospheric Physics',
          keyConcept: 'Ambient CO2 Concentration (ppm)'
        },
        {
          id: 'fc-p5',
          question: 'What off-take validation was presented to prove commercial demand?',
          answer: '$14 million in binding multi-year carbon removal pre-purchase commitments from enterprise buyers including Microsoft and Stripe Climate.',
          category: 'Market Validation',
          keyConcept: 'Carbon Off-take Agreements'
        }
      ],
      calendarEvents: [
        {
          id: 'cal-p1',
          title: 'TerraCapture Investor Due Diligence & MTA Deadline',
          description: 'Submit executed Material Transfer Agreement for third-party sorbent chemical analysis.',
          approximateDateTime: '2026-08-28T17:00:00',
          durationMinutes: 30,
          location: 'Virtual Data Room'
        },
        {
          id: 'cal-p2',
          title: 'TerraCapture Series A Syndicate Round Closing',
          description: 'Final execution of $25M Series A venture financing docs and capital call transfers.',
          approximateDateTime: '2026-09-15T23:59:00',
          durationMinutes: 60,
          location: 'Legal Portal'
        }
      ],
      rawTranscript: [
        { id: 'tp-1', timestamp: '00:00', seconds: 0, speaker: 'Maya (CEO)', text: 'Good morning investors. Current Direct Air Capture technologies cost upwards of $600 per metric ton of CO2 removed. Today, TerraCapture is unveiling our solid-sorbent matrix that operates at just 85 degrees Celsius.' },
        { id: 'tp-2', timestamp: '07:40', seconds: 460, speaker: 'Dr. Chen (Chief Scientist)', text: 'Our breakthrough is a metal-organic framework coated with polyethylenimine that selectively binds CO2 at 420 ppm concentrations using low-grade waste heat.' },
        { id: 'tp-3', timestamp: '18:15', seconds: 1095, speaker: 'Maya (CEO)', text: 'We captured 2,000 tons in Q2 and signed $14M in binding carbon removal pre-purchase contracts with Microsoft and Stripe Climate.' },
        { id: 'tp-4', timestamp: '26:30', seconds: 1590, speaker: 'Maya (CEO)', text: 'For our Series A round, we are raising $25 million to build our 50,000 ton/year Megaton-1 facility. Closing by September 15th.' },
        { id: 'tp-5', timestamp: '31:00', seconds: 1860, speaker: 'Maya (CEO)', text: 'Our virtual data room is open, and all material transfer agreements must be submitted by August 28th at 5 PM.' }
      ],
      keyTakeaways: [
        '85°C low-temperature desorption reduces energy consumption by 72%.',
        '$85/ton target cost backed by 2,000-ton operational pilot in Nevada.',
        '$14M in commercial off-take contracts with top climate buyers.',
        'Series A closing deadline: September 15th; Due diligence MTA due August 28th.'
      ]
    }
  }
];
