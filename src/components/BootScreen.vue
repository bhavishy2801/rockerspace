<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['bootComplete']);

const bootMessages = [
  { text: 'INITIALIZING NEURAL NETWORK...', type: 'info', delay: 250 },
  { text: 'LOADING QUANTUM PROCESSORS...', type: 'info', delay: 200 },
  { text: 'ESTABLISHING SECURE CONNECTIONS...', type: 'success', delay: 180 },
  { text: 'CALIBRATING BIOMETRIC SENSORS...', type: 'info', delay: 220 },
  { text: 'DECRYPTING CLASSIFIED DATA...', type: 'warning', delay: 300 },
  { text: 'SYNCHRONIZING SATELLITE LINKS...', type: 'info', delay: 190 },
  { text: 'ACTIVATING FIREWALL PROTOCOLS...', type: 'success', delay: 240 },
  { text: 'LOADING AI ASSISTANCE MODULES...', type: 'info', delay: 210 },
  { text: 'VERIFYING DIGITAL SIGNATURES...', type: 'success', delay: 260 },
  { text: 'INITIALIZING HOLOGRAPHIC DISPLAY...', type: 'info', delay: 200 },
  { text: 'ESTABLISHING MATRIX INTERFACE...', type: 'success', delay: 280 },
  { text: 'LOADING USER PROFILE: BHAVISHY AGRAWAL...', type: 'special', delay: 350 },
  { text: 'AUTHENTICATION SUCCESSFUL...', type: 'success', delay: 300 },
  { text: 'WELCOME TO THE SYSTEM...', type: 'complete', delay: 400 }
];

const displayedMessages = ref([]);
const progress = ref(0);
const currentMessage = ref('');
const isBootComplete = ref(false);
const systemStats = ref({
  cpu: 0,
  memory: 0,
  network: 0,
  security: 0
});

const scanlines = ref([]);
const particles = ref([]);

onMounted(() => {
  startBootSequence();
  initializeEffects();
});

onUnmounted(() => {
  // Cleanup any intervals if needed
});

async function startBootSequence() {
  // Initial system check
  await simulateSystemCheck();
  
  // Display boot messages
  for (let i = 0; i < bootMessages.length; i++) {
    const message = bootMessages[i];
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, message.delay));
    
    displayedMessages.value.push({
      ...message,
      timestamp: new Date().toLocaleTimeString(),
      id: Date.now() + Math.random()
    });
    
    progress.value = ((i + 1) / bootMessages.length) * 100;
    
    // Update system stats progressively
    updateSystemStats(i);
    
    // Scroll to bottom
    scrollToBottom();
  }
  
  // Final completion sequence
  await completeBootSequence();
}

async function simulateSystemCheck() {
  const checks = [
    'CHECKING HARDWARE INTEGRITY...',
    'VERIFYING SYSTEM COMPATIBILITY...',
    'INITIALIZING CORE SYSTEMS...'
  ];
  
  for (const check of checks) {
    await new Promise(resolve => setTimeout(resolve, 150));
    displayedMessages.value.push({
      text: check,
      type: 'system',
      timestamp: new Date().toLocaleTimeString(),
      id: Date.now() + Math.random()
    });
    scrollToBottom();
  }
}

function updateSystemStats(index) {
  const total = bootMessages.length;
  const progressRatio = (index + 1) / total;
  
  systemStats.value = {
    cpu: Math.min(100, Math.round(progressRatio * 100 + Math.random() * 10)),
    memory: Math.min(100, Math.round(progressRatio * 85 + Math.random() * 15)),
    network: Math.min(100, Math.round(progressRatio * 95 + Math.random() * 5)),
    security: Math.min(100, Math.round(progressRatio * 100))
  };
}

async function completeBootSequence() {
  isBootComplete.value = true;
  
  // Final status update
  await new Promise(resolve => setTimeout(resolve, 500));
  
  displayedMessages.value.push({
    text: 'SYSTEM INITIALIZATION COMPLETE',
    type: 'complete',
    timestamp: new Date().toLocaleTimeString(),
    id: Date.now()
  });
  
  // Wait before emitting completion
  await new Promise(resolve => setTimeout(resolve, 1500));
  emit('bootComplete');
}

