import React, { useState, useEffect } from 'react';
import './App.css';
import MarsStormVisualization from './components/MarsStormVisualization';
import EarthHeatMapVisualization from './components/EarthHeatMapVisualization';

function App() {
  const [activeView, setActiveView] = useState('dual');
  const [earthData, setEarthData] = useState({
    airQuality: 42,
    temperature: 24.5,
    population: 2.8,
    greenCoverage: 2,
    trafficFlow: 68,
    energyConsumption: 89
  });
  
  const [marsData, setMarsData] = useState({
    temperature: -63,
    atmosphericPressure: 0.636,
    rovers: 3,
    structures: 12,
    solarPower: 78,
    waterReserves: 340
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEarthData(prev => ({
        ...prev,
        airQuality: Math.max(20, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 4)),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.8,
        trafficFlow: Math.max(30, Math.min(100, prev.trafficFlow + (Math.random() - 0.5) * 6))
      }));
      
      setMarsData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 3,
        atmosphericPressure: Math.max(0.5, prev.atmosphericPressure + (Math.random() - 0.5) * 0.02),
        solarPower: Math.max(60, Math.min(95, prev.solarPower + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app space-theme">
      {/* Space Header */}
      <header className="space-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <div className="rotating-satellite">🛰️</div>
            </div>
            <div className="logo-text">
              <h1 className="glow-text">METROPOLIS</h1>
              <span className="subtitle">NASA Space Apps Challenge • Earth & Mars Digital Twins</span>
            </div>
          </div>
          
          <nav className="view-selector">
            <button 
              className={`view-btn earth-btn ${activeView === 'earth' ? 'active' : ''}`}
              onClick={() => setActiveView('earth')}
            >
              🌍 <span>EARTH TWIN</span>
            </button>
            
            <button 
              className={`view-btn dual-btn ${activeView === 'dual' ? 'active' : ''}`}
              onClick={() => setActiveView('dual')}
            >
              ⚡ <span>DUAL VIEW</span>
            </button>
            
            <button 
              className={`view-btn mars-btn ${activeView === 'mars' ? 'active' : ''}`}
              onClick={() => setActiveView('mars')}
            >
              🔴 <span>MARS TWIN</span>
            </button>
          </nav>
          
          <div className="status-indicators">
            <div className="status-item">
              ⚡ <span>SYSTEMS ONLINE</span>
            </div>
            <div className="connection-status">
              <div className="status-dot"></div>
              <span>CONNECTED</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="main-container">
        {activeView === 'dual' ? (
          <DualView earthData={earthData} marsData={marsData} setActiveView={setActiveView} />
        ) : activeView === 'earth' ? (
          <EarthDetailView data={earthData} setActiveView={setActiveView} />
        ) : (
          <MarsDetailView data={marsData} setActiveView={setActiveView} />
        )}
      </main>
      
      {/* Animated Background */}
      <div className="space-particles"></div>
      <div className="space-grid"></div>
    </div>
  );
}

// Dual View Component - Compact overview
const DualView = ({ earthData, marsData, setActiveView }) => {
  return (
    <div className="dual-view-container">
      <div className="twin-summary earth-summary" onClick={() => setActiveView('earth')}>
        <div className="summary-header">
          <div className="planet-icon">🌍</div>
          <div>
            <h3>EARTH TWIN</h3>
            <p>Urban Management System</p>
          </div>
          <div className="expand-btn">🔍</div>
        </div>
        
        <div className="quick-metrics-grid">
          <div className="mini-metric">
            <span className="metric-label">Air Quality</span>
            <span className="metric-value">{earthData.airQuality.toFixed(0)} AQI</span>
          </div>
          <div className="mini-metric">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">{earthData.temperature.toFixed(1)}°C</span>
          </div>
          <div className="mini-metric">
            <span className="metric-label">Traffic Flow</span>
            <span className="metric-value">{earthData.trafficFlow.toFixed(0)}%</span>
          </div>
          <div className="mini-metric">
            <span className="metric-label">Green Areas</span>
            <span className="metric-value">{earthData.greenCoverage}%</span>
          </div>
        </div>
        
        <div className="summary-status">
          <div className="status-indicator good"></div>
          <span>Active • Click to expand</span>
        </div>
      </div>

      <div className="twin-summary mars-summary" onClick={() => setActiveView('mars')}>
        <div className="summary-header">
          <div className="planet-icon">🔴</div>
          <div>
            <h3>MARS TWIN</h3>
            <p>Colony Management System</p>
          </div>
          <div className="expand-btn">🔍</div>
        </div>
        
        <div className="quick-metrics-grid">
          <div className="mini-metric">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">{marsData.temperature.toFixed(0)}°C</span>
          </div>
          <div className="mini-metric">
            <span className="metric-label">Pressure</span>
            <span className="metric-value">{marsData.atmosphericPressure.toFixed(2)} kPa</span>
          </div>
          <div className="mini-metric">
            <span className="metric-label">Solar Power</span>
            <span className="metric-value">{marsData.solarPower.toFixed(0)}%</span>
          </div>
          <div className="mini-metric">
            <span className="metric-label">Water Reserves</span>
            <span className="metric-value">{marsData.waterReserves}L</span>
          </div>
        </div>
        
        <div className="summary-status">
          <div className="status-indicator good"></div>
          <span>Active • Click to expand</span>
        </div>
      </div>
      
      {/* Dual Planets Comparison Image - Full width below */}
      <div className="planets-comparison-section">
        <img 
          src="/earth-mars-comparison-2.png" 
          alt="Earth and Mars Digital Twin Comparison" 
          className="comparison-image"
        />
      </div>
    </div>
  );
};

// Earth Detail View - Full map and LLM
const EarthDetailView = ({ data, setActiveView }) => {
  return (
    <div className="detail-view earth-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setActiveView('dual')}>
          ← Back to Dual View
        </button>
        <h2>🌍 EARTH DIGITAL TWIN - DETAILED VIEW</h2>
      </div>
      
      <div className="detail-content">
        <div className="map-section">
          <EarthMap data={data} />
        </div>
        <div className="chat-section">
          <EarthLLMChat data={data} />
        </div>
      </div>
    </div>
  );
};

// Mars Detail View - Full map and LLM  
const MarsDetailView = ({ data, setActiveView }) => {
  return (
    <div className="detail-view mars-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setActiveView('dual')}>
          ← Back to Dual View
        </button>
        <h2>🔴 MARS DIGITAL TWIN - DETAILED VIEW</h2>
      </div>
      
      <div className="detail-content">
        <div className="map-section">
          <MarsMap data={data} />
        </div>
        <div className="chat-section">
          <MarsLLMChat data={data} />
        </div>
      </div>
    </div>
  );
};

// Earth Map Component
const EarthMap = ({ data }) => {
  return (
    <div className="interactive-map earth-map">
      <EarthHeatMapVisualization />
    </div>
  );
};

// Mars Map Component
const MarsMap = ({ data }) => {
  return (
    <div className="interactive-map mars-map">
      <div className="map-header">
        <h3>🔴 MARS COLONY MONITORING</h3>
        <div className="data-sources">
          <span className="source active">🤖 Perseverance</span>
          <span className="source active">🚁 Ingenuity</span>
          <span className="source active">🛰️ MRO</span>
        </div>
      </div>
      
      <div className="map-container">
        <div className="mars-map-display">
          {/* Integración del componente de visualización de tormenta de arena */}
          <MarsStormVisualization />
        </div>
      </div>
      
      <div className="map-metrics">
        <div className="live-metric">
          <span>📡 Colony Data:</span>
          <span className="metric-stream">Temp: {data.temperature.toFixed(0)}°C | Pressure: {data.atmosphericPressure.toFixed(2)} kPa | Power: {data.solarPower.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

// Earth LLM Chat Component
const EarthLLMChat = ({ data }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `🧠 Earth AI Urban Planner v3.0 Online. Current city status: Air Quality ${data.airQuality.toFixed(0)} AQI, Traffic Flow ${data.trafficFlow.toFixed(0)}%, Green Coverage ${data.greenCoverage}%. Ready to analyze urban development opportunities and infrastructure optimization...`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef(null);

  // Scroll automático al final cuando hay nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // AI response generator with professional urban analysis
  const generateAIResponse = (question) => {
    const q = question.toLowerCase();
    
    // City expansion
    if (q.includes('expand') || q.includes('expansion') || q.includes('grow') || q.includes('growth')) {
      return `📊 **URBAN EXPANSION ANALYSIS**

**Priority Areas for Expansion:**

🏗️ **NORTH SECTOR (High Priority)**
• Available area: ~45 hectares of flat terrain
• Advantages: Proximity to existing public transport, low current density
• Required infrastructure: Power grid (2.5 km), sewage system (3.2 km)
• Estimated capacity: 8,000-10,000 new residents
• Environmental impact: LOW - Previously urbanized zone

🌆 **EAST SECTOR (Medium Priority)**
• Available area: ~32 hectares with favorable topography
• Advantages: Near industrial zone, potential for mixed development
• Required infrastructure: Access roads (1.8 km), basic services
• Estimated capacity: 6,500 residents + commercial
• Consideration: Requires aquifer impact study

🏞️ **SOUTH SECTOR (Long-term Development)**
• Available area: ~28 hectares with moderate slope
• Advantages: Panoramic views, tourism potential
• Challenges: Leveling costs 15-20% higher
• Recommendation: Premium residential development with controlled density

**Suggested Timeline:**
Phase 1 (Years 1-2): North Sector - Base infrastructure
Phase 2 (Years 3-4): East Sector - Commercial development
Phase 3 (Years 5-7): South Sector - Specialized projects`;
    }
    
    // Carreteras y vialidad
    if (q.includes('carretera') || q.includes('vial') || q.includes('road') || q.includes('traffic') || q.includes('tráfico')) {
      return `🚗 **ANÁLISIS DE INFRAESTRUCTURA VIAL**

**Nuevas Carreteras Prioritarias:**

🛣️ **CORREDOR NORTE-SUR (CRÍTICO)**
• Longitud: 4.2 km, 4 carriles
• Tráfico actual en ruta alternativa: ${data.trafficFlow.toFixed(0)}% capacidad
• Reducción esperada de congestión: 35-42%
• Costo estimado: $12.5M
• Tiempo de construcción: 14 meses
• Beneficio: Conecta zona residencial con distrito comercial central

🔄 **ANILLO PERIFÉRICO ESTE (ALTA PRIORIDAD)**
• Longitud: 6.8 km, vía rápida 6 carriles
• Reducción de tráfico en centro: 28-33%
• Incluye: 3 intercambiadores viales, ciclovía segregada
• Costo estimado: $24.8M
• Beneficio: Desvía tráfico pesado, mejora calidad del aire en centro

🌉 **PUENTE CONEXIÓN OESTE (PRIORIDAD MEDIA)**
• Longitud: 850m sobre río
• Reduce tiempo de viaje: 18 minutos promedio
• Capacidad: 2,500 vehículos/hora
• Costo: $8.2M
• Consideración ambiental: Diseño ecológico con paso para fauna

**Mejoras Complementarias:**
• Sistema de semáforos inteligentes: Reducción 15% tiempos de espera
• Carriles exclusivos BRT: 3 rutas principales, 45 km total
• Red de ciclovías protegidas: 28 km adicionales
• Aplicación móvil de tráfico en tiempo real: 65% adopción esperada

**Impacto Estimado Total:**
✅ Reducción congestión: 40-48%
✅ Ahorro tiempo promedio: 22 min/día por persona
✅ Reducción emisiones CO₂: 18,000 toneladas/año`;
    }
    
    // Green areas and parks
    if (q.includes('verde') || q.includes('parque') || q.includes('green') || q.includes('park') || q.includes('jardín')) {
      return `🌳 **GREEN SPACES ANALYSIS**

**Current Status:** ${data.greenCoverage}% green coverage (WHO recommends >20%)

**Priority Zones for New Parks:**

🏞️ **CENTRAL URBAN PARK (URGENT)**
• Location: Abandoned industrial block, south-center
• Area: 8.5 hectares
• Type: Multi-use park with artificial lake
• Population benefited: 45,000 residents (800m radius)
• Features: Sports zone, amphitheater, 3.2km trails, dog park
• Budget: $4.2M
• Air quality benefit: Estimated capture 125 tons CO₂/year

🌲 **NORTH RIVER GREEN CORRIDOR (HIGH PRIORITY)**
• Extension: 4.8 km linear along the river
• Total area: 12 hectares
• Type: Ecological linear park with conservation zones
• Includes: Bike path, viewpoints, picnic areas, riverbank restoration
• Budget: $6.8M
• Additional benefit: Flood control, local wildlife habitat

🎋 **NEIGHBORHOOD MICRO-PARKS (15 LOCATIONS)**
• Individual area: 0.3-0.8 hectares each
• Distribution: Neighborhoods with green deficit >500m from nearest park
• Features: Children's area, outdoor gym, native trees
• Total budget: $3.5M
• Coverage: 28,000 additional residents <300m from green area

**Urban Tree Planting Program:**
📍 15,000 new trees on main avenues
📍 Native species adapted to climate: 70% of total
📍 Vertical gardens in 8 public buildings (2,400 m²)
📍 Mandatory green roofs in new construction

**Projected Environmental Impact:**
✅ Green coverage: ${data.greenCoverage}% → 38-42%
✅ Urban temperature reduction: 2.5-3.8°C in summer
✅ CO₂ capture: +340 tons/year
✅ Population mental health improvement: 15% stress reduction`;
    }
    
    // Hospitales y salud
    if (q.includes('hospital') || q.includes('salud') || q.includes('health') || q.includes('médic') || q.includes('clínic')) {
      return `🏥 **ANÁLISIS DE INFRAESTRUCTURA DE SALUD**

**Evaluación de Necesidades:**
• Población actual: ${data.population}M habitantes
• Camas hospitalarias disponibles: 3.2 camas/1000 hab (OMS recomienda 4-5)
• Tiempo promedio ambulancia: 12.5 minutos
• Zonas desatendidas: 4 sectores con >20 min al hospital más cercano

**Hospitales Nuevos Requeridos:**

🏥 **HOSPITAL GENERAL NORTE (CRÍTICO - 1ª PRIORIDAD)**
• Ubicación: Sector Norte, intersección Av. Principal con Ruta 14
• Capacidad: 250 camas, 12 quirófanos
• Especialidades: Urgencias 24/7, UCI 40 camas, Maternidad, Traumatología
• Población cubierta: 185,000 habitantes (radio 8 km)
• Presupuesto construcción: $85M
• Tiempo construcción: 28 meses
• Reducción tiempo respuesta: 8.5 minutos promedio zona norte

🏨 **CENTRO MÉDICO ESPECIALIZADO ESTE (ALTA PRIORIDAD)**
• Ubicación: Zona industrial-residencial Este
• Capacidad: 150 camas especializadas
• Especialidades: Oncología, Cardiología, Neurología avanzada
• Tecnología: PET-CT, Resonancia 3T, Radioterapia
• Presupuesto: $62M
• Atenderá: Referidos de 3 municipios vecinos (~450K habitantes)

🚑 **RED DE CLÍNICAS COMUNITARIAS (15 UBICACIONES)**
• Distribución: Barrios periféricos con tiempo >15min a hospital
• Servicios: Atención primaria, urgencias menores, laboratorio básico
• Horario: 6:00-22:00, 7 días/semana
• Presupuesto por clínica: $2.8M
• Total red: $42M
• Impacto: Descongestión urgencias hospitalarias 35-40%

**Centros de Especialidad Adicionales:**
💉 Centro de Vacunación Regional: 5,000 dosis/día capacidad
🧬 Laboratorio de Análisis Clínicos Central: 8,000 muestras/día
🧠 Instituto de Salud Mental: 180 camas psiquiátricas
🦴 Centro de Rehabilitación: 120 puestos terapia física

**Optimización Sistema Actual:**
📍 Ampliación hospital central: +80 camas UCI
📍 3 nuevas ambulancias equipadas por zona
📍 Sistema de telemedicina: 45 puntos rurales conectados
📍 App coordinación citas: Reducción 25% tiempos espera

**Cronograma de Implementación:**
Año 1-2: Clínicas comunitarias + ampliación hospital central
Año 2-4: Hospital Norte (construcción)
Año 3-5: Centro Especializado Este
Año 4-6: Centros especializados complementarios`;
    }
    
    // Respuesta general
    return `🧠 **ASISTENTE DE PLANIFICACIÓN URBANA**

Puedo ayudarte con análisis profesionales sobre:

**🏗️ Expansión Urbana**
Pregunta: "¿Por dónde podría expandirse la ciudad?"
• Análisis de sectores con potencial de desarrollo
• Evaluación de infraestructura necesaria
• Impacto ambiental y capacidad estimada

**🚗 Road Infrastructure**
Question: "Where are roads needed?"
• Identification of critical road corridors
• Projects to reduce congestion
• Alternative transportation network

**🌳 Green Spaces**
Question: "Where is the best location for green areas?"
• Optimal location for new parks
• Ecological corridors and tree planting
• Impact on air quality and temperature

**🏥 Health Infrastructure**
Question: "In which areas are hospitals needed?"
• Analysis of current medical coverage
• Strategic location of hospitals and clinics
• Response time optimization

**Real-Time Data:**
• Air quality: ${data.airQuality.toFixed(0)} AQI
• Traffic flow: ${data.trafficFlow.toFixed(0)}%
• Green coverage: ${data.greenCoverage}%
• Population: ${data.population}M inhabitants

What topic would you like me to analyze in detail?`;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateAIResponse(input)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Alertas automáticas basadas en datos
    const interval = setInterval(() => {
      if (data.airQuality > 70 && messages.length > 0 && messages[messages.length - 1].role === 'user') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ **ALERTA DE CALIDAD DEL AIRE**\n\nAQI actual: ${data.airQuality.toFixed(0)} (Moderado-Alto)\n\nRecomendaciones inmediatas:\n• Activar restricción vehicular zona centro\n• Incrementar riego de calles en 40%\n• Promover uso de transporte público gratuito hoy\n• Considerar implementación de zona de bajas emisiones permanente`
        }]);
      }
      
      if (data.trafficFlow > 85 && messages.length > 0 && messages[messages.length - 1].role === 'user') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `🚦 **ALERTA DE CONGESTIÓN VIAL**\n\nFlujo de tráfico: ${data.trafficFlow.toFixed(0)}% (Saturación crítica)\n\nAcciones recomendadas:\n• Ajustar semáforos a modo "rush hour" en avenidas principales\n• Habilitar carriles reversibles en Av. Central\n• Sugerir trabajo remoto para empresas no esenciales\n• Desplegar agentes de tránsito en 8 intersecciones clave`
        }]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [data, messages]);

  return (
    <div className="llm-chat earth-chat">
      <div className="chat-header">
        <h3>🧠 EARTH AI URBAN PLANNER</h3>
        <div className="ai-status">
          <div className={`status-dot ${isTyping ? 'thinking' : 'active'}`}></div>
          <span>{isTyping ? 'ANALYZING...' : 'ONLINE'}</span>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && <span className="ai-icon">🧠</span>}
            {msg.role === 'user' && <span className="user-icon">👤</span>}
            <div className="message-content" style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message assistant typing">
            <span className="ai-icon">🧠</span>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about city expansion, roads, green areas, hospitals..."
          className="chat-input"
          disabled={isTyping}
        />
        <button 
          className="send-btn" 
          onClick={handleSendMessage}
          disabled={isTyping || !input.trim()}
        >
          {isTyping ? 'Analyzing...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

// Mars LLM Chat Component
const MarsLLMChat = ({ data }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `🤖 Mars Colony AI Planner v2.1 Online. Current environmental analysis: Temperature ${data.temperature.toFixed(1)}°C, Atmospheric Pressure ${data.atmosphericPressure.toFixed(2)} kPa, Solar Power ${data.solarPower.toFixed(0)}%. Initiating strategic colony expansion analysis...`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Respuestas inteligentes del AI basadas en condiciones reales
  const generateAIResponse = (question) => {
    const lowerQ = question.toLowerCase();
    
    // Análisis de radiación para almacenes
    if (lowerQ.includes('almacen') || lowerQ.includes('warehouse') || lowerQ.includes('storage') || lowerQ.includes('radiación') || lowerQ.includes('radiation')) {
      const radiation = 0.67; // mSv/day on Mars surface
      return `📦 **OPTIMAL WAREHOUSE LOCATION ANALYSIS**

**Radiation Protection Assessment:**
- Current Mars surface radiation: ~0.67 mSv/day (240x Earth levels)
- Recommended locations based on natural shielding:

**PRIORITY ZONES:**
1. **Jezero Crater Delta (35.4°N)** - Partial cliff overhang protection
   - Estimated radiation reduction: 15-20%
   - Proximity to water ice deposits
   - Natural rock formation shielding

2. **Lava Tube Entrance (North Sector)** - Underground access
   - Radiation reduction: 85-95% with 3m+ rock coverage
   - Temperature stability: ±5°C variation
   - **HIGHEST PRIORITY** for long-term storage

3. **Regolith-Covered Structure (West Basin)** - Artificial shielding
   - 2.5m regolith layer reduces radiation by 50%
   - Requires excavation: ~450 hours rover time
   
**RECOMMENDATION:** Prioritize lava tube for critical supplies and radiation-sensitive equipment. Delta location optimal for frequent-access materials.`;
    }
    
    // Análisis de invernadero
    if (lowerQ.includes('invernadero') || lowerQ.includes('greenhouse') || lowerQ.includes('agricultura') || lowerQ.includes('agriculture') || lowerQ.includes('cultivo') || lowerQ.includes('crops')) {
      const temp = data.temperature;
      const pressure = data.atmosphericPressure;
      const solar = data.solarPower;
      
      return `🌱 **GREENHOUSE PLACEMENT OPTIMIZATION ANALYSIS**

**Current Environmental Conditions:**
- Temperature: ${temp.toFixed(1)}°C (Requires +40°C heating for crops)
- Atmospheric Pressure: ${pressure.toFixed(2)} kPa (Earth: 101 kPa)
- Solar Irradiance: ${solar.toFixed(0)}% efficiency (~590 W/m² peak)

**OPTIMAL GREENHOUSE LOCATIONS:**

1. **SOUTH-FACING CRATER WALL (PRIORITY 1)**
   - Sun exposure: 8.2 hours/sol average
   - Thermal mass advantage: +12°C warmer than plains
   - Wind protection: 40% reduction in dust storms
   - **Energy savings:** 30% less heating required
   - Coordinates: 18.4385°N, 77.5813°E (relative)

2. **Subsurface Greenhouse (Skylight Access)**
   - Temperature stability: ±3°C daily variation
   - Radiation shielding: 90% with transparent dome
   - Water ice proximity: 2.3m depth
   - **Best for:** Perennial crops (potatoes, soybeans)

3. **Pressurized Hybrid Dome (Central Colony)**
   - Integrated with life support: 99.2% CO₂ recycling
   - Current solar power: ${solar > 80 ? 'SUFFICIENT' : 'REQUIRES BACKUP'}
   - **Crop yield estimate:** 12kg/m²/sol with LED supplement

**CRITICAL REQUIREMENTS:**
- Pressurization to 20 kPa minimum
- LED grow lights for dust storm periods (${solar < 60 ? 'ACTIVE NOW' : 'standby'})
- Soil: Regolith + 15% Earth compost mix
- Water: 8L/m²/day recycling system

**RECOMMENDATION:** Implement South-facing crater wall greenhouse for Phase 1. Thermal advantages reduce energy consumption by 7.2 kWh/day.`;
    }

    // Análisis de hábitat
    if (lowerQ.includes('habitat') || lowerQ.includes('hábitat') || lowerQ.includes('vivienda') || lowerQ.includes('housing') || lowerQ.includes('dome') || lowerQ.includes('domo')) {
      return `🏠 **HABITAT EXPANSION SITE ANALYSIS**

**Environmental Safety Assessment:**

**OPTIMAL SITES:**
1. **Lava Tube Network (North, 2.1km)**
   - Natural pressure seal potential
   - Radiation: 5% of surface levels
   - Seismic stability: EXCELLENT
   - Expansion capacity: 2,400m² habitable

2. **Jezero Delta Terrace**
   - Elevation advantage: +35m (dust storm protection)
   - Water-worked sediments (historical water presence)
   - Solar: 94% efficiency
   - Temperature: ${data.temperature.toFixed(1)}°C (avg)

**CRITICAL FACTORS:**
- Current pressure: ${data.atmosphericPressure.toFixed(2)} kPa (Need 50+ kPa inside)
- Dust devil frequency: HIGH (active season)
- Recommend: 3-layer dome with regolith berm

**PRIORITY:** Lava tube for maximum safety, Delta terrace for operational efficiency.`;
    }

    // Análisis de energía
    if (lowerQ.includes('energia') || lowerQ.includes('energy') || lowerQ.includes('solar') || lowerQ.includes('power') || lowerQ.includes('bateria') || lowerQ.includes('battery')) {
      return `⚡ **POWER INFRASTRUCTURE ANALYSIS**

**Current Status:**
- Solar Array Output: ${data.solarPower.toFixed(1)}%
- Daily Energy Budget: ~16 kWh/sol
- Critical Systems Draw: 4.2 kWh baseline

**SOLAR PANEL EXPANSION:**
- **Location:** East Plains (unobstructed horizon)
- **Efficiency gain:** +28% with dust cleaning robots
- **ROI:** 45 sols to offset deployment energy

**BACKUP SYSTEMS:**
${data.solarPower < 70 ? '⚠️ LOW SOLAR - ACTIVATING RTG BACKUP' : '✅ Solar sufficient'}
- RTG (Radioisotope) output: 110W continuous
- Battery capacity: 42 kWh (storm reserve)

**RECOMMENDATION:** Deploy 4 additional panels at coordinates (0.3km East) for 30% power increase.`;
    }

    // Análisis de agua
    if (lowerQ.includes('agua') || lowerQ.includes('water') || lowerQ.includes('ice') || lowerQ.includes('hielo')) {
      return `💧 **WATER RESOURCE MAPPING**

**Ice Deposits Detected:**
1. **Subsurface Ice (North Sector)**
   - Depth: 2.8m below surface
   - Estimated volume: 1,200 m³
   - Purity: 85% (Mars 2020 data)
   - Extraction energy: 2.3 kWh/L

2. **Jezero Ancient Lake Bed**
   - Hydrated minerals confirmed
   - Extraction: DIFFICULT (bound in minerals)
   - Scientific value: HIGH

**CURRENT USAGE:**
- Life support: 12L/person/sol
- Greenhouse: 18L/sol (with 90% recycling)
- Fuel production (H₂): 5L/sol

**RECOMMENDATION:** Excavate North Sector ice deposit. 30-sol operation yields 450L reserve.`;
    }

    // Regolith collectors placement
    if (
      lowerQ.includes('regolith') ||
      lowerQ.includes('collector') ||
      lowerQ.includes('collectors') ||
      lowerQ.includes('isru')
    ) {
      const temp = data.temperature;
      const pressure = data.atmosphericPressure;
      const solar = data.solarPower;
 
      return `🪨 **REGOLITH COLLECTOR DEPLOYMENT ANALYSIS**
 
**Environmental Baseline (current):**
- Temperature: ${temp.toFixed(1)}°C (surface operations OK with thermal management)
- Atmospheric Pressure: ${pressure.toFixed(2)} kPa
- Solar Power Availability: ${solar.toFixed(0)}%
 
**Selection Criteria:**
1) High regolith availability (fine basaltic dust/sand, low rock density)
2) Gentle slopes (<7°) for rover navigation and hopper intake efficiency
3) Downwind edges of basins for natural dust funneling (storm seasons)
4) Proximity (<500 m) to colony logistics corridor to reduce hauling energy
5) Acceptable radiation/erosion exposure; avoid sharp rim crests
 
**Optimal Candidate Zones (Jezero region):**
1. EAST BASIN APRON (PRIORITY 1)
   - Location: Leeward side of central basin, east-southeast terrace
   - Terrain: Smooth apron with fine sediment; slope ~3–5°
   - Logistics: ~350 m from main habitat corridor
   - Yield estimate: 1.4–1.8 kg/min per collector (storm-enhanced)
   - Notes: Good solar exposure; low boulder density
 
2. SOUTH RIM FAN (PRIORITY 2)
   - Location: South inner rim, small paleo-fan deposits
   - Terrain: Fine layered material; occasional pebbles; slope ~6°
   - Logistics: 520 m from power hub (requires cable reel or battery swap)
   - Yield estimate: 1.1–1.5 kg/min
   - Notes: Slightly higher dust devil frequency → plan filter maintenance
 
3. DELTA FORESET EDGE (PRIORITY 3 - SCIENCE SENSITIVE)
   - Location: Western delta toe, outside primary science exclusion
   - Terrain: Mixed grains; avoid cobble patches; slope ~4°
   - Logistics: 600–700 m haul to processing
   - Yield estimate: 0.9–1.2 kg/min
   - Notes: Use only if environmental permits allow
 
**Deployment Plan:**
- Phase 1: 2 collectors at EAST BASIN APRON (spaced 40 m, cross-wind)
- Phase 2: 1 collector at SOUTH RIM FAN with dust-mitigation schedule (every 3 sols)
- Power: ${solar > 80 ? 'Direct solar + battery buffer' : 'Solar + RTG buffer'}; target 300–500 W per unit
- Telemetry: Continuous particulate load + motor torque monitoring to auto-pause during extreme storms
 
**Recommendation:** Start at EAST BASIN APRON; best blend of yield, safety, and logistics. Keep one mobile collector ready to redeploy to SOUTH RIM FAN when storm forecasts indicate elevated dust transport.`;
    }

    // Respuesta general
    return `🤖 **COLONY STATUS REPORT**

**Current Conditions:**
- Temperature: ${data.temperature.toFixed(1)}°C
- Atmospheric Pressure: ${data.atmosphericPressure.toFixed(2)} kPa  
- Solar Power: ${data.solarPower.toFixed(0)}%
- Rovers Active: ${data.roversActive}

**Available Analysis:**
- 📦 Warehouse placement (radiation shielding)
- 🌱 Greenhouse location (agriculture optimization)
- 🏠 Habitat expansion sites
- ⚡ Power infrastructure
- 💧 Water/ice resource mapping
- 🪨 Regolith collector deployment (ISRU optimization)

**Ask me specific questions like:**
- "Where should we place the greenhouse based on temperature?"
- "Optimal warehouse position considering radiation?"
- "Best location for new habitat modules?"
- "How to optimize solar power generation?"
- "Where is the optimal location to deploy regolith collectors?"`;
  };

  // Enviar mensaje
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular delay del AI pensando
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateAIResponse(input)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Monitoreo automático de condiciones
  useEffect(() => {
    const interval = setInterval(() => {
      // Alertas automáticas basadas en condiciones reales
      if (data.solarPower < 60 && messages[messages.length - 1]?.content?.includes('Solar power') === false) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ **ENERGY ALERT:** Solar power dropped to ${data.solarPower.toFixed(0)}%. Dust storm likely. Activating energy conservation protocol and switching to RTG backup (110W). Recommend postponing non-critical operations.`
        }]);
      }
      
      if (data.temperature < -80 && messages[messages.length - 1]?.content?.includes('Extreme cold') === false) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `🥶 **THERMAL ALERT:** Extreme cold detected (${data.temperature.toFixed(1)}°C). Nighttime temperature approaching critical threshold. Increasing habitat heating to 250W. Greenhouse thermal blankets deployed automatically.`
        }]);
      }

      if (data.atmosphericPressure > 0.75 && messages[messages.length - 1]?.content?.includes('Pressure spike') === false) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `🌪️ **ATMOSPHERIC ALERT:** Pressure spike to ${data.atmosphericPressure.toFixed(2)} kPa indicates possible dust storm approaching. Sealing airlocks and securing external equipment. Estimated arrival: 2.3 hours.`
        }]);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, [data, messages]);

  return (
    <div className="llm-chat mars-chat">
      <div className="chat-header">
        <h3>🤖 MARS COLONY AI PLANNER</h3>
        <div className="ai-status">
          <div className={`status-dot ${isTyping ? 'thinking' : 'active'}`}></div>
          <span>{isTyping ? 'ANALYZING...' : 'ONLINE'}</span>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.slice(-6).map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && <span className="ai-icon">🤖</span>}
            {msg.role === 'user' && <span className="user-icon">👤</span>}
            <div className="message-content" style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
          </div>
        ))}
        {isTyping && (
          <div className="message assistant typing">
            <span className="ai-icon">🤖</span>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask: 'Where to place greenhouse?' or 'Optimal warehouse location?'"
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-btn" disabled={isTyping || !input.trim()}>
          {isTyping ? '⏳' : '📡'} Send
        </button>
      </div>
    </div>
  );
};

export default App;
