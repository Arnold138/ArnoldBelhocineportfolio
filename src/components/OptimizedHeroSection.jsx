import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import '../styles/main.css'

export default function OptimizedHeroSection({ onNav }) {
  const narrativeBlocks = [
    { text: "Vos projets, notre passion", className: "hero-level-1", level: 1 },
    { text: "Chaque pixel compte, chaque interaction inspire", className: "hero-level-2", level: 2 },
    { text: "Créons votre Histoire.", className: "hero-level-3", level: 3 },
  ]

  const [isVisible, setIsVisible] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)

  useEffect(() => {
    // Affichage immédiat pour LCP, puis animation
    setIsVisible(true)
    
    // Animation différée après le LCP
    const timer = setTimeout(() => {
      setShowAvatar(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const gradientWords = ['Histoire']
  
  const processText = (text) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]$/, '')
      const punctuation = word.match(/[.,!?;:]$/)
      
      if (gradientWords.includes(cleanWord)) {
        return (
          <span key={index} className="gradient-text">
            {cleanWord}
            {punctuation && punctuation[0]}
          </span>
        )
      }
      return word
    }).reduce((acc, word, index) => {
      if (index === 0) return [word]
      return [...acc, ' ', word]
    }, [])
  }

  return (
    <div className="hero-section">
      {/* Contenu critique visible immédiatement pour LCP */}
      <div 
        className={`hero-content ${isVisible ? 'visible' : ''}`}
        style={{
          // Dimensions fixes pour éviter CLS
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {narrativeBlocks.map((block, index) => (
          <div
            key={index}
            className={`narrative-block ${block.className} ${isVisible ? 'animate-in' : ''}`}
            style={{
              animationDelay: `${index * 200}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {typeof block.text === 'string' ? processText(block.text) : block.text}
          </div>
        ))}
      </div>

      {/* Avatar avec lazy loading */}
      <div 
        className={`hero-avatar ${showAvatar ? 'show' : ''}`}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          margin: '2rem auto',
          background: 'linear-gradient(135deg, #007aff, #5856d6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '3rem',
          opacity: showAvatar ? 1 : 0,
          transform: showAvatar ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        👨‍💻
      </div>

      {/* Bouton scroll avec dimensions fixes */}
      <button
        onClick={onNav}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50px',
          height: '50px',
          background: 'transparent',
          border: '2px solid rgba(0, 122, 255, 0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        aria-label="Défiler vers la section suivante"
      >
        <ChevronDown size={24} color="#007aff" />
      </button>

      <style jsx>{`
        .hero-content.visible .narrative-block {
          animation: slideInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .scroll-indicator:hover {
          border-color: rgba(0, 122, 255, 0.6);
          transform: translateX(-50%) scale(1.1);
        }
      `}</style>
    </div>
  )
}