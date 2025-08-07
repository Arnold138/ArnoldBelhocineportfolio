import { lazy, Suspense } from 'react'

// Lazy loading pour différer le chargement
const AboutSection = lazy(() => import('./AboutSection'))

const LazyAboutSection = () => {
  return (
    <Suspense fallback={
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f5f7 0%, #fafafa 100%)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007aff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    }>
      <AboutSection />
    </Suspense>
  )
}

export default LazyAboutSection