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
                : section === 'about'
                ? 'about'
                : section === 'projects'
                ? 'projets'
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
    { id: 'about', label: 'À Propos', target: 'about' },
    { id: 'projets', label: 'Projets', target: 'projects' },
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
