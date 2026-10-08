# 🌿 TextUtils - Modern Text Analysis & Transformation Suite

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20GitHub%20Pages-059669?style=for-the-badge&logo=github)](https://juhipuri024.github.io/TextUtils/)
[![React 18](https://img.shields.io/badge/React-18.2.0-10b981?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-059669?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

A developer-grade, full-featured text studio and real-time analyzer engineered with **React 18**, **Vite**, and **custom CSS design tokens**. Designed with an eye-catching **Emerald Green & Crisp White** light theme and an **Obsidian Neon-Mint** dark mode.

---

## 🚀 Live Demo
🔗 **[Launch TextUtils on GitHub Pages](https://juhipuri024.github.io/TextUtils/)**

---

## ✨ Key Features & Capabilities

### 🎨 Dual Theme System (Tailored for UX)
- **Light Mode:** Modern Emerald Green (`#059669`), Mint accents, and crisp card surfaces.
- **Dark Mode:** Deep obsidian-emerald backdrop (`#080d0a`), luminous neon-mint glows, high-contrast readable text.
- **Persistence:** Real-time theme toggle persisted in `localStorage`.

### 🔄 Multi-Level Undo & Redo
- Built-in **30-level history stack** allowing instant recovery (`Undo` / `Redo`) from any transformation or edit.

### 🔤 Comprehensive Case Conversions
- **UPPERCASE** & **lowercase**
- **Title Case** (Capitalize Each Word)
- **Sentence case** (Grammatically capitalized based on punctuation)
- **Developer Formats:** `camelCase`, `PascalCase`, `snake_case`, `kebab-case`
- **Invert Case**

### 🧹 Text Sanitization & Utilities
- Remove redundant whitespace & extra spaces
- Strip unwanted newline breaks
- Remove HTML tags (`<tag>` stripping)
- Alphabetical line sorting

### 📊 Real-Time Analytics & Metrics
- Accurate **Word Count** (regex-powered whitespace filtering)
- **Total Characters** vs **Characters (excluding spaces)**
- **Sentence & Paragraph Counts**
- **Estimated Reading Time** (~200 WPM)
- **Estimated Speaking Cadence** (~133 WPM)
- **Reading Level Indicator** (Conversational, Standard, or Academic)

### 🔊 Interactive Web APIs & Tools
- **Speech Synthesis (Text-to-Speech):** Listen to text with Play, Pause, Resume, and Stop controls with dynamic audio wave animations.
- **Find & Replace:** Search with live occurrence counters and batch replacement.
- **Data Extractors:** Instant extraction of Emails, URLs, and Numbers with one-click copy.
- **File Import/Export:** Import `.txt` / `.md` files or export transformed documents.
- **Clipboard Management:** One-click copy with floating toast alerts.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 (Functional Components, Hooks: `useState`, `useEffect`, `useRef`)
- **Build System:** Vite 5 (Sub-second HMR & optimized production tree-shaking)
- **Design & Layout:** Custom CSS Custom Properties Design Tokens + Bootstrap 5.3 Grid & Icons
- **Web APIs:**
  - `SpeechSynthesis` (Web Speech API)
  - `Clipboard API` (`navigator.clipboard`)
  - `FileReader API` (Client-side file intake)
- **CI/CD:** Automated GitHub Actions pipeline to GitHub Pages on `main` push.

---

## 💻 Local Setup & Development

```bash
# 1. Clone the repository
git clone https://github.com/juhipuri024/TextUtils.git

# 2. Navigate to project root
cd TextUtils

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```

---

## 👤 Author

**Juhi Puri**
- GitHub: [@juhipuri024](https://github.com/juhipuri024)
