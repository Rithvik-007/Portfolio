const profile = {
  /* ─── Personal ─── */
  name: "Rithvik Pranao Nagaraj",
  tagline: "SDE & ML Engineer",
  bio: `Master's student in Computer Science at George Mason University (May 2026),
with a B.Tech in AI & Data Science. Passionate about building scalable
full-stack systems, applying deep learning to real-world problems, and
deploying ML-powered products end-to-end.`,
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  email: "rnagarajobs@outlook.com",
  phone: "571-668-0567",
  github: "https://github.com/Rithvik-007",
  linkedin: "https://linkedin.com/in/rithvik-pranao",

  /* ─── About Me (Personal Story) ─── */
  aboutMe: {
    story: `When I'm not building full-stack systems or training ML models, you'll find me
between the goalposts on the football (soccer) pitch — diving, saving, and leading
the backline. I've been a goalkeeper since I was a kid, and it taught me that split-second
decisions under pressure are everything, whether it's a penalty kick or a production bug at 2 AM.`,
    hobbies: ["Video Games", "Football (Soccer)"],
    sports: "Football (Soccer) — Goalkeeper",
    transferableSkills: ["Teamwork", "Collaboration", "Adaptability", "Leadership under pressure"],
  },

  /* ─── Skills ─── */
  skills: [
    "Python", "C#", "R", "JavaScript", "SQL", "HTML/CSS",
    "React", "Node.js", "FastAPI", "RESTful APIs",
    "TensorFlow", "PyTorch (CUDA)", "Scikit-learn", "LangChain", "RAG",
    "PostgreSQL", "MySQL", "SQLite", "DynamoDB", "ChromaDB",
    "AWS", "Docker", "CI/CD",
  ],

  /* ─── Work Experience ─── */
  work: [
    {
      id: 1,
      role: "Teaching Assistant — Applied Deep Learning",
      company: "George Mason University",
      duration: "Aug 2025 – Dec 2025",
      location: "Fairfax, VA",
      shortDesc: "Graded TensorFlow assignments and helped students with CNNs, RNNs & Transformers.",
      details: [
        "Evaluated 200+ TensorFlow assignments across CNNs, RNNs, and Transformer architectures, delivering structured feedback within 48-hour SLAs — contributing to a 15% improvement in average student scores over the semester.",
        "Conducted weekly office hours and debugging sessions, helping students resolve issues with model convergence, gradient flow, and GPU memory management in TensorFlow/Keras pipelines.",
        "Developed reusable Jupyter Notebook solution templates with annotated architecture diagrams, reducing grading turnaround by 25% and improving consistency across the TA team.",
      ],
      tech: ["TensorFlow", "CNNs", "RNNs", "Transformers", "Python"],
    },
    {
      id: 2,
      role: "Research Assistant",
      company: "George Mason University",
      duration: "Jan 2025 – May 2025",
      location: "Fairfax, VA",
      shortDesc: "Automated scraping of 10K+ cybersecurity posts and built ETL pipelines for LLM training.",
      details: [
        "Architected a scalable web-scraping pipeline using Python, BeautifulSoup, and asyncio to harvest 10K+ cybersecurity forum posts, reducing manual data collection time from weeks to hours.",
        "Designed and built ETL pipelines (Extract → Clean → Transform → Load) that converted raw HTML and unstructured text into structured JSON datasets, feeding directly into LLM fine-tuning workflows.",
        "Applied regex-based NER and pandas transformations to extract and normalize CVE IDs, exploit titles, timestamps, and severity labels — achieving 98% field-level accuracy across the dataset.",
        "Delivered production-ready training corpora that enabled the research team to fine-tune domain-specific language models, accelerating the NLP research timeline by 3 weeks.",
      ],
      tech: ["Python", "pandas", "BeautifulSoup", "ETL", "LLMs"],
    },
    {
      id: 3,
      role: "Software Development Engineer Intern",
      company: "Tradala Solution",
      duration: "Aug 2023 – Feb 2024",
      location: "Chennai, India",
      shortDesc: "Built a Unity C# SDK for blockchain integration and an async LangChain/ChromaDB RAG pipeline — cutting partner integration time 30% and document query latency 30%.",
      details: [
        "Migrated 2K+ lines of Node.js backend logic into a native Unity C# SDK, enabling game studios to integrate blockchain features directly inside the Unity Editor — reducing partner integration time by 30%.",
        "Integrated Nethereum to enable smart-contract calls (ERC-20 transfers, NFT minting) directly from Unity game scripts, unlocking in-game economy features that drove a 20% increase in partner adoption.",
        "Authored developer documentation, API references, and quickstart guides that cut average partner onboarding time from 2 weeks to 3 days.",
        "Separately engineered an async RAG pipeline using Python and LangChain, reducing document query latency by 30%.",
        "Vectorized and indexed 2K+ pages of unstructured technical specs into ChromaDB using dense embedding models, enabling fast semantic search and low-latency query execution.",
        "Implemented an async ingestion framework to process 200+ PDFs, generating metadata and populating vector stores with minimal I/O blocking.",
      ],
      tech: ["C#", "Unity", "Nethereum", "Node.js", "Python", "LangChain", "ChromaDB", "RAG"],
    },
  ],

  /* ─── Education ─── */
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "George Mason University",
      location: "Fairfax, VA",
      duration: "2024 – May 2026 (Expected)",
      gpa: null,
      coursework: [
        "Applied Deep Learning", "Machine Learning",
        "Algorithms", "Cloud Computing",
      ],
    },
    {
      degree: "Bachelor of Technology in AI & Data Science",
      school: "Kumaraguru College of Technology",
      location: "Coimbatore, India",
      duration: "2020 – May 2024",
      gpa: null,
      coursework: [
        "Artificial Intelligence", "Data Science",
        "Data Structures", "Software Engineering",
      ],
    },
  ],

  /* ─── Projects ─── */
  projects: [
    {
      id: 1,
      title: "HealthBridge — Full-Stack Telemedicine Platform",
      shortDesc: "Telemedicine platform with ML-powered doctor matching and real-time inference.",
      details: [
        "Designed RESTful APIs using FastAPI for doctor matching, user intake, and ML inference workflows.",
        "Integrated ML inference (DistilBERT, Whisper) into backend APIs with sub-300ms response latency.",
        "Built a React + Tailwind CSS frontend consuming backend APIs for real-time user interaction.",
      ],
      tech: ["FastAPI", "React", "DistilBERT", "Whisper", "Tailwind CSS"],
      github: "https://github.com/Rithvik-007/HealthBridge-AI",
    },
    {
      id: 2,
      title: "MedSAM CUDA-Accelerated Medical Segmentation",
      shortDesc: "Fine-tuned ViT-based MedSAM on Kvasir-SEG, boosting Dice score to 0.9448.",
      details: [
        "Implemented CUDA-accelerated training pipelines in PyTorch to fine-tune MedSAM on Kvasir-SEG.",
        "Fine-tuned ViT-based image encoder and mask decoder while freezing prompt encoder per MedSAM design.",
        "Trained and evaluated multiple models (generalist, fine-tuned, scratch) using Dice+BCE loss.",
        "Improved Dice score from 0.908 → 0.9448 through domain-specific fine-tuning on GPU.",
      ],
      tech: ["PyTorch", "CUDA", "ViT", "MedSAM", "Medical Imaging"],
      github: "https://github.com/Rithvik-007/Fine-Tuning-of-MedSAM-for-Polyp-Segmentation",
    },
    {
      id: 3,
      title: "FlowBoard — Real-Time Project & Task Management",
      shortDesc: "Full-stack Kanban board with real-time WebSocket sync, JWT auth, and role-based access control.",
      details: [
        "Built a real-time collaborative project management board (Angular 20 + FastAPI) supporting role-based access control (Owner, Admin, Member) across projects.",
        "Implemented a drag-and-drop Kanban board with hierarchical tasks/subtasks and threaded comments, synced instantly across connected clients via WebSockets.",
        "Designed JWT + bcrypt authentication and PostgreSQL (Neon) schemas via SQLAlchemy/Pydantic, with automated test coverage across backend services.",
      ],
      tech: ["Angular", "FastAPI", "PostgreSQL", "WebSockets", "JWT", "SQLAlchemy"],
      github: "https://github.com/Rithvik-007/Flow-board",
      demo: "https://flowboard-prod.netlify.app",
    },
    {
      id: 4,
      title: "Tiny Transformer SMS Spam Classifier (ESP32-C3)",
      shortDesc: "Custom 134K-param transformer built from scratch, achieving ~97% accuracy — deployable on a microcontroller.",
      details: [
        "Built a custom Tiny Transformer from scratch in raw PyTorch (no HuggingFace) with custom tokenizer and vocabulary builder.",
        "Architecture: Embedding → Positional Encoding → Multi-Head Attention → Feedforward → Classifier with only ~134K parameters.",
        "Achieved ~96–97% test accuracy on SMS spam classification, rivalling DistilBERT which was used as a benchmark.",
        "Optimised memory footprint to ~0.51 MB (FP32), ~0.128 MB (INT8), and ~0.064 MB (INT4) — suitable for ESP32-C3 microcontroller deployment.",
        "Included experiment logging, training curves, and per-run results for reproducibility.",
      ],
      tech: ["PyTorch", "Transformers", "Quantization", "ESP32", "Edge AI"],
      github: "https://github.com/Rithvik-007/tiny-transformer-esp32",
    },
    {
      id: 5,
      title: "Diffusion Models Beat GANs — ADM Reimplementation",
      shortDesc: "Reimplemented the ADM diffusion architecture on a single 6GB-VRAM GPU, comparing latent vs. pixel-space training.",
      details: [
        "Reimplemented the ADM (\"Diffusion Models Beat GANs\") architecture from the original paper as a CS575 final project, adapting a multi-GPU reference implementation to run on a single RTX 3060 (6GB VRAM).",
        "Trained a ~115M-parameter UNet in latent space using Stability AI's SD-VAE encoder with FP16 mixed precision and 8-bit Adam, comparing against pixel-space training under the same VRAM budget.",
        "Achieved an 8.8x training speedup via latent-space training, and a 6.1x inference speedup using DDIM sampling with TensorRT compilation.",
        "Implemented classifier-free guidance and benchmarking tooling for CIFAR-10 image generation.",
      ],
      tech: ["PyTorch", "Diffusion Models", "DDIM", "TensorRT", "CUDA"],
      github: "https://github.com/Rithvik-007/Diffusion_beats_GANs",
    },
  ],

  /* ─── Achievements ─── */
  achievements: [
    {
      id: 1,
      title: "2nd Place — Hackathon",
      description: "Won 2nd place at the George Washington University Hackathon (2025).",
    },
    {
      id: 2,
      title: "Research Contributor — GMU",
      description: "Contributed to cybersecurity NLP research, building datasets used for training large-language models.",
    },
    {
      id: 3,
      title: "Teaching Assistant — Deep Learning",
      description: "Selected as TA for Applied Deep Learning at George Mason University, mentoring 50+ students.",
    }
  ],
};

export default profile;