function scrollToBottom() {
  setTimeout(() => {
    const messagesContainer = document.querySelector('.boot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, 50);
}

function initializeEffects() {
  // Initialize scanlines
  for (let i = 0; i < 5; i++) {
    scanlines.value.push({
      id: i,
      top: Math.random() * 100,
      speed: Math.random() * 2 + 1
    });
  }
  
  // Initialize particles
  for (let i = 0; i < 20; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    });
  }
  
  // Animate effects
  animateEffects();
}

function animateEffects() {
  // Animate scanlines
  scanlines.value.forEach(line => {
    line.top += line.speed;
    if (line.top > 100) line.top = -5;
  });
  
  // Animate particles
  particles.value.forEach(particle => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    if (particle.x > 100) particle.x = 0;
    if (particle.x < 0) particle.x = 100;
    if (particle.y > 100) particle.y = 0;
    if (particle.y < 0) particle.y = 100;
  });
  
  requestAnimationFrame(animateEffects);
}

function getMessageTypeClass(type) {
  switch (type) {
    case 'success': return 'text-green-400';
    case 'warning': return 'text-yellow-400';
    case 'error': return 'text-red-400';
    case 'special': return 'text-cyan-400';
    case 'complete': return 'text-green-300';
    case 'system': return 'text-blue-400';
    default: return 'text-green-500';
  }
}
</script>

<template>
  <div class="boot-screen">
    <!-- Background Effects -->
    <div class="background-effects">
      <!-- Scanlines -->
      <div 
        v-for="line in scanlines" 
        :key="line.id"
        class="scanline"
        :style="{ top: line.top + '%' }"
      ></div>
      
      <!-- Particles -->
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="particle"
        :style="{ 
          left: particle.x + '%', 
          top: particle.y + '%',
          width: particle.size + 'px',
          height: particle.size + 'px'
        }"
      ></div>
    </div>
    
    <div class="boot-container">
      <!-- Header Section -->
      <div class="boot-header">
        <h1 class="boot-title">
          <span class="title-brackets">◢◤</span>
          <span class="title-text">QUANTUM TERMINAL</span>
          <span class="title-version">v3.7.9</span>
          <span class="title-brackets">◢◤</span>
        </h1>
        
        <div class="boot-subtitle">
          <span class="subtitle-icon">◆</span>
          <span class="subtitle-text">INITIATING SYSTEM BOOT</span>
          <span class="subtitle-icon">◆</span>
        </div>
        
        <!-- System Stats -->
        <div class="system-stats">
          <div class="stat-item">
            <span class="stat-label">CPU</span>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: systemStats.cpu + '%' }"></div>
            </div>
            <span class="stat-value">{{ systemStats.cpu }}%</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">MEM</span>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: systemStats.memory + '%' }"></div>
            </div>
            <span class="stat-value">{{ systemStats.memory }}%</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">NET</span>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: systemStats.network + '%' }"></div>
            </div>
            <span class="stat-value">{{ systemStats.network }}%</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">SEC</span>
            <div class="stat-bar">
              <div class="stat-fill" :style="{ width: systemStats.security + '%' }"></div>
            </div>
            <span class="stat-value">{{ systemStats.security }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Messages Section -->
      <div class="boot-content">
        <div class="boot-messages">
          <div 
            v-for="message in displayedMessages" 
            :key="message.id"
            class="boot-message"
            :class="getMessageTypeClass(message.type)"
          >
            <span class="message-timestamp">[{{ message.timestamp }}]</span>
            <span class="message-prefix">></span>
            <span class="message-text">{{ message.text }}</span>
            <span v-if="message.type === 'success'" class="message-status">✓</span>
            <span v-else-if="message.type === 'warning'" class="message-status">⚠</span>
            <span v-else-if="message.type === 'error'" class="message-status">✗</span>
            <span v-else-if="message.type === 'complete'" class="message-status">★</span>
          </div>
        </div>
        
        <!-- Progress Section -->
        <div class="boot-progress-section">
          <div class="progress-label">
            <span>BOOT PROGRESS</span>
            <span class="progress-percentage">{{ Math.round(progress) }}%</span>
          </div>
          
          <div class="boot-progress-bar">
            <div 
              class="boot-progress"
              :style="{ width: progress + '%' }"
            ></div>
            <div class="progress-glow" :style="{ left: progress + '%' }"></div>
          </div>
          
          <!-- Status Indicators -->
          <div class="status-indicators">
            <div class="status-light" :class="{ active: progress > 20 }">CORE</div>
            <div class="status-light" :class="{ active: progress > 40 }">NET</div>
            <div class="status-light" :class="{ active: progress > 60 }">SEC</div>
            <div class="status-light" :class="{ active: progress > 80 }">UI</div>
            <div class="status-light" :class="{ active: isBootComplete }">RDY</div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="boot-footer">
        <div class="footer-info">
          <span>MATRIX OS © 2025 | QUANTUM COMPUTING DIVISION</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boot-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
  overflow: hidden;
}

