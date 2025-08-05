import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import '../styles/main.css';
import { Particles } from "@tsparticles/react";
import ABlogo from './AbLogo.jsx';





export default function HeroSection({ onNav }) {
  // Bloc bien découpé et pause en minuscule
  const blocks = [
    { text: "Parce que votre projet mérite plus que du code", pause: 1000 },
    { text: " : ", pause: 0 },
    { text: "une vision", pause: 1000 },
    { text: ", ", pause: 0 },
    { text: "de l’impact.", pause: 1000 },
    { text: " Construisons-le ensemble.", pause: 0 },
  ];

  const name = 'impact';

  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Toute la logique d'écriture dans un seul useEffect
  useEffect(() => {
    let blockIdx = 0;     // index du bloc en cours
    let charIdx = 0;      // index du caractère dans le bloc
    let output = "";      // texte à afficher
    let timeout;

    function typeNextChar() {
      const currentBlock = blocks[blockIdx];
      if (!currentBlock) {
        setIsTypingComplete(true);
        setTimeout(() => setShowCursor(false), 2000);
        return;
      }

      if (charIdx < currentBlock.text.length) {
        output += currentBlock.text[charIdx];
        setTyped(output);
        charIdx++;
        timeout = setTimeout(typeNextChar, 50); // délai entre chaque lettre
      } else {
        blockIdx++;
        charIdx = 0;
        timeout = setTimeout(typeNextChar, currentBlock.pause); // on attend la pause
      }
    }

    timeout = setTimeout(typeNextChar, 300); // délai avant de commencer
    return () => clearTimeout(timeout); // clean-up si le composant est démonté
  }, []);

  // Gestion du curseur clignotant (pareil que toi)
  useEffect(() => {
    if (!isTypingComplete) {
      const blink = setInterval(() => {
        setShowCursor(v => !v)
      }, 500)
      return () => clearInterval(blink)
    }
  }, [isTypingComplete])

  // Gestion du mot "impact" en dégradé (pareil que toi)
  const renderTypedText = () => {
    const nameStartIndex = typed.indexOf(name)
    const nameEndIndex = nameStartIndex + name.length

    return typed.split('').map((char, index) => {
      if (index >= nameStartIndex && index < nameEndIndex) {
        return (
          <span key={index} className="gradient-text">
            {char}
          </span>
        )
      }
      return (
        <span key={index}>
          {char}
        </span>
      )
    })
  }

  // Rendu du composant (inchangé)
  return (
    <section id="home" className="hero">

      
      <div className="hero-bg" />
      <div className="css-particles">
        {[...Array(35)].map((_, i) => (
          <span className={`particle p${i+1}`} key={i}></span>
        ))}
      </div>


      <div className="hero-content">
      <div className="hero-avatar">
  <ABlogo />
</div>
        <h1 className="hero-title">
          {renderTypedText()}
          {showCursor && <span className="hero-cursor">|</span>}
        </h1>

        <div className="hero-buttons">
          <button onClick={() => onNav('projects')} className="btn btn-primary">
            Voir mes projets
          </button>
          <button onClick={() => onNav('contact')} className="btn btn-outline">
            Me contacter
          </button>
        </div>
      </div>

      <div className="hero-scroll" onClick={() => onNav('projects')}>
        <ChevronDown size={24} color="#6b7280" />
      </div>
    </section>
  )
}
