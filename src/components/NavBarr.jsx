import React, { useState, useEffect } from 'react';
import '../styles/navbarrr.scss';

const NavBar = ({ onNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  // Détection du scroll pour effet de blur/transparence
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Détection de la section active
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(
              section === 'home'
                ? 'accueil'
                : section === 'projects'
                ? 'projets'
                : section === 'about'
                ? 'about'
                : 'contact'
            );
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar affichée pendant 8s au chargement
  useEffect(() => {
    setNavbarVisible(true);
    const timer = setTimeout(() => {
      setFirstLoad(false);
      // Si la souris n'est PAS en haut au moment des 8s, cache la navbar
      if (typeof window !== "undefined") {
        // On check la position de la souris si elle existe
        document.addEventListener("mousemove", function once(e) {
          if (e.clientY >= 30) {
            setNavbarVisible(false);
          }
          document.removeEventListener("mousemove", once);
        });
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Gestion de la navbar qui s'affiche/se cache selon la position de la souris APRÈS les 8s
  useEffect(() => {
    if (firstLoad) return;

    let timeoutId = null;

    const handleMouseMove = (e) => {
      if (e.clientY < 30) {
        setNavbarVisible(true);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setNavbarVisible(false), 700);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [firstLoad]);

  const navigationItems = [
    { id: 'accueil', label: 'Accueil', target: 'home' },
    { id: 'projets', label: 'Projets', target: 'projects' },
    { id: 'about', label: 'À Propos', target: 'about' },
    { id: 'contact', label: 'Contact', target: 'contact' }
  ];
  
  const handleNavClick = (target) => {
    onNav(target);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${
        navbarVisible ? 'navbar-visible' : 'navbar-hidden'
      }`}
    >
      <div className="navbar-container">
        {/* Logo avec effet hover */}
        <div className="navbar-logo">
          <span className="logo-text">Arnold Belhocine</span>
          <div className="logo-dot"></div>
          <div className="navbar-social-links">
            <a
              href="https://github.com/Arnold138"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="navbar-social-link"
            >
              <svg className="navbar-social-icon" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M12 2C6.475 2 2 6.488 2 12.042c0 4.434 2.865 8.196 6.839 9.525.5.09.682-.218.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.162-1.11-1.472-1.11-1.472-.908-.626.069-.614.069-.614 1.004.072 1.532 1.034 1.532 1.034.892 1.546 2.341 1.1 2.91.841.092-.648.35-1.1.636-1.353-2.221-.256-4.555-1.114-4.555-4.957 0-1.094.39-1.988 1.029-2.688-.103-.256-.446-1.288.098-2.684 0 0 .84-.27 2.75 1.025A9.48 9.48 0 0112 6.844c.85.004 1.705.115 2.504.338 1.91-1.295 2.748-1.025 2.748-1.025.545 1.396.202 2.428.1 2.684.64.7 1.027 1.594 1.027 2.688 0 3.851-2.337 4.698-4.566 4.95.36.31.68.92.68 1.855 0 1.338-.012 2.418-.012 2.748 0 .267.18.577.688.48A10.014 10.014 0 0022 12.042C22 6.488 17.522 2 12 2Z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/arnold-belhocine-0aa178204"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="navbar-social-link"
            >
              <svg className="navbar-social-icon" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.48-1.51-2.48-1.51 0-1.74 1.18-1.74 2.4v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.55 1.97 3.55 4.54v4.77z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation principale */}
        <div className="navbar-menu">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.target)}
              className={`nav-item ${
                activeSection === item.id ? 'nav-item-active' : ''
              }`}
            >
              <span className="nav-text">{item.label}</span>
              <div className="nav-indicator"></div>
            </button>
          ))}
        </div>

        {/* Bouton CTA */}
        <div className="navbar-cta">
          <button
            onClick={() => handleNavClick('contact')}
            className="cta-button"
          >
            <span className="cta-text">Contactez-moi ! </span>
            <div className="cta-background"></div>
          </button>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="scroll-indicator">
        <div
          className="scroll-progress"
          style={{
            transform: `scaleX(${Math.min(
              1,
              window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)
            )})`
          }}
        ></div>
      </div>
    </nav>
  );
};

export default NavBar;
