const profile = {
  /* ─── Personal ─── */
  name: "Rithvik Pranao Nagaraj",
  tagline: "SDE & ML Engineer",
  bio: `Master's student in Computer Science at George Mason University (May 2026),
with a B.Tech in AI & Data Science. Passionate about building scalable
full-stack systems, applying deep learning to real-world problems, and
deploying ML-powered products end-to-end.`,
  resumeUrl: "https://drive.google.com/file/d/1lOTZlKYti18Euk6Ctt8itezNx76TqUze/view?usp=sharing", // link to your resume PDF (update when hosted)
  email: "rnagara2@gmu.edu",
  phone: "571-668-0567",
  github: "https://github.com/Rithvik-007",
  linkedin: "https://linkedin.com/in/rithvik-pranao",

  /* ─── Skills ─── */
  skills: [
    "Python", "C#", "R", "JavaScript", "SQL", "HTML/CSS",
    "React", "Node.js", "FastAPI", "RESTful APIs",
    "TensorFlow", "PyTorch (CUDA)", "Scikit-learn", "Hugging Face",
    "PostgreSQL", "MySQL", "SQLite", "DynamoDB",
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
        "Graded TensorFlow assignments for Applied Deep Learning, providing fast feedback to help students improve.",
        "Assisted students with debugging models and understanding CNNs, RNNs, and Transformers.",
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
        "Automated scraping of over 10,000 cybersecurity posts using Python, pandas, BeautifulSoup, and requests, creating a dataset for further analysis.",
        "Built ETL pipelines in Python that cleaned and transformed raw text into JSON datasets, which were used to train large-language models.",
        "Cleaned and organized CVE IDs, exploit titles, and dates with regex and pandas for consistency.",
      ],
      tech: ["Python", "pandas", "BeautifulSoup", "ETL", "LLMs"],
    },
    {
      id: 3,
      role: "Unity Developer Intern (Blockchain)",
      company: "Tradala Solution",
      duration: "Aug 2023 – Nov 2023",
      location: "Chennai, India",
      shortDesc: "Migrated 2K+ lines of Node.js logic into a Unity SDK, cutting integration time by 30%.",
      details: [
        "Migrated 2K+ lines of Node.js logic into a Unity SDK in C#, reducing partner integration time by 30%.",
        "Integrated blockchain transactions with Nethereum to enable smart-contract calls in Unity, making in-game transactions possible and improving user experience.",
        "Created developer documentation and API references to speed up partner onboarding.",
      ],
      tech: ["C#", "Unity", "Node.js", "Nethereum", "Blockchain"],
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
      demo: "#",
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
      demo: "#",
    },
    {
      id: 3,
      title: "Secure Artifact Registry — Full-Stack Backend System",
      shortDesc: "Versioned ML artifact registry with JWT auth and Docker-deployed PostgreSQL.",
      details: [
        "Architected a secure registry for versioned ML artifacts with controlled sharing, reducing data sprawl.",
        "Built authenticated REST APIs with JWT-based access control enforcing private, shared, and public visibility.",
        "Designed schemas in SQLite and migrated to PostgreSQL via Docker for production deployment.",
        "Implemented file upload and metadata pipelines with version tracking, improving reproducibility.",
      ],
      tech: ["REST APIs", "JWT", "PostgreSQL", "Docker", "SQLite"],
      github: "https://github.com/Rithvik-007/secure-artifact-registry",
      demo: "#",
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
      demo: "#",
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
