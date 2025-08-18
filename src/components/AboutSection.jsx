import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Download } from 'lucide-react';
import '../styles/aboutsection.scss';
import '../../public/CV_Arnold_Belhocine.pdf';
import gendarmerieIcon from '../assets/images/logo-gendarmerie.svg';
import securityIcon from '../assets/images/logo-securite.webp';
import developerIcon from '../assets/images/logo-developpeur.webp';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Optimisation: éviter de créer l'observer si déjà visible
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Déconnecter après activation pour économiser les ressources
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [isVisible]);

  // Mémoriser les données statiques
  const experiences = useMemo(() => [
    {
      id: 1,
      icon: 'developer',
      title: "Développeur Full Stack",
      subtitle: "Une passion en progression constante",
      description: "Formation intensive en développement web avec une spécialisation React et Node.js. Motivation forte et collaboration active avec un entrepreneur sur des projets concrets full stack.",
      period: "2024 - Présent",
      date: "2024",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      details: {
        duration: "10 mois",
        location: "Valence & Remote",
        achievements: [
          "10 projets développés de A à Z",
          "Collaboration directe avec entrepreneur sur Arcana Games",
          "Utilisation quotidienne React + Node.js + MongoDB",
          "Interfaces modernes et réactives",
        ],
        technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript ES6+", "CSS", "Git", "Postman"],
        projects: ["Arcana Games", "Portfolio Moderne", "API RESTful", "Interfaces Animées"]
      }
    },
    {
      id: 2,
      icon: 'gendarmerie',
      title: "P.S.I.G Gendarmerie Nationale",
      subtitle: "Intervention en milieu sensible et à haut risque",
      description: "Rigueur, discipline et esprit d'équipe acquis au service de la sécurité publique. Missions de protection, de surveillance et d'intervention rapide dans des contextes critiques.",
      period: "Missions Intervention",
      date: "2022-2023",
      color: "#1e3a8a",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      details: {
        duration: "18 mois",
        location: "Région Normandie",
        achievements: [
          "Formation spécialisée intervention rapide",
          "Missions haute sécurité accomplies avec succès",
          "Leadership d'équipe en situation critique",
          "Reconnaissance officielle pour détermination"
        ],
        skills: ["Gestion de crise", "Travail en équipe", "Adaptabilité", "Résistance au stress", "Communication radio", "Intervention tactique"],
        values: ["Rigueur", "Discipline", "Respect", "Engagement", "Solidarité"]
      }
    },
    {
      id: 3,
      icon: 'security',
      title: "Agent d'Intervention – Région Lyonnaise",
      subtitle: "Réactivité et maîtrise opérationnelle sur le terrain",
      description: "Interventions rapides sur alarmes, levées de doute, gestion d'effractions et de dégradations. Protection des sites, sécurisation des accès et coordination avec les forces de l'ordre.",
      period: "Terrain & Opérations",
      date: "2021-2022",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      details: {
        duration: "14 mois",
        location: "Métropole de Lyon",
        achievements: [
          "200+ interventions réussies",
          "Coordination efficace avec forces de l'ordre",
          "Gestion autonome de secteurs sensibles",
          "Formation nouveaux agents"
        ],
        responsibilities: ["Surveillance active", "Levée de doute", "Rédaction rapports", "Contact clientèle", "Maintenance équipements"],
        zones: ["Sites industriels", "Centres commerciaux", "Résidences", "Bureaux d'entreprise"]
      }
    }
  ], []);

  const skillsData = useMemo(() => [
    {
      category: "Frontend",
      color: "#007aff",
      gradient: "linear-gradient(135deg, #007aff 0%, #5856d6 100%)",
      icon: "💻",
      mainTechs: ["React", "JavaScript", "CSS3/SCSS", "HTML5", "Responsive Design"],
      allTechs: ["React", "JavaScript", "Vite.js", "CSS/SCSS", "HTML5", "Responsive Design", "React Router", "Animations CSS/Keyframes", "Framer Motion", "SPA"],
      metrics: {
        projects: 10,
        animations: "15+"
      },
      achievement: "Interfaces modernes avec animations fluides",
      description: "Création d'expériences utilisateur exceptionnelles avec des performances optimales"
    },
    {
      category: "Backend", 
      color: "#34c759",
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      icon: "⚙️",
      mainTechs: ["Node.js", "Express", "MongoDB", "API RESTful", "JWT Auth"],
      allTechs: ["Node.js", "Express", "API RESTful", "MongoDB/Mongoose", "SQL", "Middlewares", "bcrypt", "Multer", "Sharp", "JWT", "Architecture MVC"],
      metrics: {
        security: "JWT + bcrypt",
        optimization: "Green Code"
      },
      achievement: "Architectures serveur robustes et sécurisées",
      description: "Développement d'APIs performantes avec sécurité renforcée"
    },
    {
      category: "DevOps & Outils",
      color: "#ff9500", 
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      icon: "🛠️",
      mainTechs: ["Git/GitHub", "Vite", "Postman", "VS Code", "Figma"],
      allTechs: ["Git/GitHub", "VS Code", "Figma", "Postman", "Gmail API", "JSON", "Netlify", "npm", "Testing API", "Workflow Automation"],
      metrics: {
        commits: "500+",
        deployment: "Auto",
        testing: "API",
        workflow: "CI/CD"
      },
      achievement: "Processus de développement optimisé",
      description: "Maîtrise complète des outils modernes de développement"
    }
  ], []);

  

  return (
    <section 
      id="about" 
      className="about-section" 
      ref={sectionRef}
    >
      <div className="about-container">
         {/* Effet de fond subtil */}
    <div className="about-background" />
        {/* En-tête de section */}
        <div className={`about-header ${isVisible ? 'header-visible' : ''}`}>
          <h2 className="about-title">A propos de moi</h2>
          <div className="about-divider" />
        </div>

        <div className="about-content">
          {/* Profil personnel */}
          <div className={`about-profile ${isVisible ? 'profile-visible' : ''}`}>
            <div className="profile-card">
              <div className="profile-avatar">
              </div>
              <div className="profile-info">
                <h3 className="profile-name">Arnold Belhocine</h3>
                <p className="profile-age">24 ans</p>
                <div className="profile-location">
                  <MapPin size={16} />
                  <span>Auvergne Rhône-alpes </span>
                </div>
              </div>

              <div className="profile-description">
                <p>
                  Développeur Full Stack passionné, je puise ma rigueur dans une première vie au service de la Gendarmerie
                  — un parcours atypique qui m’a appris à aller à l’essentiel, à garder le cap, et à m’adapter en toutes circonstances.
                    Aujourd’hui, c’est cette discipline que j’applique au développement web. 

                </p>
                <p>
                  Curieux de nature, je développe avec React et Node.js pour proposer des interfaces actuelles et des fonctionnalités solides. Mon but : avancer à chaque projet, apprendre des nouvelles pratiques, et livrer un résultat à la fois soigné et réactif.
                </p>
              </div>

              <div className="profile-actions">
                <a 
                  href={`${import.meta.env.BASE_URL}CV_Arnold_Belhocine.pdf`}
                  className="cv-button premium-bounce"
                  download
                >
                  <div className="button-content">
                    <Download size={18} className="download-icon" />
                    <span>Télécharger mon CV</span>
                  </div>
                  <div className="button-background" />
                  <div className="button-glow" />
                </a>
              </div>
            </div>
          </div>

          {/* Timeline Interactive Premium */}
          <div className={`about-journey ${isVisible ? 'journey-visible' : ''}`}>
            <div className="journey-header">
              <h3 className="journey-title">Mon Parcours</h3>
              <div className="title-divider"></div>
              <p className="journey-subtitle">
                Une évolution guidée par la passion, l'apprentissage continu et l'excellence opérationnelle
              </p>
            </div>
            
            <div className="timeline-premium">
              <div className="timeline-line" />
              
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`timeline-item-premium ${selectedExperience === exp.id ? 'active' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 200 + 400}ms`,
                    '--experience-color': exp.color,
                    '--experience-gradient': exp.gradient
                  }}
                  onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
                  onMouseEnter={() => {}}
                >
                  {/* Date badge */}
                  <div className="timeline-date">
                    {exp.date}
                  </div>
                  
                  {/* Icon avec glow effect */}
                  <div className="timeline-icon-premium">
                    <div className="icon-glow" />
                    <div className="icon-container">
                      {exp.icon === 'gendarmerie' ? (
                        <img src={gendarmerieIcon} alt="Gendarmerie" className="timeline-custom-icon" />
                      ) : exp.icon === 'security' ? (
                        <img src={securityIcon} alt="Sécurité" className="timeline-custom-icon" />
                      ) : exp.icon === 'developer' ? (
                        <img src={developerIcon} alt="Développeur" className="timeline-custom-icon" />
                      ) : (
                        <exp.icon size={24} />
                      )}
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className="timeline-card">
                    <div className="card-header">
                      <h4 className="timeline-title-premium">{exp.title}</h4>
                      <span className="timeline-period-premium">{exp.period}</span>
                    </div>
                    <p className="timeline-subtitle-premium">{exp.subtitle}</p>
                    <p className="timeline-description-premium">{exp.description}</p>
                    
                    <button className="details-toggle">
                      <span>{selectedExperience === exp.id ? 'Réduire les détails' : 'Voir les détails'}</span>
                      <div className="toggle-icon" style={{ display: selectedExperience === exp.id ? 'none' : 'flex' }}>
                        {selectedExperience === exp.id ? '−' : '+'}
                      </div>
                    </button>
                  </div>
                  
                  {/* Expanded details */}
                  {selectedExperience === exp.id && (
                    <div className="timeline-details">
                      <div className="details-grid">
                        <div className="detail-section">
                          <h5>Informations</h5>
                          <div className="detail-item">
                            <span className="detail-label">Durée</span>
                            <span className="detail-value">{exp.details.duration}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Lieu</span>
                            <span className="detail-value">{exp.details.location}</span>
                          </div>
                        </div>
                        
                        <div className="detail-section">
                          <h5>Réalisations</h5>
                          <ul className="achievements-list">
                            {exp.details.achievements.map((achievement, i) => (
                              <li key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {exp.details.technologies && (
                          <div className="detail-section">
                            <h5>Technologies</h5>
                            <div className="tech-pills">
                              {exp.details.technologies.map((tech, i) => (
                                <span 
                                  key={i} 
                                  className="tech-pill"
                                  style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {exp.details.skills && (
                          <div className="detail-section">
                            <h5>Compétences</h5>
                            <div className="skills-pills">
                              {exp.details.skills.map((skill, i) => (
                                <span 
                                  key={i} 
                                  className="skill-pill"
                                  style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compétences techniques - Premium */}
        <div className={`skills-premium ${isVisible ? 'skills-visible' : ''}`}>
          <div className="skills-header">
            <h3 className="skills-title">Compétence Technique</h3>
            <div className="title-divider"></div>
            <p className="skills-subtitle">
              Une maîtrise complète de l'écosystème web moderne, validée par des projets concrets et des résultats mesurables.
            </p>
          </div>

          {/* Compétences principales avec barres circulaires */}
          <div className="skills-main">
            {skillsData.map((skill, index) => (
              <div 
                key={index}
                className="skill-card"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="skill-visual">
                  <div className="circular-progress">
                    <div className="skill-icon">{skill.icon}</div>
                  </div>
                </div>
                
                <div className="skill-info">
                  <h4 className="skill-category">{skill.category}</h4>
                  <div className="skill-techs">
                    {skill.mainTechs.map((tech, i) => (
                      <span key={i} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="skill-description">{skill.description}</p>
                  <p className="skill-achievement">{skill.achievement}</p>
                  
                  {/* Toutes les technologies avec animation */}
                  <div className="skill-all-techs">
                    <div className="techs-scroll">
                      {skill.allTechs.map((tech, i) => (
                        <span 
                          key={i} 
                          className="tech-chip"
                          style={{ 
                            animationDelay: `${i * 0.1}s`,
                            borderColor: skill.color + '30',
                            color: skill.color
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="skill-metrics">
                    {Object.entries(skill.metrics).map(([key, value], i) => (
                      <div key={i} className="metric" style={{ animationDelay: `${i * 0.2}s` }}>
                        <span className="metric-value">{value}</span>
                        <span className="metric-label">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
    </div>
  </section>
  );
}

export default AboutSection;