import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Toast from './components/Toast';

function App() {
  // Theme state: defaults to light (green & white), or stored preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('textutils_theme') || 'light';
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('editor');

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', icon: '' });

  // Sync theme with html root data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('textutils_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    showToast(
      theme === 'light' ? 'Dark theme activated' : 'Light (Green & White) theme activated',
      theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'
    );
  };

  const showToast = (message, icon = 'bi-check-circle-fill') => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 2600);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      <main className="container-xl my-4 flex-grow-1">
        {activeTab === 'editor' ? (
          <TextForm showToast={showToast} />
        ) : (
          <About />
        )}
      </main>

      <footer className="app-footer">
        <div className="container-xl">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <div>
              <span>Designed & Developed by </span>
              <a 
                href="https://github.com/juhipuri024" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Juhi Puri
              </a>
              <span> • Built with React 18 & Vite</span>
            </div>

            <div className="d-flex gap-3 align-items-center">
              <span className="small text-muted">Theme: {theme === 'light' ? 'Emerald Green & White' : 'Obsidian Neon-Mint'}</span>
              <a 
                href="https://github.com/juhipuri024/TextUtils" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-chip"
              >
                <i className="bi bi-github"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Toast toast={toast} />
    </div>
  );
}

export default App;