.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.scanline {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.6), transparent);
  animation: scanline-glow 2s ease-in-out infinite;
}

.particle {
  position: absolute;
  background: rgba(0, 255, 0, 0.8);
  border-radius: 50%;
  animation: particle-glow 3s ease-in-out infinite;
}

.boot-container {
  width: 100%;
  max-width: 900px;
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 20, 0, 0.95) 100%);
  border: 3px solid var(--primary-green);
  border-radius: 15px;
  box-shadow: 
    0 0 50px rgba(0, 255, 0, 0.5),
    inset 0 0 50px rgba(0, 255, 0, 0.05);
  position: relative;
  z-index: 2;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.boot-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 4px,
      rgba(0, 255, 0, 0.03) 4px,
      rgba(0, 255, 0, 0.03) 8px
    );
  pointer-events: none;
}

.boot-header {
  padding: 30px 30px 20px;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
  text-align: center;
}

.boot-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 900;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.title-brackets {
  color: var(--accent-cyan);
  animation: bracket-pulse 2s ease-in-out infinite;
}

.title-text {
  color: var(--primary-green);
  text-shadow: 0 0 20px var(--primary-green);
}

.title-version {
  font-size: 0.6em;
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.boot-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: var(--accent-cyan);
  font-size: clamp(12px, 2.5vw, 16px);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.subtitle-icon {
  animation: icon-pulse 1.5s ease-in-out infinite;
}

.system-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(10px, 2vw, 12px);
}

.stat-label {
  color: var(--accent-cyan);
  font-weight: 600;
  width: 30px;
}

.stat-bar {
  flex: 1;
  height: 8px;
  background: rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-green), var(--accent-cyan));
  transition: width 0.3s ease;
  animation: stat-glow 2s ease-in-out infinite;
}

.stat-value {
  color: var(--primary-green);
  font-weight: 600;
  width: 35px;
  text-align: right;
}

.boot-content {
  padding: 20px 30px;
}

.boot-messages {
  height: 300px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: clamp(11px, 2vw, 14px);
  scrollbar-width: thin;
  scrollbar-color: var(--primary-green) transparent;
}

.boot-messages::-webkit-scrollbar {
  width: 8px;
}

.boot-messages::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

.boot-messages::-webkit-scrollbar-thumb {
  background: var(--primary-green);
  border-radius: 4px;
}

.boot-message {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(0, 255, 0, 0.02);
  animation: message-appear 0.3s ease-out;
  line-height: 1.4;
  flex-wrap: wrap;
}

.message-timestamp {
  color: var(--accent-cyan);
  font-size: 0.85em;
  opacity: 0.8;
  min-width: fit-content;
}

.message-prefix {
  color: var(--primary-green);
  font-weight: bold;
}

