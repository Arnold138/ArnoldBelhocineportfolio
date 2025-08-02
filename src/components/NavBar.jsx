// src/components/NavBar.jsx
import React from 'react'
import '../styles/navbar.scss'

export default function NavBar({ active, onNav }) {
  const items = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">MonPortfolio</div>
          <ul className="navbar-menu">
            {items.map(item => (
              <li key={item.id}>
                <button
                  className={`navbar-menu-item${active === item.id ? ' active' : ''}`}
                  onClick={() => onNav(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
