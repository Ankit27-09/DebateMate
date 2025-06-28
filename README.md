## 🗣️ DebateMate – AI-Powered Debate Analysis & Trainer

DebateMate is an open-source platform offering personalized, one-to-one AI training sessions with secure authentication. Users receive customized learning roadmaps powered by Gemini AI. After uploading or live-recording debate audio, the system transcribes, analyzes performance, and provides corrective feedback to enhance debating and public speaking skills.

---

## ✨ Features

- 🔐 **Secure Authentication:** NextAuth & Next.js
- 🎯 **Personalized AI Training:** One-to-one debate sessions with real-time feedback
- 🛣 **Customized Learning Paths:** Clear timelines powered by Gemini AI
- 💻 **Modern UI:** Landing page built with Next.js and Shadcn UI

---

## 📦 Folder Structure

```plaintext
DebateMate/
├── .next/                   # Next.js build output
├── node_modules/            # Project dependencies
├── public/                  # Static assets (images, fonts, etc.)
├── src/                     # Main source directory
│   ├── app/                 # Next.js app directory (pages and layouts)
│   ├── components/          # UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and libraries
│   └── middleware.ts        # Middleware (e.g., auth, logging)
├── .env                     # Environment variables
├── .gitignore               # Git ignore rules
├── CODE_OF_CONDUCT.md       # Community guidelines
├── CONTRIBUTING.md          # Contribution rules
├── LICENSE                  # MIT License
├── README.md                # Project overview
├── components.json          # Shadcn component config
├── eslint.config.mjs        # ESLint config
├── next.config.ts           # Next.js config
├── next-env.d.ts            # Next.js type definitions
├── package.json             # NPM package metadata
├── package-lock.json        # Dependency lock file
├── postcss.config.mjs       # PostCSS config
└── tsconfig.json            # TypeScript config
```

---

## 🚀 Getting Started

**🧰 Prerequisites**
- Node.js v18+
- Next.js 15
- npm, pip, and Git

---

## 🛠️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ankit27-09/DebateMate.git
   cd DebateMate
   ```

2. **FrontEnd (Next.js + TypeScript)**
   ```bash
   npm install
   cp .env.example .env #enter you api keys and gemini key
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

We welcome contributions! See our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

You can also explore:
- `good first issue`
- `help wanted`
- Join the discussion tab

---

## 📢 Community & Support

- 🗨️ [GitHub Discussions](https://github.com/Ankit27-09/DebateMate/discussions)
- 🐞 [Raise an Issue](https://github.com/Ankit27-09/DebateMate/issues)

---

## 🌍 Impact

DebateMate lowers the barrier to effective debating practice by providing instant, AI-driven feedback and personalized learning paths—ideal for students, educators, and public speakers.

---

## 🔮 Future Scope

- 🎭 **Emotion-Aware AI Debater:** Adapts tone and rebuttal style in real-time
- 👨‍🏫 **Virtual Mentor Mode:** Debate against AI-powered personas (e.g., Tavus)
- 📈 **Debate Progress Analytics:** Track clarity, logic, and tone over time with visual insights
- 🏅 **Gamified Debate Ladder:** Ranks, achievements, and global leaderboards
- 🧩 **Educator Plugin System:** Custom debate topics, rubrics, and assignments
- 🌐 **Multilingual & Cultural Debate Modes:** Regional language support with culturally adaptive prompts

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).  
Feel free to use, fork, and contribute!
