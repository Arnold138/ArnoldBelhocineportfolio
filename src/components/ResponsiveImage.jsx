import React, { useState } from 'react'

const ResponsiveImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  sizes = "100vw",
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Générer srcset automatiquement basé sur le nom de fichier
  const generateSrcSet = (baseSrc) => {
    const extension = baseSrc.split('.').pop()
    const baseName = baseSrc.replace(`.${extension}`, '')
    
    return `
      ${baseName}-400w.webp 400w,
      ${baseName}-800w.webp 800w,
      ${baseName}-1200w.webp 1200w,
      ${baseName}.webp 1600w
    `
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    console.warn(`Erreur de chargement: ${src}`)
    setHasError(true)
  }

  return (
    <div 
      className={`responsive-image-container ${className}`}
      style={{ 
        position: 'relative',
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto'
      }}
    >
      {/* Placeholder pour éviter CLS */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #f5f5f7, #e5e5e7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'inherit'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e5e7',
              borderTop: '3px solid #007aff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}

      <picture>
        {/* Source AVIF pour navigateurs modernes */}
        <source
          srcSet={generateSrcSet(src.replace(/\.(jpg|jpeg|png)$/, '.avif'))}
          sizes={sizes}
          type="image/avif"
        />
        
        {/* Source WebP pour compatibilité large */}
        <source
          srcSet={generateSrcSet(src.replace(/\.(jpg|jpeg|png)$/, '.webp'))}
          sizes={sizes}
          type="image/webp"
        />
        
        {/* Fallback image originale */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchpriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          {...props}
        />
      </picture>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ResponsiveImage