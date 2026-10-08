import React from 'react';

export default function About() {
  return (
    <div className="about-section">
      {/* Developer Profile Card */}
      <div className="dev-card mb-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-8">
            <div className="d-flex align-items-center gap-3 mb-2">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-3"
                style={{ width: '64px', height: '64px', background: 'var(--primary-gradient)', flexShrink: 0 }}
              >
                JP
              </div>
              <div>
                <h2 className="fs-3 fw-bold m-0" style={{ color: 'var(--text-main)' }}>Juhi Puri</h2>
                <p className="m-0 text-muted small">Frontend Developer | React & Modern Web Technologies</p>
              </div>
            </div>

            <p className="mt-3 mb-3" style={{ color: 'var(--text-secondary)' }}>
              Built as an advanced text manipulation and analysis workstation engineered with 
              <strong> React 18</strong>, <strong>Vite</strong>, and a custom CSS design system. 
              Designed to exhibit clean component architecture, seamless dual-theme UX, Web API integrations, 
              and robust state management.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <span className="tech-badge"><i className="bi bi-filetype-jsx"></i> React 18</span>
              <span className="tech-badge"><i className="bi bi-lightning-charge"></i> Vite 5</span>
              <span className="tech-badge"><i className="bi bi-palette"></i> CSS3 Design Tokens</span>
              <span className="tech-badge"><i className="bi bi-mic"></i> Web Speech API</span>
              <span className="tech-badge"><i className="bi bi-git"></i> Git & GitHub Actions</span>
              <span className="tech-badge"><i className="bi bi-check2-circle"></i> Clean Architecture</span>
            </div>
          </div>

          <div className="col-12 col-md-4 text-md-end">
            <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)' }}>
              <div className="small fw-bold text-muted text-uppercase mb-2">Project Repository</div>
              <a 
                href="https://github.com/juhipuri024/TextUtils" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-emerald text-decoration-none d-inline-flex justify-content-center w-100"
              >
                <i className="bi bi-github"></i>
                Star on GitHub
              </a>
              <div className="mt-2 small text-muted text-center">
                Automated CI/CD via GitHub Pages
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="modern-card">
        <h3 className="section-title fs-5 mb-3">
          <i className="bi bi-trophy-fill" style={{ color: 'var(--primary)' }}></i>
          Engineering Upgrade Highlights
        </h3>

        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0" style={{ color: 'var(--text-secondary)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ color: 'var(--text-main)', width: '30%' }}>Capability</th>
                <th style={{ color: 'var(--text-muted)', width: '35%' }}>Standard Tutorial App</th>
                <th style={{ color: 'var(--primary)', width: '35%' }}>This Upgraded Edition</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td className="fw-semibold">Theming & Aesthetics</td>
                <td>Generic Bootstrap dark class toggle</td>
                <td><strong style={{ color: 'var(--primary)' }}>Sleek Green & White (Light) + Obsidian Emerald (Dark)</strong> tokens</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td className="fw-semibold">State & History</td>
                <td>Single state variable (no undo)</td>
                <td><strong style={{ color: 'var(--primary)' }}>30-level Undo / Redo history stack</strong></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td className="fw-semibold">Transformations</td>
                <td>Only Uppercase and Lowercase</td>
                <td><strong style={{ color: 'var(--primary)' }}>Title, Sentence, camelCase, snake_case, kebab-case</strong></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td className="fw-semibold">Browser APIs</td>
                <td>None</td>
                <td><strong style={{ color: 'var(--primary)' }}>Web SpeechSynthesis, Clipboard API, FileReader</strong></td>
              </tr>
              <tr>
                <td className="fw-semibold">Data Extraction</td>
                <td>Not available</td>
                <td><strong style={{ color: 'var(--primary)' }}>Extracts Emails, URLs, and Numbers with regex</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Architectural FAQ Accordion */}
      <div className="modern-card">
        <h3 className="section-title fs-5 mb-3">
          <i className="bi bi-question-circle-fill" style={{ color: 'var(--primary)' }}></i>
          Technical FAQ & Architecture
        </h3>

        <div className="accordion modern-accordion" id="accordionAbout">
          <div className="accordion-item">
            <h4 className="accordion-header" id="headingOne">
              <button 
                className="accordion-button" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseOne" 
                aria-expanded="true" 
                aria-controls="collapseOne"
              >
                1. How is the theme system implemented without CSS performance overhead?
              </button>
            </h4>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionAbout">
              <div className="accordion-body">
                The application uses native CSS custom properties (variables) declared under 
                <code>[data-theme="light"]</code> and <code>[data-theme="dark"]</code> selectors. 
                Theme switching happens instantaneously by updating a single attribute on the document root element, 
                eliminating CSS repaint delays and persisting user preference seamlessly in <code>localStorage</code>.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h4 className="accordion-header" id="headingTwo">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseTwo" 
                aria-expanded="false" 
                aria-controls="collapseTwo"
              >
                2. How does the Undo / Redo engine work?
              </button>
            </h4>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionAbout">
              <div className="accordion-body">
                State revisions are tracked via an immutable snapshot stack. When any transformation occurs, future 
                redo branches are truncated and the new snapshot is appended, bound to a maximum depth of 30 entries 
                to guarantee optimal memory consumption in the browser.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h4 className="accordion-header" id="headingThree">
              <button 
                className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseThree" 
                aria-expanded="false" 
                aria-controls="collapseThree"
              >
                3. How does TextUtils calculate reading and speaking estimations?
              </button>
            </h4>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionAbout">
              <div className="accordion-body">
                Word parsing employs whitespace-resilient regular expressions to discard empty segments. 
                Reading time is calculated using the globally acknowledged cognitive benchmark of <strong>200 words per minute</strong> (~0.005 min/word), 
                while speaking time is estimated using standard natural conversational cadence of <strong>133 words per minute</strong> (~0.0075 min/word).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
