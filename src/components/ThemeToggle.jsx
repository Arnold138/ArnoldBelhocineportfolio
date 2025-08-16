import React, { useState, useEffect } from 'react';
import '../styles/themetoggle.scss';

const ThemeToggle = ({ isDarkMode, onToggleTheme }) => {

  return (
    <button 
      className="theme-toggle" 
      onClick={onToggleTheme}
      aria-label={`Passer en mode ${isDarkMode ? 'clair' : 'sombre'}`}
    >
      <div className={`toggle-container ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="toggle-slider">
          <div className="toggle-icon">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;