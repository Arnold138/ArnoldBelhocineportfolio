import React, { useState, useEffect, useRef } from 'react'
import { ExternalLink, ChevronDown } from 'lucide-react'
import '../styles/projetsection.scss';
import GitHub from '../assets/images/github.png'
const ProjectsSection = ({ projects }) => {
  const [openIndex, setOpenIndex] = useState(null); // index de la card ouverte
  const [isVisible, setIsVisible] = useState(false); // pour l'animation d'apparition au scroll
  const [scrollProgress, setScrollProgress] = useState(0); // pour l'effet parchemin
  const sectionRef = useRef(null); // ref pour la section principale
  const titleRefs = useRef([]); // refs pour les titres
  // Apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Effet de scroll parchemin
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        const scrollTop = Math.max(0, windowHeight - rect.top);
        const progress = Math.min(1, scrollTop / (sectionHeight + windowHeight));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vérifier si les titres débordent
  useEffect(() => {
    const checkTextOverflow = () => {
      titleRefs.current.forEach((titleRef) => {
        if (titleRef) {
          const isOverflowing = titleRef.scrollWidth > titleRef.offsetWidth;
          if (isOverflowing) {
            titleRef.classList.add('text-overflowing');
          } else {
            titleRef.classList.remove('text-overflowing');
          }
        }
      });
    };

    // Vérifier au chargement et au redimensionnement
    checkTextOverflow();
    window.addEventListener('resize', checkTextOverflow);
    
    return () => window.removeEventListener('resize', checkTextOverflow);
  }, [projects, isVisible]);


  return (
    <section
      id="projects"
      className={`projects-section ${isVisible ? 'projects-visible' : ''}`}
      ref={sectionRef}
    >
      <div
        className="parchment-overlay"
        style={{
          '--scroll-progress': scrollProgress,
          opacity: isVisible ? 1 : 0
        }}
      />

      <div className="projects-container">
        <div className={`projects-header ${isVisible ? 'header-visible' : ''}`}>
          <h2 className="projects-title">Mes Projets</h2>
          <div className="projects-divider" />
          <p className="projects-subtitle">
            Découvrez quelques-uns de mes projets récents qui démontrent mes compétences en développement.
          </p>
        </div>

        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="projects-empty">
              <p>Aucun projet à afficher pour le moment.</p>
            </div>
          ) : (
            projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${isVisible ? 'project-card-visible' : 'project-card-hidden'}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  '--card-index': index
                }}
              >
                <div className="project-image-container">
               <img
                  src={project.image}
                  alt={project.title}
                  className={`project-image ${project.imageClass || ''}`}
                />
                </div>

                <div className="project-content">
                  {/* Ligne titre + flèche à droite */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <h3 
                      className="project-title" 
                      style={{ margin: 0 }}
                      ref={(el) => titleRefs.current[index] = el}
                    >
                      {project.title}
                    </h3>
                    <button
                      className="dropdown-toggle"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      aria-label={openIndex === index ? "Réduire la description" : "Afficher la description complète"}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        outline: "none"
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "transform 0.4s cubic-bezier(.5,1.8,.4,.8)",
                          transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                          background: "#F5F5F7",
                          borderRadius: "50%",
                          width: 34,
                          height: 34,
                          boxShadow: openIndex === index ? "0 4px 16px 0 rgba(0,0,0,0.07)" : "0 2px 6px 0 rgba(0,0,0,0.05)"
                        }}
                      >
                        <ChevronDown size={20} strokeWidth={2} color="#222" />
                      </span>
                    </button>
                  </div>

                  {/* Description courte */}
                  <p className="project-description">{project.description}</p>

                  {/* Description déroulante avec ID unique */}
                  <div
                    className={`dropdown-content ${openIndex === index ? "open" : ""}`}
                    style={{
                      maxHeight: openIndex === index ? '1000px' : '0px',
                      padding: openIndex === index ? '1rem 0' : '0'
                    }}
                  >
                    <div
                      style={{ margin: 0, padding: 0 }}
                      dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                    />
                  </div>

                  {/* Tags tech */}
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                     <div className='project-linkexternal'>
                        {/* Lien vers le projet : uniquement si link existe */}
                        {project.link && (
                          <a
                            href={project.link}
                            className="project-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Voir le projet <ExternalLink className="project-link-icon" />
                          </a>
                        )}
                        
                        {/* Lien vers GitHub : uniquement si linkGitHub existe */}
                        {project.linkGitHub && (
                          <a
                            href={project.linkGitHub}
                            className="project-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Voir le GitHub <img className="git" src={GitHub} alt="logo Github" />
                          </a>
                        )}
                      </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection