import React, { useRef, useEffect, useState } from 'react'

const OptimizedGitFlame = ({ className = "", style = {} }) => {
  const videoRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [useGif, setUseGif] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Détection du support vidéo
    const video = document.createElement('video')
    const supportsWebM = video.canPlayType('video/webm; codecs="vp8"') !== ''
    const supportsMP4 = video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== ''
    
    if (!supportsWebM && !supportsMP4) {
      setUseGif(true)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isHovered])

  const handleVideoLoad = () => {
    setIsLoaded(true)
  }

  const handleVideoError = () => {
    console.warn('Échec chargement vidéo, fallback GIF')
    setUseGif(true)
  }

  if (useGif) {
    return (
      <div
        className={className}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? "/src/assets/images/gitflamme.gif" : "/src/assets/images/gitflamme-static.webp"}
          alt="Git Flame Animation"
          width="120"
          height="120"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div 
      className={`video-container ${className}`} 
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Placeholder pendant chargement pour éviter CLS */}
      {!isLoaded && (
        <div 
          style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute'
          }}
        >
          <span style={{ fontSize: '2rem' }}>🔥</span>
        </div>
      )}
      
      <video
        ref={videoRef}
        width="120"
        height="120"
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        style={{ 
          borderRadius: '50%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {/* Sources multiples pour compatibilité */}
        <source src="/src/assets/videos/gitflamme.webm" type="video/webm" />
        <source src="/src/assets/videos/gitflamme.mp4" type="video/mp4" />
        
        {/* Fallback image si vidéo non supportée */}
        <img
          src="/src/assets/images/gitflamme-static.webp"
          alt="Git Flame"
          width="120"
          height="120"
        />
      </video>
    </div>
  )
}

export default OptimizedGitFlame