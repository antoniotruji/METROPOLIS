import React, { useEffect, useRef, useState } from 'react';
import './EarthHeatMapVisualization.css';

// Cache global para persistir la imagen entre montajes/desmontajes
let IMAGE_CACHE = { img: null, loaded: false };

const EarthHeatMapVisualization = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const cityImageRef = useRef(null);
  const [frameCount, setFrameCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Configuración del mapa
  const mapConfig = useRef({
    width: 600,
    height: 400,
    heatCircles: [],
    greenZones: [],
    animationFrame: 0,
    maxFrames: 100,
    changedCircles: [], // Índices de los círculos que cambiaron a rojo
    transitionComplete: false // Si ya se hizo la transición
  });

  // Cargar la imagen de la ciudad
  useEffect(() => {
    let cancelled = false;
    console.log('🔄 Loading city image...', IMAGE_CACHE);

    const setFromImg = (img) => {
      if (cancelled) return;
      console.log('✅ City image loaded, dimensions:', img.width, 'x', img.height);
      cityImageRef.current = img;
      setImageLoaded(true);
    };

    // Si ya está cacheada y cargada, úsala inmediatamente
    if (IMAGE_CACHE.loaded && IMAGE_CACHE.img && IMAGE_CACHE.img.complete) {
      console.log('📦 Using cached city image');
      setFromImg(IMAGE_CACHE.img);
    } else {
      console.log('🔍 Attempting to load city image from /sevilla_2d.png');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log('✅ City image loaded successfully');
        IMAGE_CACHE = { img, loaded: true };
        setFromImg(img);
      };
      
      img.onerror = (error) => {
        console.warn('⚠️ City image not found, generating placeholder...', error);
        // Generar una imagen de ciudad sintética
        generateCityImage().then(generatedImg => {
          if (!cancelled) {
            IMAGE_CACHE = { img: generatedImg, loaded: true };
            setFromImg(generatedImg);
          }
        });
      };
      
      img.src = '/sevilla_2d.png';
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Generar imagen de ciudad sintética
  const generateCityImage = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      // Fondo base
      ctx.fillStyle = '#e8e8e8';
      ctx.fillRect(0, 0, 800, 600);

      // Crear bloques de ciudad con diferentes intensidades
      const blocks = [
        // Zonas densas (oscuro = calor alto)
        { x: 50, y: 50, w: 120, h: 100, intensity: 0.8 },
        { x: 200, y: 50, w: 150, h: 120, intensity: 0.7 },
        { x: 400, y: 50, w: 130, h: 90, intensity: 0.75 },
        { x: 580, y: 50, w: 140, h: 110, intensity: 0.65 },
        
        { x: 30, y: 200, w: 160, h: 140, intensity: 0.85 },
        { x: 220, y: 220, w: 110, h: 180, intensity: 0.9 },
        { x: 360, y: 200, w: 180, h: 130, intensity: 0.7 },
        { x: 570, y: 220, w: 120, h: 160, intensity: 0.75 },
        
        { x: 60, y: 380, w: 140, h: 140, intensity: 0.6 },
        { x: 230, y: 420, w: 130, h: 120, intensity: 0.55 },
        { x: 390, y: 380, w: 160, h: 150, intensity: 0.65 },
        { x: 580, y: 400, w: 100, h: 130, intensity: 0.5 },
        
        // Zonas verdes (claro = fresco)
        { x: 250, y: 350, w: 100, h: 80, intensity: 0.2 },
        { x: 100, y: 150, w: 80, h: 60, intensity: 0.15 },
        { x: 550, y: 180, w: 90, h: 70, intensity: 0.25 },
      ];

      blocks.forEach(block => {
        const grayValue = Math.floor(255 * (1 - block.intensity));
        ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        ctx.fillRect(block.x, block.y, block.w, block.h);
        
        // Añadir ruido para textura
        for (let i = 0; i < 100; i++) {
          const rx = block.x + Math.random() * block.w;
          const ry = block.y + Math.random() * block.h;
          const noise = Math.random() * 40 - 20;
          const noisyGray = Math.max(0, Math.min(255, grayValue + noise));
          ctx.fillStyle = `rgb(${noisyGray}, ${noisyGray}, ${noisyGray})`;
          ctx.fillRect(rx, ry, 2, 2);
        }
      });

      // Calles
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 8;
      // Horizontales
      ctx.beginPath();
      ctx.moveTo(0, 180);
      ctx.lineTo(800, 180);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.lineTo(800, 360);
      ctx.stroke();
      
      // Verticales
      ctx.beginPath();
      ctx.moveTo(190, 0);
      ctx.lineTo(190, 600);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(350, 0);
      ctx.lineTo(350, 600);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(560, 0);
      ctx.lineTo(560, 600);
      ctx.stroke();

      canvas.toBlob((blob) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(blob);
      });
    });
  };

  // Calcular índice de calor urbano basado en la intensidad de píxeles
  const calculateHeatIndex = (imageData, x, y, radius) => {
    const { data, width, height } = imageData;
    let totalIntensity = 0;
    let pixelCount = 0;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= radius) {
          const px = Math.floor(x + dx);
          const py = Math.floor(y + dy);
          
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const index = (py * width + px) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const gray = (r + g + b) / 3;
            totalIntensity += gray;
            pixelCount++;
          }
        }
      }
    }

    return pixelCount > 0 ? totalIntensity / (pixelCount * 255) : 0.5;
  };

  // Crear círculos de calor basados en la imagen
  const createHeatCircles = (ctx) => {
    if (!cityImageRef.current) return [];

    const { width, height } = mapConfig.current;
    
    // Dibujar imagen temporalmente para obtener datos de píxeles
    ctx.drawImage(cityImageRef.current, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);

    const circles = [];
    const numCircles = 25;  // Reducir mucho más los círculos (de 40 a 25)
    const minRadius = 10;   // Aún más pequeños
    const maxRadius = 30;   // Aún más pequeños
    const occupied = [];

    // Función para verificar superposición
    const isOverlapping = (x, y, radius) => {
      for (const circle of occupied) {
        const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (dist < radius + circle.radius) {
          return true;
        }
      }
      return false;
    };

    // Generar círculos SOLO en el centro (evitando bordes)
    const margin = 60; // Margen desde los bordes
    for (let i = 0; i < numCircles * 3; i++) {
      // Generar posiciones solo en el centro de la ciudad
      const x = margin + Math.random() * (width - margin * 2);
      const y = margin + Math.random() * (height - margin * 2);
      const sampleRadius = 30;
      
      const intensity = calculateHeatIndex(imageData, x, y, sampleRadius);
      
      // Radio basado en intensidad
      const radius = intensity < 0.3 
        ? maxRadius 
        : minRadius + (maxRadius - minRadius) * intensity;

      if (!isOverlapping(x, y, radius) && circles.length < numCircles) {
        circles.push({ x, y, radius, intensity });
        occupied.push({ x, y, radius });
      }
    }

    return circles;
  };

  // Crear zonas verdes
  const createGreenZones = (heatCircles) => {
    const greenZones = [];
    const numZones = 8;  // Menos zonas verdes
    
    // Seleccionar círculos de baja intensidad para zonas verdes
    const lowHeatCircles = heatCircles
      .filter(c => c.intensity < 0.4)
      .slice(0, numZones);

    lowHeatCircles.forEach(circle => {
      greenZones.push({
        x: circle.x,
        y: circle.y,
        radius: Math.random() * 15 + 20,  // Zonas verdes más pequeñas (20-35px)
        appearFrame: Math.random() * 40
      });
    });

    return greenZones;
  };

  // Calcular intensidad enfriada
  const calculateCooledIntensity = (circle, greenZones, progress) => {
    let cooled = circle.intensity;

    greenZones.forEach(zone => {
      if (progress > zone.appearFrame / 100) {
        const dist = Math.sqrt((circle.x - zone.x) ** 2 + (circle.y - zone.y) ** 2);
        if (dist < zone.radius * 2) {
          const coolingFactor = Math.max(0, 1 - dist / (zone.radius * 2));
          const coolingEffect = coolingFactor * 0.4 * progress;
          cooled = Math.max(0.1, circle.intensity - coolingEffect);
        }
      }
    });

    return cooled;
  };

  // Función de animación
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !cityImageRef.current) return;

    const ctx = canvas.getContext('2d');
    const config = mapConfig.current;

    // Limpiar canvas
    ctx.clearRect(0, 0, config.width, config.height);

    // Convertir imagen a escala de grises
    ctx.drawImage(cityImageRef.current, 0, 0, config.width, config.height);
    const imageData = ctx.getImageData(0, 0, config.width, config.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const gray = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = gray;
    }
    ctx.putImageData(imageData, 0, 0);

    // Aplicar filtro semitransparente
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, config.width, config.height);

    // Progreso de animación (bucle infinito)
    const progress = config.animationFrame / config.maxFrames;
    setAnimationProgress(progress * 100);

    // Dibujar zonas verdes
    config.greenZones.forEach(zone => {
      if (progress > zone.appearFrame / 100) {
        ctx.fillStyle = 'rgba(34, 139, 34, 0.4)';
        ctx.strokeStyle = 'rgba(0, 100, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    });

    // Dibujar círculos de calor - ESTÁTICOS (sin animación)
    // Solo cambiar 2 círculos a la derecha del centro a rojo UNA VEZ
    config.heatCircles.forEach((circle, index) => {
      // Calcular si este círculo debería cambiar a rojo
      let finalIntensity = circle.intensity * 0.7; // Intensidad base reducida
      
      // En el frame 30, seleccionar 2 círculos naranjas a la DERECHA del centro
      if (!config.transitionComplete && config.animationFrame === 30) {
        const centerX = config.width / 2;
        const centerY = config.height / 2;
        
        // Filtrar círculos naranjas que están a la DERECHA del centro (x > centerX)
        const orangeCirclesRight = config.heatCircles
          .map((c, i) => ({ 
            ...c, 
            index: i,
            adjustedIntensity: c.intensity * 0.7,
            distanceFromCenter: Math.sqrt((c.x - centerX) ** 2 + (c.y - centerY) ** 2)
          }))
          .filter(c => c.adjustedIntensity > 0.6 && c.adjustedIntensity <= 0.7 && c.x > centerX) // Solo a la derecha
          .sort((a, b) => a.distanceFromCenter - b.distanceFromCenter); // Ordenar por cercanía al centro
        
        // Seleccionar los 2 círculos naranjas más cercanos al centro pero a la derecha
        if (orangeCirclesRight.length >= 2) {
          config.changedCircles = [orangeCirclesRight[0].index, orangeCirclesRight[1].index];
        }
        config.transitionComplete = true;
      }
      
      // Si este círculo es uno de los que deben cambiar a rojo
      if (config.changedCircles.includes(index)) {
        finalIntensity = 0.75; // Intensidad roja
      }
      
      // Color basado en intensidad FIJA (sin variación)
      let color, edgeColor;
      if (finalIntensity > 0.7) {
        color = 'rgba(255, 0, 0, 0.6)';
        edgeColor = 'rgba(139, 0, 0, 0.9)';
      } else if (finalIntensity > 0.6) {
        color = 'rgba(255, 165, 0, 0.5)';
        edgeColor = 'rgba(255, 140, 0, 0.9)';
      } else if (finalIntensity > 0.5) {
        color = 'rgba(255, 255, 0, 0.4)';
        edgeColor = 'rgba(218, 165, 32, 0.9)';
      } else {
        color = 'rgba(0, 255, 0, 0.3)';
        edgeColor = 'rgba(0, 100, 0, 0.9)';
      }

      ctx.fillStyle = color;
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // Actualizar frame y reiniciar en bucle
    setFrameCount(prev => prev + 1);
    
    config.animationFrame++;
    if (config.animationFrame >= config.maxFrames) {
      config.animationFrame = 0; // Reiniciar bucle
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Inicializar círculos cuando la imagen se carga
  useEffect(() => {
    if (imageLoaded && canvasRef.current && mapConfig.current.heatCircles.length === 0) {
      const ctx = canvasRef.current.getContext('2d');
      const circles = createHeatCircles(ctx);
      mapConfig.current.heatCircles = circles;
      mapConfig.current.greenZones = createGreenZones(circles);
      console.log('✅ Heat circles created:', circles.length);
    }
  }, [imageLoaded]);

  // Iniciar animación
  useEffect(() => {
    if (imageLoaded && mapConfig.current.heatCircles.length > 0) {
      console.log('🎬 Starting heat map animation (loop mode)');
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    }
  }, [imageLoaded]);

  return (
    <div className="earth-heatmap-container">
      <div className="map-header">
        <h3>🌍 CITY MONITORING</h3>
        <div className="data-sources">
          <span className="source active">🛰️ Sentinel</span>
          <span className="source active">🌡️ Heat Sensors</span>
          <span className="source active">🗺️ Urban Data</span>
        </div>
      </div>
      
      <div className="heatmap-canvas-wrapper">
        <div className="canvas-and-legend">
          <canvas
            ref={canvasRef}
            width={mapConfig.current.width}
            height={mapConfig.current.height}
            className="earth-heatmap-canvas"
          />
          
          <div className="heatmap-legend">
            <h4 className="legend-title">Temperature Zones</h4>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: 'rgba(255, 0, 0, 0.6)'}}></span>
              <span>Extreme Heat: 40-45°C</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: 'rgba(255, 165, 0, 0.5)'}}></span>
              <span>High Heat: 36-40°C</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: 'rgba(255, 255, 0, 0.4)'}}></span>
              <span>Moderate: 32-36°C</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: 'rgba(0, 255, 0, 0.3)'}}></span>
              <span>Cool Zone: 25-32°C</span>
            </div>
            <div className="legend-divider"></div>
            <div className="legend-item green-zone-indicator">
              <span className="legend-color green-zone-color" style={{backgroundColor: 'rgba(34, 139, 34, 0.4)', border: '2px solid rgba(0, 100, 0, 0.8)'}}></span>
              <span>Green Infrastructure</span>
            </div>
          </div>
        </div>
        
        <div className="map-metrics">
          <div className="live-metric">
            <span>🌡️ Heat Islands:</span>
            <span className="metric-stream">Avg: 38.5°C | Zones: {mapConfig.current.heatCircles.length} | Green Coverage: {mapConfig.current.greenZones.length} parks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthHeatMapVisualization;
