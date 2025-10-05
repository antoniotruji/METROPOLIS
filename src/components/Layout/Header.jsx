import React from 'react';
import { NavLink } from 'react-router-dom';
import { Satellite, BarChart3, MapPin, Lightbulb, Users, Menu } from 'lucide-react';
import './Header.css';

const Header = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/data', label: 'Data', icon: Satellite },
    { path: '/scenarios', label: 'Scenarios', icon: MapPin },
    { path: '/recommendations', label: 'AI Assistant', icon: Lightbulb },
    { path: '/engagement', label: 'Engage', icon: Users },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <Satellite className="logo-icon" size={32} />
            <div className="logo-text">
              <h1>Urban Digital Twin</h1>
              <span className="subtitle">NASA Hackathon 2024</span>
            </div>
          </div>
        </div>
        
        <nav className="nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="header-right">
          <button className="user-button">
            <div className="user-avatar">A</div>
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
