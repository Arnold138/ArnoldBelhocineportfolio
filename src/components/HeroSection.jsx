import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import '../styles/main.css';

export default function HeroSection({ onNav }) {
  // Triangle narratif inversé - 3 niveaux
  const narrativeBlocks = [
    // Niveau 1 - Hero Statement (Impact Maximum)
    { text: "Vos projets, notre passion", pause: 1200, className: "hero-level-1", level: 1 },
    // Niveau 2 - Value Proposition 
    { text: "Chaque pixel compte, chaque interaction inspire", pause: 800, className: "hero-level-2", level: 2 },
    // Niveau 3 - Emotional Connection
    { text: "Créons votre Histoire.", pause: 0, className: "hero-level-3", level: 3 },
  ];

  // Mots avec gradient sélectif
  const gradientWords = ['Histoire'];

  const [typedText, setTypedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

  // Animation narrative séquentielle avec timing précis
  useEffect(() => {
    let blockIdx = 0;
    let charIdx = 0;
    let output = "";
    let timeout;

    function typeNextChar() {
      const currentBlock = narrativeBlocks[blockIdx];
      if (!currentBlock) {
        // Toute l'animation est terminée, déclencher l'avatar
        setIsTextComplete(true);
        setTimeout(() => setShowAvatar(true), 200); // Avatar apparaît 200ms après la fin du texte
        return;
      }

      // Animation en cours

      if (charIdx < currentBlock.text.length) {
        output += currentBlock.text[charIdx];
        setTypedText(output);
        charIdx++;
        timeout = setTimeout(typeNextChar, 50);
      } else {
        // Bloc terminé, passer au suivant après la pause
        blockIdx++;
        charIdx = 0;
        if (currentBlock.pause > 0) {
          timeout = setTimeout(typeNextChar, currentBlock.pause);
        } else {
          typeNextChar(); // Pas de pause, continuer immédiatement
        }
      }
    }

    // Démarrage initial avec délai de 300ms
    timeout = setTimeout(typeNextChar, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Curseur statique (plus d'animation de clignotement)

  // Rendu du texte narratif avec les classes appropriées et gradients sélectifs
  const renderNarrativeText = () => {
    let currentIndex = 0;
    
    return narrativeBlocks.map((block, blockIndex) => {
      const blockText = block.text;
      const blockStart = currentIndex;
      currentIndex += blockText.length;

      // Vérifier si ce bloc est dans le texte tapé
      if (typedText.length >= blockStart) {
        const visibleLength = Math.min(typedText.length - blockStart, blockText.length);
        const visibleText = blockText.substring(0, visibleLength);
        
        // Vérifier si ce bloc contient des mots avec gradient
        const hasGradientWords = gradientWords.some(word => blockText.includes(word));
        
        if (hasGradientWords && block.level === 3) {
          // Appliquer le gradient sélectif pour "success story"
          return (
            <div key={blockIndex} className={block.className}>
              {visibleText.split(' ').map((word, wordIndex) => {
                const fullWord = word;
                const isGradientWord = gradientWords.some(gradientWord => 
                  gradientWord.includes(fullWord) || fullWord.includes('Histoire') || fullWord.includes('Histoire')
                );
                
                if (isGradientWord || word === 'Histoire' || word === 'Histoire') {
                  return (
                    <span key={wordIndex} className="gradient-text">
                      {word}{wordIndex < visibleText.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  );
                }
                return (
                  <span key={wordIndex}>
                    {word}{wordIndex < visibleText.split(' ').length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </div>
          );
        }
        
        return (
          <div key={blockIndex} className={block.className}>
            {visibleText}
          </div>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="css-particles">
        {[...Array(35)].map((_, i) => (
          <span className={`particle p${i+1}`} key={i}></span>
        ))}
      </div>

      <div className="hero-content">
        {/* Triangle narratif inversé - Texte principal */}
        <div className="hero-narrative-text">
          {renderNarrativeText()}
          {!isTextComplete && <span className="hero-cursor">|</span>}
        </div>

        {/* Avatar repositionné après le texte avec animation sophistiquée */}
        <div className={`hero-avatar ${showAvatar ? 'avatar-visible' : 'avatar-hidden'}`}>
          <div className="avatar-container">
            <div className="avatar-name">AB</div>
          </div>
        </div>

        {/* Boutons d'action */}
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