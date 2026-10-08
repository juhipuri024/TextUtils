import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme }) {
  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-xl">
        <a 
          className="brand-badge" 
          href="#home" 
          onClick={(e) => { e.preventDefault(); setActiveTab('editor'); }}
        >
          <div className="brand-icon-box">
            <i className="bi bi-fonts"></i>
          </div>
          <span>Text<span className="brand-highlight">Utils</span></span>
        </a>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2" style={{ color: 'var(--primary)' }}></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1">
            <li className="nav-item">
              <button 
                type="button"
                className={`nav-link-custom border-0 bg-transparent ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('editor')}
              >
                <i className="bi bi-textarea-t"></i>
                Text Studio
              </button>
            </li>
            <li className="nav-item">
              <button 
                type="button"
                className={`nav-link-custom border-0 bg-transparent ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <i className="bi bi-person-badge"></i>
                About & Portfolio
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* GitHub Repository Badge */}
            <a 
              href="https://github.com/juhipuri024/TextUtils" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-chip text-decoration-none"
              title="View Source on GitHub"
            >
              <i className="bi bi-github"></i>
              <span className="d-none d-sm-inline">GitHub</span>
            </a>

            {/* Dark / Light Mode Switcher */}
            <button 
              type="button" 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <>
                  <i className="bi bi-moon-stars-fill text-warning"></i>
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <i className="bi bi-sun-fill text-warning"></i>
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired
};
