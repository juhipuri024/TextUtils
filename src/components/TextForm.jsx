import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function TextForm({ showToast }) {
  const [text, setText] = useState('');
  
  // History stack for Undo / Redo functionality
  const [history, setHistory] = useState(['']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Find & Replace state
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findWord, setFindWord] = useState('');
  const [replaceWord, setReplaceWord] = useState('');

  // Extractor modal/drawer state
  const [extractedData, setExtractedData] = useState(null);

  // Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const fileInputRef = useRef(null);

  // Update history helper
  const updateTextWithHistory = (newText, message) => {
    if (newText === text) return;
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newText);
    if (nextHistory.length > 30) nextHistory.shift();
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setText(newText);
    if (message && showToast) {
      showToast(message, 'bi-check-circle-fill');
    }
  };

  const handleOnChange = (e) => {
    const val = e.target.value;
    setText(val);
    // Debounced or simple history update on typing
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(val);
    if (nextHistory.length > 30) nextHistory.shift();
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
      showToast('Undo performed', 'bi-arrow-counterclockwise');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setText(history[newIndex]);
      showToast('Redo performed', 'bi-arrow-clockwise');
    }
  };

  // Case Conversions
  const handleUppercase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    updateTextWithHistory(text.toUpperCase(), 'Converted to UPPERCASE');
  };

  const handleLowercase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    updateTextWithHistory(text.toLowerCase(), 'Converted to lowercase');
  };

  const handleTitleCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const title = text
      .toLowerCase()
      .split(' ')
      .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
      .join(' ');
    updateTextWithHistory(title, 'Converted to Title Case');
  };

  const handleSentenceCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const sentence = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
    updateTextWithHistory(sentence, 'Converted to Sentence case');
  };

  const handleCamelCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const camel = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, c => c.toLowerCase());
    updateTextWithHistory(camel, 'Converted to camelCase');
  };

  const handlePascalCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const pascal = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, c => c.toUpperCase());
    updateTextWithHistory(pascal, 'Converted to PascalCase');
  };

  const handleSnakeCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const snake = text
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    updateTextWithHistory(snake, 'Converted to snake_case');
  };

  const handleKebabCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const kebab = text
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    updateTextWithHistory(kebab, 'Converted to kebab-case');
  };

  const handleInvertCase = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const inverted = text
      .split('')
      .map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())
      .join('');
    updateTextWithHistory(inverted, 'Inverted text case');
  };

  // Cleaners & Utilities
  const handleRemoveExtraSpaces = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const cleaned = text.split(/[ ]+/).join(' ').trim();
    updateTextWithHistory(cleaned, 'Extra spaces removed');
  };

  const handleRemoveLineBreaks = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const cleaned = text.replace(/(\r\n|\n|\r)/gm, ' ');
    updateTextWithHistory(cleaned, 'Line breaks removed');
  };

  const handleStripHtml = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const stripped = text.replace(/<[^>]*>?/gm, '');
    updateTextWithHistory(stripped, 'HTML tags stripped');
  };

  const handleSortLines = () => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    const sorted = text.split(/\r?\n/).sort().join('\n');
    updateTextWithHistory(sorted, 'Lines sorted alphabetically');
  };

  // Find and Replace
  const handleReplaceAll = () => {
    if (!findWord) {
      showToast('Enter word to find', 'bi-exclamation-circle');
      return;
    }
    if (!text.includes(findWord)) {
      showToast(`No matches found for "${findWord}"`, 'bi-info-circle');
      return;
    }
    const regex = new RegExp(findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matchesCount = (text.match(regex) || []).length;
    const replaced = text.replace(regex, replaceWord);
    updateTextWithHistory(replaced, `Replaced ${matchesCount} occurrence(s)`);
  };

  // Copy to Clipboard
  const handleCopy = () => {
    if (!text) return showToast('Textarea is empty', 'bi-exclamation-circle');
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'bi-clipboard-check-fill');
  };

  // Clear Text
  const handleClear = () => {
    if (!text) return;
    updateTextWithHistory('', 'Text cleared');
  };

  // File Upload & Download
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      updateTextWithHistory(event.target.result, `Imported "${file.name}"`);
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleDownload = (format = 'txt') => {
    if (!text) return showToast('Enter text to download', 'bi-exclamation-circle');
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `TextUtils-Export.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Downloaded as TextUtils-Export.${format}`, 'bi-download');
  };

  // Load Presets
  const loadPreset = (type) => {
    let presetText = '';
    if (type === 'lorem') {
      presetText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
    } else if (type === 'dev') {
      presetText = 'const textUtils = { name: "TextUtils Studio", version: "2.0.0", features: ["Case Conversion", "Real-time Metrics", "Text to Speech"] };\nconsole.log(`Loaded ${textUtils.name}`);';
    } else if (type === 'article') {
      presetText = 'Modern web development thrives on clean aesthetics, responsive layouts, and intuitive user experiences. By combining React with modular CSS variables, developers can build scalable applications that feel delightful in both light and dark themes.';
    }
    updateTextWithHistory(presetText, `Loaded sample ${type}`);
  };

  // Data Extractors
  const handleExtract = (type) => {
    if (!text) return showToast('Please enter text first', 'bi-exclamation-circle');
    let results = [];
    let title = '';

    if (type === 'emails') {
      results = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || [];
      title = 'Extracted Emails';
    } else if (type === 'urls') {
      results = text.match(/https?:\/\/[^\s]+/gi) || [];
      title = 'Extracted URLs';
    } else if (type === 'numbers') {
      results = text.match(/\b\d+(\.\d+)?\b/g) || [];
      title = 'Extracted Numbers';
    }

    const uniqueResults = [...new Set(results)];
    setExtractedData({ title, items: uniqueResults, type });
    showToast(`Found ${uniqueResults.length} unique item(s)`, 'bi-search');
  };

  // Text-to-Speech
  const handleSpeak = () => {
    if (!text) return showToast('Please enter text to listen', 'bi-exclamation-circle');

    if (isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
      showToast('Speech paused', 'bi-pause-circle');
      return;
    }

    if (isSpeaking && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      showToast('Speech resumed', 'bi-play-circle');
      return;
    }

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    synthRef.current.speak(utterance);
    showToast('Playing speech audio...', 'bi-volume-up-fill');
  };

  const handleStopSpeech = () => {
    synthRef.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    showToast('Speech stopped', 'bi-stop-circle');
  };

  useEffect(() => {
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  // Real-time Text Statistics
  const wordsCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const charsTotal = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentencesCount = text.trim() ? (text.match(/[.!?]+(?=\s+|$)/g) || []).length || (text.trim().length > 0 ? 1 : 0) : 0;
  const paragraphsCount = text.trim() ? text.split(/\r?\n+/).filter(p => p.trim().length > 0).length : 0;
  const readingTime = (wordsCount * 0.005).toFixed(1); // 200 words per min (~0.005 min/word)
  const speakingTime = (wordsCount * 0.0075).toFixed(1); // ~133 words per min

  // Reading Level Indicator
  const getReadingLevel = () => {
    if (wordsCount === 0) return 'N/A';
    const avgWordLength = charsNoSpaces / wordsCount;
    if (avgWordLength < 4.5) return 'Easy / Conversational';
    if (avgWordLength < 6) return 'Standard / Balanced';
    return 'Complex / Academic';
  };

  // Find count for highlight
  const matchCount = findWord && text
    ? (text.match(new RegExp(findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length
    : 0;

  return (
    <div className="textutils-workspace">
      {/* Main Studio Card */}
      <div className="modern-card">
        <div className="section-header">
          <div>
            <h1 className="section-title">
              <i className="bi bi-pencil-square" style={{ color: 'var(--primary)' }}></i>
              Text Studio & Analyzer
            </h1>
            <p className="section-subtitle">
              Transform, inspect, analyze, and format text with developer-grade utilities.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Undo / Redo */}
            <button 
              type="button" 
              className="btn-chip"
              onClick={handleUndo} 
              disabled={historyIndex === 0}
              title="Undo last change"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              <span className="d-none d-md-inline">Undo</span>
            </button>

            <button 
              type="button" 
              className="btn-chip"
              onClick={handleRedo} 
              disabled={historyIndex >= history.length - 1}
              title="Redo change"
            >
              <i className="bi bi-arrow-clockwise"></i>
              <span className="d-none d-md-inline">Redo</span>
            </button>

            {/* Presets dropdown */}
            <div className="dropdown">
              <button 
                className="btn-chip dropdown-toggle" 
                type="button" 
                id="presetDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="bi bi-lightning-charge-fill text-warning"></i>
                <span>Sample Text</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="presetDropdown">
                <li><button className="dropdown-item" type="button" onClick={() => loadPreset('article')}>Article Draft</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => loadPreset('dev')}>Code Snippet</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => loadPreset('lorem')}>Lorem Ipsum</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Textarea Editor Box */}
        <div className="editor-container">
          <textarea
            className="modern-textarea"
            value={text}
            onChange={handleOnChange}
            placeholder="Type, paste, or import your text here to begin analyzing..."
            id="mainTextarea"
            rows="8"
          />

          <div className="editor-toolbar-bottom">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="editor-badge">
                <i className="bi bi-type"></i>
                {wordsCount} words
              </span>
              <span className="editor-badge">
                <i className="bi bi-card-text"></i>
                {charsTotal} chars
              </span>
              <span className="editor-badge d-none d-sm-inline-flex">
                <i className="bi bi-clock"></i>
                ~{readingTime}m read
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* File upload hidden input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".txt,.md,.json" 
                style={{ display: 'none' }} 
              />
              <button 
                type="button" 
                className="btn-chip" 
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                title="Import .txt, .md file"
              >
                <i className="bi bi-upload"></i>
                <span className="d-none d-sm-inline">Import</span>
              </button>

              <button 
                type="button" 
                className="btn-chip" 
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                <i className="bi bi-clipboard"></i>
                <span>Copy</span>
              </button>

              <button 
                type="button" 
                className="btn-chip danger" 
                onClick={handleClear}
                title="Clear all text"
              >
                <i className="bi bi-trash"></i>
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Case Converters */}
        <div className="mt-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="text-muted small fw-bold text-uppercase">
              <i className="bi bi-arrow-repeat me-1" style={{ color: 'var(--primary)' }}></i>
              Case Transformations
            </span>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn-emerald" onClick={handleUppercase}>
              UPPERCASE
            </button>
            <button type="button" className="btn-emerald" onClick={handleLowercase}>
              lowercase
            </button>
            <button type="button" className="btn-emerald" onClick={handleTitleCase}>
              Title Case
            </button>
            <button type="button" className="btn-emerald" onClick={handleSentenceCase}>
              Sentence case
            </button>
            <button type="button" className="btn-emerald-outline" onClick={handleCamelCase}>
              camelCase
            </button>
            <button type="button" className="btn-emerald-outline" onClick={handlePascalCase}>
              PascalCase
            </button>
            <button type="button" className="btn-emerald-outline" onClick={handleSnakeCase}>
              snake_case
            </button>
            <button type="button" className="btn-emerald-outline" onClick={handleKebabCase}>
              kebab-case
            </button>
            <button type="button" className="btn-chip" onClick={handleInvertCase}>
              iNVERT cASE
            </button>
          </div>
        </div>

        {/* Cleaners & Productivity Tools */}
        <div className="mt-3 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <span className="text-muted small fw-bold text-uppercase">
              <i className="bi bi-tools me-1" style={{ color: 'var(--primary)' }}></i>
              Cleaners & Utilities
            </span>

            <div className="d-flex gap-2">
              <button 
                type="button" 
                className={`btn-chip ${showFindReplace ? 'active' : ''}`}
                onClick={() => setShowFindReplace(!showFindReplace)}
              >
                <i className="bi bi-search"></i>
                Find & Replace
              </button>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn-chip" onClick={handleRemoveExtraSpaces}>
              <i className="bi bi-distribute-horizontal"></i>
              Remove Extra Spaces
            </button>
            <button type="button" className="btn-chip" onClick={handleRemoveLineBreaks}>
              <i className="bi bi-text-wrap"></i>
              Remove Line Breaks
            </button>
            <button type="button" className="btn-chip" onClick={handleStripHtml}>
              <i className="bi bi-code-slash"></i>
              Strip HTML Tags
            </button>
            <button type="button" className="btn-chip" onClick={handleSortLines}>
              <i className="bi bi-sort-alpha-down"></i>
              Sort Lines
            </button>

            {/* Extractor Pills */}
            <button type="button" className="btn-chip" onClick={() => handleExtract('emails')}>
              <i className="bi bi-envelope-at"></i>
              Extract Emails
            </button>
            <button type="button" className="btn-chip" onClick={() => handleExtract('urls')}>
              <i className="bi bi-link-45deg"></i>
              Extract URLs
            </button>
            <button type="button" className="btn-chip" onClick={() => handleExtract('numbers')}>
              <i className="bi bi-123"></i>
              Extract Numbers
            </button>

            {/* Audio Synthesis */}
            <button type="button" className="btn-chip" onClick={handleSpeak}>
              {isSpeaking && !isPaused ? (
                <>
                  <div className="audio-wave me-1">
                    <span className="audio-bar"></span>
                    <span className="audio-bar"></span>
                    <span className="audio-bar"></span>
                    <span className="audio-bar"></span>
                  </div>
                  Pause Speech
                </>
              ) : isPaused ? (
                <>
                  <i className="bi bi-play-circle-fill text-warning"></i>
                  Resume Speech
                </>
              ) : (
                <>
                  <i className="bi bi-volume-up-fill" style={{ color: 'var(--primary)' }}></i>
                  Read Aloud
                </>
              )}
            </button>

            {isSpeaking && (
              <button type="button" className="btn-chip danger" onClick={handleStopSpeech}>
                <i className="bi bi-stop-circle"></i>
                Stop Audio
              </button>
            )}

            {/* Export */}
            <div className="dropdown">
              <button className="btn-chip dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-download"></i>
                Export
              </button>
              <ul className="dropdown-menu shadow">
                <li><button className="dropdown-item" type="button" onClick={() => handleDownload('txt')}>Download as .txt</button></li>
                <li><button className="dropdown-item" type="button" onClick={() => handleDownload('md')}>Download as .md</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Collapsible Find & Replace Panel */}
        {showFindReplace && (
          <div className="tool-drawer">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="fw-bold d-flex align-items-center gap-2">
                <i className="bi bi-search" style={{ color: 'var(--primary)' }}></i>
                Find & Replace Tool
                {findWord && (
                  <span className="editor-badge ms-2">
                    {matchCount} match{matchCount === 1 ? '' : 'es'} found
                  </span>
                )}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                aria-label="Close"
                onClick={() => setShowFindReplace(false)}
              ></button>
            </div>

            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-5">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Find word / phrase..." 
                  value={findWord} 
                  onChange={(e) => setFindWord(e.target.value)}
                  style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                />
              </div>
              <div className="col-12 col-md-5">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Replace with..." 
                  value={replaceWord} 
                  onChange={(e) => setReplaceWord(e.target.value)}
                  style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                />
              </div>
              <div className="col-12 col-md-2">
                <button 
                  type="button" 
                  className="btn-emerald w-100 justify-content-center"
                  onClick={handleReplaceAll}
                >
                  Replace All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Data Modal / Drawer */}
        {extractedData && (
          <div className="tool-drawer mt-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="fw-bold d-flex align-items-center gap-2">
                <i className="bi bi-filter-circle-fill" style={{ color: 'var(--primary)' }}></i>
                {extractedData.title} ({extractedData.items.length})
              </div>
              <div className="d-flex gap-2">
                {extractedData.items.length > 0 && (
                  <button 
                    type="button" 
                    className="btn-chip"
                    onClick={() => {
                      navigator.clipboard.writeText(extractedData.items.join('\n'));
                      showToast('Copied extracted list!', 'bi-clipboard-check-fill');
                    }}
                  >
                    <i className="bi bi-clipboard"></i>
                    Copy List
                  </button>
                )}
                <button 
                  type="button" 
                  className="btn-chip danger"
                  onClick={() => setExtractedData(null)}
                >
                  Close
                </button>
              </div>
            </div>

            {extractedData.items.length === 0 ? (
              <p className="text-muted mb-0 small fst-italic">No items detected in current text.</p>
            ) : (
              <div className="d-flex flex-wrap gap-2 mt-2" style={{ maxHeight: '160px', overflowY: 'auto' }}>
                {extractedData.items.map((item, idx) => (
                  <span key={idx} className="tech-badge">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real-time Analytics Cards Grid */}
      <div className="modern-card">
        <div className="section-header mb-2">
          <h2 className="section-title fs-5">
            <i className="bi bi-graph-up-arrow" style={{ color: 'var(--primary)' }}></i>
            Real-time Text Metrics & Analytics
          </h2>
          <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '600' }}>
            Level: {getReadingLevel()}
          </span>
        </div>

        <div className="stats-grid">
          <div className="stat-tile">
            <i className="bi bi-card-text stat-icon"></i>
            <div className="stat-value">{wordsCount}</div>
            <div className="stat-label">Words</div>
          </div>

          <div className="stat-tile">
            <i className="bi bi-fonts stat-icon"></i>
            <div className="stat-value">{charsTotal}</div>
            <div className="stat-label">Total Characters</div>
          </div>

          <div className="stat-tile">
            <i className="bi bi-textarea-resize stat-icon"></i>
            <div className="stat-value">{charsNoSpaces}</div>
            <div className="stat-label">Chars (No Spaces)</div>
          </div>

          <div className="stat-tile">
            <i className="bi bi-chat-quote stat-icon"></i>
            <div className="stat-value">{sentencesCount}</div>
            <div className="stat-label">Sentences</div>
          </div>

          <div className="stat-tile">
            <i className="bi bi-paragraph stat-icon"></i>
            <div className="stat-value">{paragraphsCount}</div>
            <div className="stat-label">Paragraphs</div>
          </div>

          <div className="stat-tile">
            <i className="bi bi-stopwatch stat-icon"></i>
            <div className="stat-value">{readingTime}m</div>
            <div className="stat-label">Reading Time</div>
          </div>

          <div className="stat-tile">
            <i className="bi bi-mic stat-icon"></i>
            <div className="stat-value">{speakingTime}m</div>
            <div className="stat-label">Speaking Time</div>
          </div>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="modern-card">
        <div className="section-header mb-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-eye-fill" style={{ color: 'var(--primary)' }}></i>
            <h3 className="section-title fs-5 m-0">Live Output Preview</h3>
          </div>
          <button 
            type="button" 
            className="btn-chip"
            onClick={handleCopy}
            disabled={!text}
          >
            <i className="bi bi-clipboard"></i>
            Copy Preview
          </button>
        </div>

        <div className="preview-box">
          {text ? (
            findWord ? (
              // Highlight occurrences of findWord
              text.split(new RegExp(`(${findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')).map((part, index) => 
                part.toLowerCase() === findWord.toLowerCase() ? (
                  <mark key={index} className="match-highlight">{part}</mark>
                ) : (
                  part
                )
              )
            ) : (
              text
            )
          ) : (
            <span className="preview-box-empty">
              Nothing to preview yet. Enter text in the editor above to inspect live output.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

TextForm.propTypes = {
  showToast: PropTypes.func.isRequired
};
