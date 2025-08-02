import React, { useState, useEffect, useRef } from 'react';
import { User, MapPin, Code, Shield, Download, ArrowRight } from 'lucide-react';
import '../styles/aboutsection.scss';
import '../../public/CV_Arnold_Belhocine.pdf';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      icon: Code,
      title: "Développeur Full Stack",
      subtitle: "Une passion en progression constante",
      description: "Formation intensive en développement web avec une spécialisation React et Node.js. Motivation forte et collaboration active avec un entrepreneur sur des projets concrets full stack.",
      period: "Présent"
    },
    {
      icon: Shield,
      title: "P.S.I.G Gendarmerie Nationale",
      subtitle: "Intervention en milieu sensible et à haut risque",
      description: "Rigueur, discipline et esprit d'équipe acquis au service de la sécurité publique. Missions de protection, de surveillance et d’intervention rapide dans des contextes critiques.",
      period: "Missions & Interventions"
    },
    {
      icon: User,
      title: "Agent d’Intervention – Région Lyonnaise",
      subtitle: "Réactivité et maîtrise opérationnelle sur le terrain",
      description: "Interventions rapides sur alarmes, levées de doute, gestion d’effractions et de dégradations. Protection des sites, sécurisation des accès et coordination avec les forces de l’ordre. Expérience confirmée dans la gestion d’incidents en temps réel sur des zones sensibles de la région lyonnaise.",
      period: "Opérations & Terrain"
    }
  ];

  const skills = [
    {
      category: "Frontend",
      technologies: [
        "React",
        "JavaScript",
        "Vite.js",
        "CSS / SCSS / SASS",
        "HTML5",
        "Responsive Design",
        "React Router",
        "Animations CSS / Keyframes",
        "Animations de particules",
        "Framer Motion",
        "Single Page Application (SPA)"
      ],
      color: "#007aff"
    },
    {
      category: "Backend",
      technologies: [
        "Node.js",
        "Express",
        "API RESTful",
        "MongoDB / Mongoose",
        "SQL",
        "JWT Authentication",
        "bcrypt",
        "Multer",
        "Sharp",
        "Gestion des middlewares",
        "Architecture MVC",
        "Green Code"
      ],
      color: "#34c759"
    },
    {
      category: "Outils",
      technologies: [
        "Git / GitHub",
        "VS Code",
        "Figma",
        "Postman",
        "Gmail API",
        "JSON",
        "Netlify",
        "npm",
        "Calendrier et réservation sur mesure",
        "Gestion de projet full stack",
        "Testing API avec Postman"
      ],
      color: "#ff9500"
    }
  ];
  

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
          <h2 className="about-title">À propos de moi</h2>
          <div className="about-divider" />
          <p className="about-subtitle">
          De la rigueur du terrain à la précision du code, mon parcours mêle exigence opérationnelle et passion pour le développement web.
          </p>
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
                  className="cv-button"
                  download
                >
                  <Download size={18} />
                  <span>Télécharger mon CV</span>
                  <div className="button-background" />
                </a>
              </div>
            </div>
          </div>

          {/* Parcours professionnel */}
          <div className={`about-journey ${isVisible ? 'journey-visible' : ''}`}>
            <h3 className="journey-title">Mon Parcours</h3>
            
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="timeline-item"
                  style={{ transitionDelay: `${index * 150 + 400}ms` }}
                >
                  <div className="timeline-icon">
                    <exp.icon size={20} />
                  </div>
                  
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="timeline-title">{exp.title}</h4>
                      <span className="timeline-period">{exp.period}</span>
                    </div>
                    <p className="timeline-subtitle">{exp.subtitle}</p>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                  
                  <div className="timeline-connector" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compétences techniques */}
        <div className={`about-skills ${isVisible ? 'skills-visible' : ''}`}>
          <h3 className="skills-title">Compétences Techniques</h3>
          <p className="skills-subtitle">
           Ces technologies sont mes leviers pour transformer une idée en une interface rapide, propre et fonctionnelle.
          </p>
          
          <div className="skills-grid">
            {skills.map((skillSet, index) => (
              <div 
                key={index}
                className="skill-category"
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="skill-header">
                  <div 
                    className="skill-indicator"
                    style={{ backgroundColor: skillSet.color }}
                  />
                  <h4 className="skill-category-name">{skillSet.category}</h4>
                </div>
                
                <div className="skill-tags">
                  {skillSet.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="skill-tag"
                      style={{ 
                        borderColor: skillSet.color + '20',
                        color: skillSet.color 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
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