import React, { useState, useEffect } from 'react'
import './App.css'
import NavBarr from './components/NavBarr'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialSection from './components/TestimonialSection'
import ContactSection from './components/ContactSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer.jsx'
import kasaImg from './assets/images/kasalogo.png'
import grimoireImg from '../src/assets/images/victorhugo.jpg';
import ArcanaGames from '../src/assets/images/ArcanaGame_Logo_detourer.png';
import MonGif from '../src/assets/images/gitflamme.gif';



export default function App() {
  // Theme management at App level - START IN LIGHT MODE
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false; // Default to light mode (false)
  });

  
  useEffect(() => {
    // Apply to both html and body
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.className = isDarkMode ? 'dark-mode force-dark-body' : 'light-mode';
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-mode force-dark-body' : 'light-mode';
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    console.log('Theme applied:', isDarkMode ? 'dark' : 'light');
    console.log('Body classes:', document.body.className);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Projets exemple
  const exampleProjects = [
  {
    id: 1,
    title: "Arcana Games — Full stack ",
    image: ArcanaGames,
    fullDescription: `Présentation du projet<br/><br/>Arcana Games est une plateforme web développée en collaboration avec un entrepreneur, dédiée à la réservation et à la personnalisation d’escape games ainsi que de murder parties thématiques.<br/>Projet réalisé front-end et back-end from scratch, offrant aux utilisateurs la possibilité de créer leur propre expérience sur mesure, de réserver des scénarios existants, d’envoyer des messages et de découvrir l’univers du créateur.<br/>Mise en place d’un design immersif et mystérieux avec animations avancées (keyframes CSS, particules animées) pour renforcer l’expérience utilisateur.<br/>Implémentation d’un système complet de gestion des réservations avec calendrier interactif, horloge personnalisée, envoi automatisé d’emails (avec logo de la société) au client et au gérant, ainsi qu’un système de messagerie interne sécurisé.<br/><br/>Compétences mises en œuvre<br/><br/>React pour le développement d’interfaces dynamiques, responsives et immersives.<br/>Node.js et Express pour le développement serveur et la création d’API RESTful.<br/>MongoDB pour la gestion et la modélisation des données.<br/>Postman pour le test et la validation des endpoints API.<br/>Gmail API pour la gestion et l’automatisation des emails.<br/>Animations avancées avec CSS keyframes et particules animées.<br/>Gestion complète du workflow back-end et front-end avec Vite pour un développement optimisé.<br/><br/>Valeur ajoutée et maîtrise<br/><br/>Arcana Games démontre une maîtrise complète du développement full stack : intégration totale du front-end (React, animations, responsive) et du back-end (API Node/Express, gestion des emails, automatisation des réservations).<br/>Ce projet illustre la capacité à concevoir et livrer une plateforme sur mesure, fiable, évolutive et riche en fonctionnalités interactives, adaptée à un concept original et immersif.<br/><br/>`,
    tech: ["React", "Node.js", "JavaScript", "Express", "Vite","API"],
    link: "https://arnold138.github.io/Arcana_Games",
    // Pas de linkGitHub car projet privé
  },
  {
    id: 2,
    title: "Application Immobilière KASA",
    image: kasaImg,
    fullDescription: `Présentation du projet<br/><br/>Développement complet du front-end de l’application web de location immobilière Kasa avec React et React Router.<br/>Implémentation d’une architecture de composants claire et réutilisable à partir des maquettes Figma responsives.<br/><br/>Gestion dynamique des routes avec React Router, incluant la navigation par ID, la gestion des erreurs (404 personnalisée) et l’affichage conditionnel des données.<br/><br/>Intégration d’une galerie photo avec navigation circulaire (retour à la première image depuis la dernière et inversement) et gestion spécifique pour les galeries à une seule image.<br/>Mise en place de composants Collapse interactifs avec animations CSS fluides.<br/><br/>Utilisation de SASS pour la structuration et la modularisation du style.<br/>Initialisation du projet avec Vite pour un environnement de développement rapide et optimisé.<br/>Simulation des données via un fichier JSON en attendant l’intégration du back-end.<br/><br/>Tests et vérifications des fonctionnalités avec Postman pour anticiper la connexion à l’API.<br/><br/>Compétences mises en œuvre<br/><br/>React pour le développement d’interfaces dynamiques et modulaires.<br/>React Router pour la gestion du routage client et la navigation conditionnelle.<br/>SASS pour la gestion avancée et modulaire des styles.<br/>Animations CSS pour fluidifier les transitions et améliorer l’expérience utilisateur.<br/>Vite pour un démarrage de projet rapide et une compilation optimisée.<br/>JSON pour simuler des données en phase de développement.<br/>Postman pour tester et valider les fonctionnalités prévues pour l’intégration API.<br/><br/>Valeur ajoutée et maîtrise<br/><br/>Projet validé et conforme aux standards professionnels, démontrant une maîtrise du développement front-end moderne, de la navigation client avancée, de l’intégration responsive à partir de maquettes Figma, et des bonnes pratiques de performance et d’optimisation.<br/><br/>`,
    tech: ["React", "Node.js", "JavaScript", "Vite","Framer Motion"],
    link: "https://deft-tiramisu-cee0c3.netlify.app/",
    linkGitHub: "https://github.com/Arnold138/Projet-React.git"
  },
  {
    id: 3,
    title: "Gestion Complète du Backend",
    image: grimoireImg,
    fullDescription:`Présentation du projet<br/><br/>Développement complet du back-end d’un site de notation de livres ("Mon Vieux Grimoire").<br/>Réalisation d’une API RESTful sécurisée avec Node.js et Express, connectée à une base de données MongoDB via Mongoose.<br/>Mise en place d’une architecture MVC claire et maintenable.<br/><br/>Points techniques clés<br/><br/>CRUD complet (Créer, Lire, Mettre à jour, Supprimer) pour la gestion des livres et des notations.<br/>Authentification sécurisée des utilisateurs avec JWT et bcrypt.<br/>Gestion avancée des middlewares pour la validation, la sécurité et la gestion des erreurs.<br/>Téléchargement et optimisation d’images côté serveur (compression, réduction de poids) selon les bonnes pratiques du Green Code.<br/>Calcul dynamique des notes moyennes pour chaque livre.<br/>Stockage et traitement des données sécurisé, conforme aux bonnes pratiques.<br/><br/>Compétences mises en œuvre<br/><br/>Node.js / Express pour le développement serveur.<br/>MongoDB / Mongoose pour la modélisation et la persistance des données.<br/>JWT, bcrypt pour l’authentification et la sécurité.<br/>Multer / Sharp pour la gestion et l’optimisation des images.<br/>Conception d’API RESTful performantes et maintenables.<br/>Architecture MVC pour structurer le projet.<br/><br/>Valeur ajoutée et maîtrise<br/><br/>Projet validé et conforme aux standards professionnels, démontrant une maîtrise des technologies backend modernes, de la sécurité, de la performance et de la qualité du code.<br/><br/>`,
    tech: ["React.js", "JavaScript", "API", "Express", "Node.js"], // pas de liens vers site car je ne peux pas faire de démonstration avec un backend 
    linkGitHub: "https://github.com/Arnold138/Monvieuxgrimoire.git"
  },
  {
    id: 4,
    title: "Animation entièrement en CSS",
    image: MonGif,
    imageClass: "flame-animation",
    fullDescription: `Présentation du projet<br/><br/>Création d'une animation de flamme ultra-réaliste développée exclusivement en CSS pur, sans aucune dépendance JavaScript.<br/>Conception d'un système d'animation complexe utilisant les propriétés CSS avancées, les dégradés radiaux et les keyframes pour reproduire fidèlement le comportement naturel d'une flamme.<br/>Architecture multi-couches avec gestion responsive et accessibilité intégrée.<br/><br/>Points techniques clés<br/><br/>Système de flammes multi-couches : flamme principale, cœur interne et centre ultra-chaud avec des animations décalées pour un rendu tridimensionnel.<br/>8 animations de keyframes distinctes pour les étincelles avec trajectoires aléatoires, rotations dynamiques et opacité progressive.<br/>Utilisation avancée des dégradés radiaux pour simuler la température et l'intensité lumineuse (blanc chaud au centre, jaune, orange, rouge vers l'extérieur).<br/>Animations fluides avec ease-in-out et durées variables (0.3s à 3.5s) pour créer un mouvement naturel et organique.<br/>Effets de lueur au sol avec radial-gradient et animation de pulsation pour l'éclairage ambiant.<br/>Gestion des pseudo-éléments ::before et ::after pour les couches internes de la flamme.<br/>Optimisation des performances avec transform et filter plutôt que des propriétés coûteuses.<br/><br/>Compétences mises en œuvre<br/><br/>CSS Keyframes avancées avec timing-functions personnalisées.<br/>Transforms 2D complexes (scale, rotate, translate) combinées dans une seule propriété.<br/>Maîtrise des dégradés radiaux multi-stops pour les effets de température.<br/>Architecture CSS modulaire avec sélecteurs nth-child pour la variété des particules.<br/>Responsive design avec media queries et unités clamp() pour l'adaptabilité.<br/>Accessibilité avec prefers-reduced-motion pour les utilisateurs sensibles aux animations.<br/>Optimisation des performances avec will-change et transform3d implicites.<br/><br/>Valeur ajoutée et maîtrise<br/><br/>Projet démontrant une expertise technique approfondie en CSS pur, capable de reproduire des phénomènes physiques complexes sans framework.<br/>Illustration parfaite de la puissance des CSS modernes pour créer des expériences visuelles immersives et performantes.<br/>Code optimisé, maintenable et respectueux des standards d'accessibilité web.<br/><br/>`,
    tech: ["HTML", "CSS", "Keyframes", "Animation", "Responsive"],
    link: "https://arnold138.github.io/Flammeraliste/",
    linkGitHub: "https://github.com/Arnold138/Flammeraliste.git"
  }
];

  return (
    <>
      <NavBarr onNav={scrollTo} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main style={{ marginTop: '0' }}>
        <HeroSection onNav={scrollTo} />
        <ProjectsSection projects={exampleProjects} />
        <TestimonialSection />
        <AboutSection />
        <ContactSection />
      </main>

        <Footer />
    </>
  )
}