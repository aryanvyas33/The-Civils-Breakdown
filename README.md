# The Civils Breakdown 📚⚡

A comprehensive, intelligent search and analytical engine for UPSC Civil Services Examination (CSE) Previous Year Questions (PYQs). Built with Next.js 14, TypeScript, Tailwind CSS, and powered by Gemini & Firebase.

---

## ✨ Features

- 🔍 **Instant Fuzzy & Semantic Search**: Fast query matching across years, subjects, papers, and themes using Fuse.js.
- 🎯 **AI Question Deconstruction**: Breakdown of complex mains questions into core directives, sub-demands, and contextual keywords.
- 📌 **Syllabus Mapping & Micro-Theming**: Direct mapping to GS1, GS2, GS3, GS4, and Essay syllabus pointers.
- 📈 **High-Yield Concept Tracking**: Identify recurrent themes, high-frequency topics, and trend trajectories.
- 📰 **Current Affairs Priority Tracker**: Contextual linkage of recent issues to static syllabus and PYQ trends.
- 🔐 **Firebase Authentication**: User accounts, bookmarking, and personalized revision tracking.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Search**: [Fuse.js](https://fusejs.io/)
- **Backend / Auth**: [Firebase](https://firebase.google.com/)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) / Gemini API

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aryanvyas33/The-Civils-Breakdown.git
   cd The-Civils-Breakdown
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a local `.env` file with your Firebase configuration and API keys.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── public/               # Static assets
├── scripts/              # Data parsing, scraping, and indexing pipelines
├── src/
│   ├── app/              # Next.js App Router (pages & API routes)
│   ├── components/       # Reusable UI components
│   ├── data/             # Indexed PYQ dataset & syllabus schemas
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Firebase, AI clients, and helper utilities
│   ├── store/            # Zustand global stores
│   └── types/            # TypeScript interface definitions
├── wireframes/           # UI prototypes & wireframe specs
└── screenshots/          # Application preview captures
```

---

## 📄 License

MIT License. Designed for UPSC CSE aspirants.
