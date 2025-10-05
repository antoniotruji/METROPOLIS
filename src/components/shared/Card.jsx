import React from 'react';
import './Card.css';

const Card = ({ 
  title, 
  subtitle, 
  children, 
  icon, 
  actions,
  className = '' 
}) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || icon) && (
        <div className="card-header">
          <div className="card-header-content">
            {icon && <div className="card-icon">{icon}</div>}
            <div>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
