import React, { useEffect, useRef } from 'react';
import './FuturisticHorizon.css';

const FuturisticHorizon = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    // Estrellas de fondo
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.6,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.8 + 0.2
    }));

    const animate = () => {
      timeRef.current += 0.005;
      
      // Cielo degradado de Marte
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1a0a0f');
      gradient.addColorStop(0.3, '#3d1820');
      gradient.addColorStop(0.6, '#8B4513');
      gradient.addColorStop(1, '#CD853F');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Estrellas parpadeantes
      stars.forEach(star => {
        const twinkle = Math.sin(timeRef.current * 2 + star.x) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Phobos (luna de Marte)
      const moonX = width * 0.15 + Math.sin(timeRef.current * 0.3) * 30;
      const moonY = height * 0.15;
      const moonGradient = ctx.createRadialGradient(moonX, moonY, 5, moonX, moonY, 25);
      moonGradient.addColorStop(0, '#d4d4d4');
      moonGradient.addColorStop(0.7, '#8c8c8c');
      moonGradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 25, 0, Math.PI * 2);
      ctx.fill();

      // Montañas/Olympus Mons en el horizonte
      ctx.fillStyle = 'rgba(101, 67, 33, 0.5)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7);
      for (let i = 0; i <= width; i += 50) {
        const mountainHeight = Math.sin(i * 0.01) * 50 + Math.sin(i * 0.02) * 30;
        ctx.lineTo(i, height * 0.7 - mountainHeight);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="futuristic-horizon">
      <canvas ref={canvasRef} className="horizon-canvas"></canvas>
      
      <div className="mars-colony">
        {/* Cúpulas principales de la ciudad */}
        <div className="dome dome-large">
          <div className="dome-structure">
            <div className="dome-light"></div>
            <div className="dome-grid"></div>
          </div>
          <div className="dome-base"></div>
          <div className="dome-label">HABITAT ALPHA</div>
        </div>

        <div className="dome dome-medium" style={{ left: '35%' }}>
          <div className="dome-structure">
            <div className="dome-light"></div>
            <div className="dome-grid"></div>
          </div>
          <div className="dome-base"></div>
          <div className="dome-label">RESEARCH</div>
        </div>

        <div className="dome dome-small" style={{ left: '60%' }}>
          <div className="dome-structure">
            <div className="dome-light"></div>
            <div className="dome-grid"></div>
          </div>
          <div className="dome-base"></div>
          <div className="dome-label">HYDROPONICS</div>
        </div>

        <div className="dome dome-small" style={{ left: '75%' }}>
          <div className="dome-structure">
            <div className="dome-light"></div>
            <div className="dome-grid"></div>
          </div>
          <div className="dome-base"></div>
          <div className="dome-label">ENERGY HUB</div>
        </div>

        {/* Torres de comunicación */}
        <div className="comm-tower" style={{ left: '20%' }}>
          <div className="tower-body"></div>
          <div className="tower-antenna"></div>
          <div className="signal-pulse"></div>
        </div>

        <div className="comm-tower" style={{ left: '85%' }}>
          <div className="tower-body"></div>
          <div className="tower-antenna"></div>
          <div className="signal-pulse"></div>
        </div>

        {/* Paneles solares */}
        <div className="solar-array" style={{ left: '10%' }}>
          <div className="solar-panel"></div>
          <div className="solar-panel"></div>
          <div className="solar-panel"></div>
        </div>

        <div className="solar-array" style={{ left: '90%' }}>
          <div className="solar-panel"></div>
          <div className="solar-panel"></div>
          <div className="solar-panel"></div>
        </div>

        {/* Vehículos/Rovers */}
        <div className="rover rover-1">
          <div className="rover-body"></div>
          <div className="rover-wheel"></div>
          <div className="rover-wheel"></div>
          <div className="dust-trail"></div>
        </div>

        {/* Tubos de conexión entre estructuras */}
        <svg className="connection-tubes" width="100%" height="100%">
          <defs>
            <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4a90e2', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#2c5aa0', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path d="M 15% 80% Q 25% 70%, 35% 80%" stroke="url(#tubeGradient)" strokeWidth="3" fill="none" />
          <path d="M 35% 80% Q 47% 75%, 60% 85%" stroke="url(#tubeGradient)" strokeWidth="3" fill="none" />
          <path d="M 60% 85% Q 67% 82%, 75% 85%" stroke="url(#tubeGradient)" strokeWidth="3" fill="none" />
        </svg>

        {/* Luces de aterrizaje */}
        <div className="landing-lights">
          <div className="light-beam" style={{ left: '25%' }}></div>
          <div className="light-beam" style={{ left: '50%' }}></div>
          <div className="light-beam" style={{ left: '75%' }}></div>
        </div>

        {/* Suelo marciano */}
        <div className="mars-ground">
          <div className="ground-texture"></div>
        </div>
      </div>

      {/* Información overlay */}
      <div className="colony-info-overlay">
        <div className="info-card">
          <span className="info-icon">🏙️</span>
          <div>
            <div className="info-title">MARS COLONY NEXUS</div>
            <div className="info-subtitle">Jezero Crater Settlement • Est. 2035</div>
          </div>
        </div>
        <div className="colony-stats">
          <div className="stat-item">
            <span className="stat-icon">👥</span>
            <span className="stat-value">247</span>
            <span className="stat-label">Colonists</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏗️</span>
            <span className="stat-value">12</span>
            <span className="stat-label">Habitats</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">98%</span>
            <span className="stat-label">Power</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💧</span>
            <span className="stat-value">450L</span>
            <span className="stat-label">H₂O</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticHorizon;
