import React, { useState, useEffect, useRef } from 'react'
import '../styles/testimonialsection.scss'
import gendarmerieIcon from '../assets/images/logo-gendarmerie.svg'

const TestimonialSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`testimonial-section ${isVisible ? 'testimonial-visible' : ''}`}
    >
      <div className="testimonial-container">
        <div className="testimonial-content">
          <div className="testimonial-quote">
            <span className="testimonial-icon">
              <img src={gendarmerieIcon} alt="Gendarmerie Nationale" />
            </span>
            <blockquote>
              « Arnold fait partie de ces personnes dont la détermination force le respect. 
              Il n'a jamais reculé devant la difficulté et a toujours mené ses missions à terme, 
              quelles que soient les circonstances. »
            </blockquote>
            <cite>— Major, Gendarmerie Nationale</cite>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection