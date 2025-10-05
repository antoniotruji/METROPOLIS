import React, { useEffect, useRef, useState } from 'react';

// Cache global para persistir la imagen entre montajes/desmontajes
let DEM_CACHE = { img: null, loaded: false };

const MarsStormVisualization = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const demImageRef = useRef(null);
  const roversRef = useRef([
    { id: 'Rover A', x: 520, y: 160, dx: -0.04, dy: 0.02 },
    { id: 'Rover B', x: 120, y: 260, dx: 0.03, dy: -0.015 }
  ]);
  const satelliteRef = useRef({ t: 0 });
  const [stormPosition, setStormPosition] = useState({ x: 0, y: 0 });
  const [frameCount, setFrameCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [collectedRegolith, setCollectedRegolith] = useState(0);
  const collectedRegolithRef = useRef(0);
  const [windSpeed, setWindSpeed] = useState(95);
  const [dustLoad, setDustLoad] = useState(35);
  const [roverStatuses, setRoverStatuses] = useState([
    { id: 'Rover A', active: true },
    { id: 'Rover B', active: true }
  ]);
  const windTargetRef = useRef(95);
  const dustTargetRef = useRef(35);
  
  // Configuración de la tormenta como ref para persistir entre renders
  const stormConfig = useRef({
    width: 600,
    height: 400,
    stormCenterX: 480,
    stormCenterY: 200,
    stormWidth: 90,
    stormHeight: 80,
    stormSpeed: 0.2,
    particles: [],
    settlements: []
  });

  // Mantener sincronizado el ref con el estado visible
  useEffect(() => {
    collectedRegolithRef.current = collectedRegolith;
  }, [collectedRegolith]);

  // Helper para actualizar valor evitando cierres obsoletos durante la animación
  const updateCollectedRegolith = (delta) => {
    const next = Math.min(5000, Math.max(0, collectedRegolithRef.current + delta));
    collectedRegolithRef.current = next;
    // Actualizamos el estado para reflejar el valor en la UI externa al canvas
    setCollectedRegolith(next);
  };

  // Crear asentamientos marcianos (basado en el script Python)
  const createSettlements = () => {
    const { width, height } = stormConfig.current;
    
    return [
      {
        x: width * 0.6,
        y: height * 0.4,
        type: 'urban',
        name: 'Urban',
        size: 1.2,
        opacity: 1.0,
        buildings: createBuildings(width * 0.6, height * 0.4, 'urban', 5)
      },
      {
        x: width * 0.45,
        y: height * 0.7,
        type: 'research',
        name: 'Research',
        size: 0.8,
        opacity: 1.0,
        buildings: createBuildings(width * 0.45, height * 0.7, 'research', 3)
      },
      {
        x: width * 0.35,
        y: height * 0.2,
        type: 'mining',
        name: 'Mining',
        size: 0.9,
        opacity: 1.0,
        buildings: createBuildings(width * 0.35, height * 0.2, 'mining', 3)
      },
      {
        x: width * 0.25,
        y: height * 0.8,
        type: 'agriculture',
        name: 'Agriculture',
        size: 0.7,
        opacity: 1.0,
        buildings: createBuildings(width * 0.25, height * 0.8, 'agriculture', 3)
      }
    ];
  };

  // Crear edificios para cada asentamiento
  const createBuildings = (centerX, centerY, type, count) => {
    const buildings = [];
    const spacing = type === 'urban' ? 15 : 25;
    
    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * spacing * 2;
      const offsetY = (Math.random() - 0.5) * spacing * 2;
      const heightOffset = type === 'urban' ? Math.random() * 2 : 0;
      
      buildings.push({
        x: centerX + offsetX,
        y: centerY + offsetY + heightOffset,
        width: type === 'urban' ? Math.random() * 7 + 8 : Math.random() * 8 + 10,
        height: type === 'urban' ? Math.random() * 13 + 12 : Math.random() * 15 + 15,
        buildingType: i < count / 2 ? 'habitation' : 'support'
      });
    }
    
    return buildings;
  };

  // Inicializar asentamientos una sola vez
  useEffect(() => {
    console.log('🏗️ Initializing settlements');
    stormConfig.current.settlements = createSettlements();
    stormConfig.current.particles = createParticles(stormConfig.current.stormCenterX, stormConfig.current.stormCenterY);
    console.log('✅ Settlements created:', stormConfig.current.settlements.length);
  }, []);

  // Cargar la imagen DEM con cache entre montajes
  useEffect(() => {
    let cancelled = false;
    console.log('🔄 Component mounted, checking DEM cache...', DEM_CACHE);

    const setFromImg = (img) => {
      if (cancelled) return;
      console.log('✅ Setting DEM image, dimensions:', img.width, 'x', img.height);
      demImageRef.current = img;
      setImageLoaded(true);
    };

    // Si ya está cacheada y cargada, úsala inmediatamente
    if (DEM_CACHE.loaded && DEM_CACHE.img && DEM_CACHE.img.complete) {
      console.log('📦 Using cached DEM image');
      setFromImg(DEM_CACHE.img);
    } else {
      console.log('🔍 Loading DEM image from /dem_jezero.jpeg');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log('✅ DEM image loaded successfully');
        DEM_CACHE = { img, loaded: true };
        setFromImg(img);
      };
      
      img.onerror = (error) => {
        console.error('❌ Failed to load DEM image:', error);
        if (!cancelled) setImageLoaded(false);
      };
      
      img.src = '/dem_jezero.jpeg';
    }

    return () => {
      cancelled = true;
    };
  }, []); // Solo se ejecuta una vez al montar

  // Crear partículas para la tormenta
  const createParticles = (centerX, centerY) => {
    const particles = [];
    const numParticles = 150;
    
    for (let i = 0; i < numParticles; i++) {
      const offsetX = (Math.random() - 0.5) * stormConfig.current.stormWidth;
      const offsetY = (Math.random() - 0.5) * stormConfig.current.stormHeight;
      
      particles.push({
        x: centerX + offsetX,
        y: centerY + offsetY,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        baseX: offsetX,
        baseY: offsetY
      });
    }
    
    return particles;
  };

  // Dibujar edificio individual
  const drawBuilding = (ctx, building, opacity = 1.0) => {
    const { x, width, height, buildingType } = building;
    // Invertir Y para canvas (matplotlib usa origen abajo-izquierda, canvas usa arriba-izquierda)
    const y = stormConfig.current.height - building.y - height;
    
    // Color según tipo
    const color = buildingType === 'habitation' ? '#87CEEB' : '#B0C4DE';
    
    // Dibujar edificio principal
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fillRect(x, y, width, height);
    
    // Antena para habitación
    if (buildingType === 'habitation') {
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(x + width/2, y);
      ctx.lineTo(x + width/2, y - 5);
      ctx.stroke();
    } else {
      // Paneles solares para soporte
      ctx.fillStyle = '#FFD700';
      ctx.globalAlpha = opacity * 0.8;
      // Paneles a los lados del edificio
      const panelY = y + height - 5;
      ctx.fillRect(x - width * 0.1, panelY, width * 0.3, 3);
      ctx.fillRect(x + width * 0.8, panelY, width * 0.3, 3);
    }
    
    // Ventanas
    if (height > 15) {
      ctx.fillStyle = '#FFFF00';
      ctx.globalAlpha = opacity * 0.8;
      const windowSize = width * 0.15;
      const windowSpacing = height * 0.25;
      
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 2; i++) {
          const windowX = x + width * 0.25 + i * (width * 0.45);
          const windowY = y + height * 0.2 + j * windowSpacing;
          if (windowX + windowSize <= x + width && windowY + windowSize * 1.2 <= y + height) {
            ctx.fillRect(windowX, windowY, windowSize, windowSize * 1.2);
          }
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
  };

  // Verificar si la tormenta afecta un asentamiento
  const stormAffectsSettlement = (settlement, stormX, stormY) => {
    const stormLeft = stormX - stormConfig.current.stormWidth/2;
    const stormRight = stormX + stormConfig.current.stormWidth/2;
    const stormTop = stormY + stormConfig.current.stormHeight/2;
    const stormBottom = stormY - stormConfig.current.stormHeight/2;
    
    for (const building of settlement.buildings) {
      // Convertir coordenadas del edificio al sistema de matplotlib para comparación
      const buildingYMatplotlib = building.y;
      const buildingXMatplotlib = building.x;
      
      if (buildingXMatplotlib >= stormLeft && buildingXMatplotlib <= stormRight &&
          buildingYMatplotlib >= stormBottom && buildingYMatplotlib <= stormTop) {
        return true;
      }
    }
    return false;
  };

  // Dibujar terreno de respaldo si no se puede cargar la imagen
  const drawFallbackTerrain = (ctx, width, height) => {
    // Fondo base marciano
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#8B4513');
    gradient.addColorStop(0.3, '#A0522D');
    gradient.addColorStop(0.6, '#CD853F');
    gradient.addColorStop(1, '#D2691E');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Agregar texturas rocosas y cráteres simples
    ctx.fillStyle = 'rgba(101, 67, 33, 0.4)';
    
    // Cráteres
    ctx.beginPath();
    ctx.ellipse(150, 100, 40, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(400, 250, 60, 45, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(500, 80, 25, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Cordilleras y formaciones rocosas
    ctx.fillStyle = 'rgba(160, 82, 45, 0.6)';
    ctx.fillRect(250, 180, 200, 25);
    ctx.fillRect(50, 300, 150, 20);
    
    // Canales antiguos
    ctx.fillStyle = 'rgba(47, 79, 79, 0.5)';
    ctx.fillRect(100, 200, 250, 8);
    ctx.fillRect(350, 320, 200, 6);
  };

  // Dibujar el terreno base de Marte usando la imagen DEM o fallback
  const drawMarsTerrainBase = (ctx) => {
    const { width, height } = stormConfig.current;
    
    // Primero dibujar el fondo base
    ctx.fillStyle = '#CD853F';
    ctx.fillRect(0, 0, width, height);
    
    // Intentar usar la imagen DEM cacheada O la del ref
    const demImage = DEM_CACHE.img || demImageRef.current;
    
    if (DEM_CACHE.loaded && demImage) {
      try {
        // Usar la imagen DEM real como en el script Python
        ctx.drawImage(demImage, 0, 0, width, height);
        
        // Aplicar efecto similar al colormap 'terrain' de matplotlib
        ctx.globalCompositeOperation = 'multiply';
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#CD853F');    // Sandy brown
        gradient.addColorStop(0.3, '#A0522D');  // Sienna  
        gradient.addColorStop(0.6, '#8B4513');  // Saddle brown
        gradient.addColorStop(1, '#654321');    // Dark brown
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Restaurar el modo de composición
        ctx.globalCompositeOperation = 'source-over';
        // Overlay muy suave para no ocultar la imagen
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(205, 133, 63, 0.08)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
        
      } catch (error) {
        console.warn('⚠️ Error drawing DEM image, using fallback:', error);
        drawFallbackTerrain(ctx, width, height);
      }
    } else if (!DEM_CACHE.loaded) {
      // Fallback: terreno generado proceduralmente mientras se carga la imagen
      drawFallbackTerrain(ctx, width, height);
    }
  };

  // Dibujar partículas de la tormenta
  const drawStormParticles = (ctx, particles) => {
    particles.forEach(particle => {
      // Invertir Y para canvas
      const particleY = stormConfig.current.height - particle.y;
      
      if (particle.x >= 0 && particle.x <= stormConfig.current.width && 
          particleY >= 0 && particleY <= stormConfig.current.height) {
        
        ctx.beginPath();
        ctx.arc(particle.x, particleY, particle.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 228, 181, ${particle.opacity})`;
        ctx.fill();
        
        // Añadir un pequeño halo para mejor visibilidad
        ctx.beginPath();
        ctx.arc(particle.x, particleY, particle.size * 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 200, 150, ${particle.opacity * 0.3})`;
        ctx.fill();
      }
    });
  };

  // Dibujar contorno de la tormenta
  const drawStormOutline = (ctx, centerX, centerY) => {
    // Invertir Y para canvas
    const canvasCenterY = stormConfig.current.height - centerY;
    
    ctx.beginPath();
    ctx.ellipse(centerX, canvasCenterY, stormConfig.current.stormWidth/2, stormConfig.current.stormHeight/2, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(139, 0, 0, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  // Actualizar posición de la tormenta
  const updateStormPosition = (currentX) => {
    let newX = currentX - stormConfig.current.stormSpeed;
    
    // Si la tormenta sale por la izquierda, reiniciar desde la derecha
    if (newX < -stormConfig.current.stormWidth/2) {
      newX = stormConfig.current.width + stormConfig.current.stormWidth/2;
    }
    
    return newX;
  };

  // Actualizar partículas
  const updateParticles = (particles, centerX, centerY) => {
    return particles.map(particle => {
      // Agregar turbulencia
      let newBaseX = particle.baseX + (Math.random() - 0.5) * 0.5;
      let newBaseY = particle.baseY + (Math.random() - 0.5) * 0.5;
      
      // Limitar dentro del área de la tormenta
      newBaseX = Math.max(-stormConfig.current.stormWidth/2, Math.min(stormConfig.current.stormWidth/2, newBaseX));
      newBaseY = Math.max(-stormConfig.current.stormHeight/2, Math.min(stormConfig.current.stormHeight/2, newBaseY));
      
      // Variar opacidad
      let newOpacity = particle.opacity + (Math.random() - 0.5) * 0.04;
      newOpacity = Math.max(0.1, Math.min(0.9, newOpacity));
      
      return {
        ...particle,
        x: centerX + newBaseX,
        y: centerY + newBaseY,
        baseX: newBaseX,
        baseY: newBaseY,
        opacity: newOpacity
      };
    });
  };

  // Función de animación principal
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const config = stormConfig.current;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, config.width, config.height);
    
    // Dibujar terreno base
    drawMarsTerrainBase(ctx);
    
    // Actualizar posición de la tormenta
    const newStormX = updateStormPosition(config.stormCenterX);
    config.stormCenterX = newStormX;
    
    // Actualizar objetivos de métricas con menos frecuencia y suavizar
    if (frameCount % 60 === 0) {
      windTargetRef.current = 90 + Math.random() * 20; // 90-110 m/s
      const intensityFactor = 0.7 + Math.random() * 0.4;
      const speedFactor = Math.min(1.0, windSpeed / 100);
      const baseDust = 20.0;
      const stormBoost = intensityFactor * speedFactor * 30.0;
      dustTargetRef.current = Math.max(baseDust, baseDust + stormBoost);
    }
    // Lerp suave hacia los objetivos
    setWindSpeed(prev => prev + (windTargetRef.current - prev) * 0.05);
    setDustLoad(prev => prev + (dustTargetRef.current - prev) * 0.08);
    
    // Crear nuevas partículas si es necesario
    if (config.particles.length === 0 || config.stormCenterX > config.width) {
      config.particles = createParticles(newStormX, config.stormCenterY);
    }
    
    // Actualizar partículas existentes
    config.particles = updateParticles(config.particles, newStormX, config.stormCenterY);
    
    // Dibujar y actualizar asentamientos
    let affectedCount = 0;
    let urbanAffected = false;
    
    config.settlements.forEach(settlement => {
      const isAffected = stormAffectsSettlement(settlement, newStormX, config.stormCenterY);
      
      if (isAffected) {
        settlement.opacity = Math.max(0.3, settlement.opacity - 0.05);
        affectedCount++;
        
        // Marcar si el asentamiento urbano está afectado
        if (settlement.type === 'urban') {
          urbanAffected = true;
        }
      } else {
        settlement.opacity = Math.min(1.0, settlement.opacity + 0.02);
      }
      
      // Dibujar edificios del asentamiento
      settlement.buildings.forEach(building => {
        if (building.x >= 0 && building.x <= config.width &&
            building.y >= 0 && building.y <= config.height) {
          drawBuilding(ctx, building, settlement.opacity);
        }
      });
      
      // Dibujar etiqueta del asentamiento
      const statusText = isAffected ? '⚡ AFFECTED' : '✓ Safe';
      const statusColor = isAffected ? 'rgba(139, 0, 0, 0.8)' : 'rgba(0, 100, 0, 0.8)';
      
      // Convertir coordenada Y del asentamiento para canvas
      const labelY = config.height - settlement.y;
      
      ctx.fillStyle = statusColor;
      ctx.fillRect(settlement.x - 30, labelY - 10, 60, 24);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(settlement.name, settlement.x, labelY + 3);
      ctx.fillText(statusText, settlement.x, labelY + 13);
    });
    
    // Recolectar regolito SOLO cuando el asentamiento Urban está afectado
    if (urbanAffected) {
      // ~1 kg por pasada, distribuido por frame cuando está afectado
      updateCollectedRegolith(1.0 / 120);
    }

    // Actualizar y dibujar rovers en movimiento (lentos pero visibles)
    const speedScale = 0.2;
    roversRef.current = roversRef.current.map(r => {
      let nx = r.x + r.dx * speedScale;
      let ny = r.y + r.dy * speedScale;
      if (nx < 20 || nx > config.width - 20) { r.dx *= -1; nx = r.x + r.dx * speedScale; }
      if (ny < 20 || ny > config.height - 20) { r.dy *= -1; ny = r.y + r.dy * speedScale; }
      return { ...r, x: nx, y: ny };
    });
    // Determinar si la tormenta cubre cada rover y dibujar su estado
    const stormLeft = newStormX - config.stormWidth/2;
    const stormRight = newStormX + config.stormWidth/2;
    const stormTop = config.stormCenterY + config.stormHeight/2;
    const stormBottom = config.stormCenterY - config.stormHeight/2;
    const nextStatuses = [];
    roversRef.current.forEach((r, idx) => {
      const covered = r.x >= stormLeft && r.x <= stormRight && r.y >= stormBottom && r.y <= stormTop;
      nextStatuses.push({ id: roverStatuses[idx]?.id || r.id, active: !covered });
      const cy = config.height - r.y;
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = covered ? 'rgba(200,200,200,0.6)' : '#ffffff';
      ctx.fillText('🤖', r.x, cy);
      ctx.fillStyle = covered ? 'rgba(255,80,80,0.9)' : 'rgba(80,255,120,0.9)';
      ctx.fillText(covered ? `${r.id} INACTIVE` : `${r.id} ACTIVE`, r.x, cy + 14);
    });
    setRoverStatuses(nextStatuses);

    // Satélite cruzando más zonas (trayectoria tipo Lissajous suave)
    satelliteRef.current.t += 0.002; // lento
    const t = satelliteRef.current.t;
    const satX = (Math.sin(t) * 0.5 + 0.5) * config.width; // va y vuelve en X
    const verticalSweep = (Math.sin(t * 0.6) * 0.5 + 0.5); // barre distintas alturas
    const satY = 20 + verticalSweep * 140 + 10 * Math.sin((satX / config.width) * Math.PI * 2);
    ctx.font = 'bold 12px Arial';
    ctx.fillText('🛰️', satX, satY);
    
    // Dibujar partículas de la tormenta
    drawStormParticles(ctx, config.particles);
    
    // Dibujar contorno de la tormenta
    drawStormOutline(ctx, newStormX, config.stormCenterY);
    
    // (Eliminado) Métricas en rectángulos superiores: se reemplazan por contadores dinámicos a la izquierda
    
    // Panel inferior izquierdo - Asentamientos afectados
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    // ctx.fillRect(10, config.height - 45, 220, 20);
    // ctx.fillStyle = 'white';
    //ctx.fillText(`AFFECTED SETTLEMENTS: ${affectedCount}/${config.settlements.length}`, 15, config.height - 31);
    
    // (Eliminado) Rectángulo blanco inferior-izquierda
    
    // Barra de progreso de almacenamiento de regolito
    const storageCapacity = 5000;
    const fillPercent = (collectedRegolithRef.current / storageCapacity) * 100;
    const barWidth = config.width * 0.8;
    const barX = (config.width - barWidth) / 2;
    const barY = config.height - 40;
    const barHeight = 10;
    
    // Fondo de la barra
    ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    
    // Progreso
    ctx.fillStyle = 'rgba(0, 128, 0, 0.8)';
    ctx.fillRect(barX, barY, barWidth * (fillPercent / 100), barHeight);
    
    // Etiquetas de la barra
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Storage: ${fillPercent.toFixed(1)}%`, config.width / 2, barY + 24);
    ctx.fillText(`Regolith Collected: ${collectedRegolithRef.current.toFixed(1)} kg`, config.width / 2, barY - 8);
    
    // Actualizar estado para mostrar información
    setStormPosition({ x: Math.round(newStormX), y: Math.round(config.stormCenterY) });
    setFrameCount(prev => prev + 1);
    
    // Continuar animación
    animationRef.current = requestAnimationFrame(animate);
  };

  // Iniciar animación cuando el canvas esté listo
  useEffect(() => {
    console.log('🎬 Starting animation loop');
    
    const startAnimation = () => {
      if (canvasRef.current && !animationRef.current) {
        console.log('▶️ Animation started');
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Pequeño delay para asegurar que todo esté inicializado
    const timer = setTimeout(startAnimation, 100);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        console.log('⏹️ Animation stopped');
      }
    };
  }, []); // Solo se ejecuta una vez al montar

  // Calcular progreso de la tormenta
  const progress = Math.min(100, Math.max(0, 
    ((stormConfig.current.width - stormPosition.x) / (stormConfig.current.width + stormConfig.current.stormWidth/2)) * 100
  ));

  return (
    <div className="mars-storm-container">
      <div className="storm-header">
        <h3>🌪️ Martian Sand Storm - Jezero Crater</h3>
        <div className="storm-progress">
          Scientific Monitoring | DEM: {imageLoaded ? '✅' : '⏳'}
        </div>
      </div>
      
      <div className="storm-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={stormConfig.current.width}
          height={stormConfig.current.height}
          className="mars-storm-canvas"
        />
        
        <div className="storm-info-overlay">
          <div className="image-status">
            Storm conditions
          </div>
          <div className="storm-status">
            🌪️ Storm: Wind: {windSpeed.toFixed(0)} m/s
          </div>
          <div className="storm-status">
            🪨 Dust Load: {dustLoad.toFixed(1)} mg/m³
          </div>
          <div className="image-status">
            Terrain: {imageLoaded ? "Jezero DEM Loaded" : "Procedural"}
          </div>
        </div>

        {/* Panel de estado de unidades a la derecha */}
        <div className="storm-info-overlay" style={{ left: 'auto', right: 15 }}>
          <div className="storm-position" style={{ color: '#00e5ff' }}>Active Units</div>
          <div className="storm-status">{roverStatuses[0]?.active ? '🤖 Rover A: ACTIVE • Sampling' : '🤖 Rover A: INACTIVE • Storm cover'}</div>
          <div className="storm-status">{roverStatuses[1]?.active ? '🤖 Rover B: ACTIVE • Scouting' : '🤖 Rover B: INACTIVE • Storm cover'}</div>
          <div className="storm-status">🛰️ Satellite: ACTIVE • Telemetry</div>
          <div className="image-status">Telemetry: nominal</div>
        </div>
      </div>
      
      <div className="storm-description">
        <p>Real-time simulation of Martian dust storm with settlements, buildings, and regolith collection system based on Mars atmospheric conditions</p>
      </div>
    </div>
  );
};

export default MarsStormVisualization;