.message-text {
  flex: 1;
  min-width: 200px;
}

.message-status {
  font-size: 1.1em;
  margin-left: auto;
}

.boot-progress-section {
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: clamp(12px, 2.5vw, 14px);
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-percentage {
  color: var(--primary-green);
  font-weight: bold;
  font-family: 'Orbitron', monospace;
}

.boot-progress-bar {
  width: 100%;
  height: 20px;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid var(--primary-green);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 15px;
}

.boot-progress {
  height: 100%;
  background: 
    linear-gradient(90deg, var(--primary-green) 0%, var(--accent-cyan) 50%, var(--primary-green) 100%);
  transition: width 0.4s ease-out;
  position: relative;
  animation: progress-glow 2s ease-in-out infinite;
}

.boot-progress::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 8px,
      rgba(255, 255, 255, 0.2) 8px,
      rgba(255, 255, 255, 0.2) 16px
    );
  animation: progress-scan 1.5s linear infinite;
}

.progress-glow {
  position: absolute;
  top: -2px;
  width: 6px;
  height: calc(100% + 4px);
  background: rgba(255, 255, 255, 0.8);
  filter: blur(2px);
  transition: left 0.4s ease-out;
  animation: glow-pulse 1s ease-in-out infinite;
}

.status-indicators {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.status-light {
  flex: 1;
  padding: 8px;
  text-align: center;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
  font-size: clamp(10px, 2vw, 12px);
  color: rgba(0, 255, 0, 0.5);
  transition: all 0.3s ease;
}

.status-light.active {
  background: rgba(0, 255, 0, 0.2);
  border-color: var(--primary-green);
  color: var(--primary-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  text-shadow: 0 0 5px var(--primary-green);
}

.boot-footer {
  padding: 15px 30px;
  border-top: 1px solid rgba(0, 255, 0, 0.3);
  text-align: center;
}

.footer-info {
  font-size: clamp(10px, 2vw, 12px);
  color: rgba(0, 255, 0, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Animations */
@keyframes bracket-pulse {
  0%, 100% { 
    opacity: 0.8; 
    text-shadow: 0 0 10px var(--accent-cyan);
  }
  50% { 
    opacity: 1; 
    text-shadow: 0 0 20px var(--accent-cyan);
  }
}

@keyframes icon-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes scanline-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes particle-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes stat-glow {
  0%, 100% { box-shadow: 0 0 5px var(--primary-green); }
  50% { box-shadow: 0 0 15px var(--primary-green); }
}

@keyframes message-appear {
  from { 
    opacity: 0; 
    transform: translateX(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes progress-glow {
  0%, 100% { 
    box-shadow: 0 0 10px var(--primary-green); 
  }
  50% { 
    box-shadow: 0 0 20px var(--primary-green), 0 0 30px var(--accent-cyan); 
  }
}

@keyframes progress-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .boot-container {
    margin: 10px;
    max-width: calc(100% - 20px);
  }
  
  .boot-header {
    padding: 20px 20px 15px;
  }
  
  .boot-content {
    padding: 15px 20px;
  }
  
  .boot-messages {
    height: 250px;
    font-size: 12px;
  }
  
  .system-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .status-indicators {
    flex-wrap: wrap;
  }
  
  .boot-message {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .message-timestamp {
    order: -1;
  }
}

@media (max-width: 480px) {
  .boot-screen {
    padding: 10px;
  }
  
  .boot-title {
    flex-direction: column;
    gap: 10px;
  }
  
  .system-stats {
    grid-template-columns: 1fr;
  }
  
  .boot-messages {
    height: 200px;
    padding: 10px;
  }
  
  .status-indicators {
    grid-template-columns: repeat(3, 1fr);
    display: grid;
  }
}

@media (max-height: 600px) {
  .boot-messages {
    height: 180px;
  }
  
  .boot-header {
    padding: 15px 20px 10px;
  }
  
  .boot-content {
    padding: 10px 20px;
  }
}
</style>
