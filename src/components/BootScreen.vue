<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['bootComplete']);

const bootMessages = [
  { text: 'INITIALIZING ROCKERSPACE MATRIX...', type: 'info', delay: 250 },
  { text: 'LOADING QUANTUM NEURAL CORES...', type: 'info', delay: 200 },
  { text: 'ESTABLISHING ENCRYPTED CHANNELS...', type: 'success', delay: 180 },
  { text: 'CALIBRATING BIOMETRIC SCANNERS...', type: 'info', delay: 220 },
  { text: 'DECRYPTING CLASSIFIED PROTOCOLS...', type: 'warning', delay: 300 },
  { text: 'SYNCHRONIZING SATELLITE NETWORKS...', type: 'info', delay: 190 },
  { text: 'ACTIVATING ROCKERSPACE FIREWALL...', type: 'success', delay: 240 },
  { text: 'LOADING AI ASSISTANCE MODULES...', type: 'info', delay: 210 },
  { text: 'VERIFYING DIGITAL SIGNATURES...', type: 'success', delay: 260 },
  { text: 'INITIALIZING HOLOGRAPHIC INTERFACE...', type: 'info', delay: 200 },
  { text: 'ESTABLISHING ROCKERSPACE MATRIX...', type: 'success', delay: 280 },
  { text: 'LOADING USER PROFILE: BHAVISHY AGRAWAL...', type: 'special', delay: 350 },
  { text: 'ROCKERSPACE AUTHENTICATION SUCCESSFUL...', type: 'success', delay: 300 },
  { text: 'WELCOME TO ROCKERSPACE TERMINAL...', type: 'complete', delay: 400 }
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
const rockerSpaceText = ref('ROCKERSPACE');

onMounted(() => {
  startBootSequence();
  initializeEffects();
  animateRockerSpaceText();
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
    'CHECKING ROCKERSPACE HARDWARE INTEGRITY...',
    'VERIFYING SYSTEM COMPATIBILITY...',
    'INITIALIZING ROCKERSPACE CORE SYSTEMS...'
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
    text: 'ROCKERSPACE SYSTEM INITIALIZATION COMPLETE',
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
  for (let i = 0; i < 8; i++) {
    scanlines.value.push({
      id: i,
      top: Math.random() * 100,
      speed: Math.random() * 3 + 1
    });
  }
  
  // Initialize particles
  for (let i = 0; i < 30; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8
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

function animateRockerSpaceText() {
  const text = 'ROCKERSPACE';
  let index = 0;
  
  const interval = setInterval(() => {
    if (index <= text.length) {
      rockerSpaceText.value = text.slice(0, index) + (index < text.length ? '_' : '');
      index++;
    } else {
      rockerSpaceText.value = text;
      clearInterval(interval);
    }
  }, 150);
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
      <!-- Enhanced Scanlines -->
      <div 
        v-for="line in scanlines" 
        :key="line.id"
        class="scanline"
        :style="{ top: line.top + '%' }"
      ></div>
      
      <!-- Enhanced Particles -->
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
      
      <!-- Matrix Rain Effect -->
      <div class="matrix-rain">
        <div v-for="i in 20" :key="i" class="matrix-column" :style="{ left: (i * 5) + '%' }">
          <div class="matrix-char" v-for="j in 10" :key="j">{{ Math.random() > 0.5 ? '1' : '0' }}</div>
        </div>
      </div>
    </div>
    
    <div class="boot-container">
      <!-- Header Section -->
      <div class="boot-header">
        <!-- Large ROCKERSPACE Title -->
        <div class="rockerspace-title">
          <div class="rockerspace-main">{{ rockerSpaceText }}</div>
          <div class="rockerspace-subtitle">ROCKER OS v28.01.06</div>
        </div>
        
        <div class="boot-subtitle">
          <span class="subtitle-icon">◆</span>
          <span class="subtitle-text">ENTERING INTO ROCKERSPACE</span>
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
            <span>ROCKERSPACE BOOT PROGRESS</span>
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
          <span>ROCKERSPACE OS © 2025 | QUANTUM COMPUTING DIVISION | BHAVISHY AGRAWAL</span>
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
    radial-gradient(circle at 25% 25%, rgba(0, 255, 0, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.08) 0%, transparent 70%),
    linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001100 100%);
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
  height: 3px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(0, 255, 0, 0.8) 20%, 
    rgba(0, 255, 255, 0.6) 50%, 
    rgba(0, 255, 0, 0.8) 80%, 
    transparent
  );
  animation: scanline-glow 3s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(0, 255, 0, 1) 0%, rgba(0, 255, 0, 0.8) 50%, transparent 100%);
  border-radius: 50%;
  animation: particle-glow 4s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.8);
}

.matrix-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.1;
}

.matrix-column {
  position: absolute;
  top: -100%;
  font-size: 14px;
  color: var(--primary-green);
  animation: matrix-fall 10s linear infinite;
}

.matrix-char {
  display: block;
  line-height: 1.2;
  animation: matrix-flicker 0.5s infinite;
}

.boot-container {
  width: 100%;
  max-width: 1000px;
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 20, 0, 0.98) 50%, rgba(0, 0, 0, 0.98) 100%);
  border: 3px solid var(--primary-green);
  border-radius: 20px;
  box-shadow: 
    0 0 60px rgba(0, 255, 0, 0.6),
    inset 0 0 60px rgba(0, 255, 0, 0.05),
    0 0 120px rgba(0, 255, 0, 0.3);
  position: relative;
  z-index: 2;
  overflow: hidden;
  backdrop-filter: blur(15px);
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
      45deg,
      transparent,
      transparent 2px,
      rgba(0, 255, 0, 0.05) 2px,
      rgba(0, 255, 0, 0.05) 4px
    );
  pointer-events: none;
  animation: background-scan 15s linear infinite;
}

.boot-header {
  padding: 40px 40px 30px;
  border-bottom: 2px solid rgba(0, 255, 0, 0.4);
  text-align: center;
  position: relative;
}

.rockerspace-title {
  margin-bottom: 25px;
}

.rockerspace-main {
  font-family: 'Orbitron', monospace;
  font-size: clamp(32px, 8vw, 72px);
  font-weight: 900;
  color: var(--primary-green);
  text-shadow: 
    0 0 20px var(--primary-green),
    0 0 40px var(--primary-green),
    0 0 60px var(--primary-green),
    0 0 80px var(--primary-green);
  letter-spacing: 8px;
  text-transform: uppercase;
  animation: rockerspace-glow 3s ease-in-out infinite;
  position: relative;
}

.rockerspace-main::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 2px;
  color: var(--accent-cyan);
  z-index: -1;
  animation: glitch-1 0.3s infinite;
}

.rockerspace-main::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: -2px;
  color: var(--neon-pink);
  z-index: -2;
  animation: glitch-2 0.3s infinite;
}

.rockerspace-subtitle {
  font-size: clamp(14px, 3vw, 24px);
  color: var(--accent-cyan);
  font-weight: 600;
  letter-spacing: 3px;
  margin-top: 10px;
  text-shadow: 0 0 15px var(--accent-cyan);
}

.boot-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--accent-cyan);
  font-size: clamp(12px, 2.5vw, 18px);
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.subtitle-icon {
  animation: icon-pulse 2s ease-in-out infinite;
  font-size: 1.2em;
}

.system-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(11px, 2.2vw, 14px);
  background: rgba(0, 255, 0, 0.05);
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 0, 0.2);
}

.stat-label {
  color: var(--accent-cyan);
  font-weight: 700;
  width: 35px;
  text-shadow: 0 0 8px var(--accent-cyan);
}

.stat-bar {
  flex: 1;
  height: 10px;
  background: rgba(0, 255, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 0, 0.4);
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-green), var(--accent-cyan), var(--primary-green));
  transition: width 0.5s ease;
  animation: stat-glow 2.5s ease-in-out infinite;
  box-shadow: 0 0 10px var(--primary-green);
}

.stat-value {
  color: var(--primary-green);
  font-weight: 700;
  width: 40px;
  text-align: right;
  text-shadow: 0 0 8px var(--primary-green);
}

.boot-content {
  padding: 25px 40px;
}

.boot-messages {
  height: 320px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 255, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  font-size: clamp(12px, 2.2vw, 15px);
  scrollbar-width: thin;
  scrollbar-color: var(--primary-green) transparent;
  box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.1);
}

.boot-messages::-webkit-scrollbar {
  width: 10px;
}

.boot-messages::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

.boot-messages::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--primary-green), var(--accent-cyan));
  border-radius: 5px;
  box-shadow: 0 0 10px var(--primary-green);
}

.boot-message {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(0, 255, 0, 0.03);
  animation: message-appear 0.5s ease-out;
  line-height: 1.5;
  flex-wrap: wrap;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.boot-message:hover {
  background: rgba(0, 255, 0, 0.08);
  border-left-color: var(--primary-green);
}

.message-timestamp {
  color: var(--accent-cyan);
  font-size: 0.9em;
  opacity: 0.9;
  min-width: fit-content;
  font-weight: 600;
}

.message-prefix {
  color: var(--primary-green);
  font-weight: bold;
  font-size: 1.1em;
}

.message-text {
  flex: 1;
  min-width: 200px;
  font-weight: 500;
}

.message-status {
  font-size: 1.2em;
  margin-left: auto;
  animation: status-pulse 2s ease-in-out infinite;
}

.boot-progress-section {
  background: rgba(0, 255, 0, 0.03);
  border: 2px solid rgba(0, 255, 0, 0.3);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: clamp(13px, 2.8vw, 16px);
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.progress-percentage {
  color: var(--primary-green);
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  font-size: 1.2em;
  text-shadow: 0 0 10px var(--primary-green);
}

.boot-progress-bar {
  width: 100%;
  height: 25px;
  background: rgba(0, 255, 0, 0.15);
  border: 3px solid var(--primary-green);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  box-shadow: 
    0 0 20px rgba(0, 255, 0, 0.4),
    inset 0 0 20px rgba(0, 255, 0, 0.1);
}

.boot-progress {
  height: 100%;
  background: 
    linear-gradient(90deg, 
      var(--primary-green) 0%, 
      var(--accent-cyan) 30%, 
      var(--neon-pink) 60%, 
      var(--primary-green) 100%
    );
  transition: width 0.6s ease-out;
  position: relative;
  animation: progress-glow 2.5s ease-in-out infinite;
  box-shadow: 0 0 25px var(--primary-green);
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
      transparent 10px,
      rgba(255, 255, 255, 0.3) 10px,
      rgba(255, 255, 255, 0.3) 20px
    );
  animation: progress-scan 2s linear infinite;
}

.progress-glow {
  position: absolute;
  top: -3px;
  width: 8px;
  height: calc(100% + 6px);
  background: rgba(255, 255, 255, 0.9);
  filter: blur(3px);
  transition: left 0.6s ease-out;
  animation: glow-pulse 1.5s ease-in-out infinite;
}

.status-indicators {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.status-light {
  flex: 1;
  padding: 10px;
  text-align: center;
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid rgba(0, 255, 0, 0.3);
  border-radius: 6px;
  font-size: clamp(10px, 2vw, 13px);
  color: rgba(0, 255, 0, 0.6);
  transition: all 0.4s ease;
  font-weight: 700;
  letter-spacing: 1px;
}

.status-light.active {
  background: rgba(0, 255, 0, 0.25);
  border-color: var(--primary-green);
  color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  text-shadow: 0 0 8px var(--primary-green);
  transform: translateY(-2px);
}

.boot-footer {
  padding: 20px 40px;
  border-top: 2px solid rgba(0, 255, 0, 0.4);
  text-align: center;
}

.footer-info {
  font-size: clamp(10px, 2vw, 13px);
  color: rgba(0, 255, 0, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

/* Enhanced Animations */
@keyframes rockerspace-glow {
  0%, 100% { 
    text-shadow: 
      0 0 20px var(--primary-green),
      0 0 40px var(--primary-green),
      0 0 60px var(--primary-green);
  }
  50% { 
    text-shadow: 
      0 0 30px var(--primary-green),
      0 0 60px var(--primary-green),
      0 0 90px var(--primary-green),
      0 0 120px var(--accent-cyan);
  }
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(-2px, 2px); }
}

@keyframes icon-pulse {
  0%, 100% { 
    opacity: 0.7; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.1);
  }
}

@keyframes scanline-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@keyframes particle-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes matrix-fall {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes matrix-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes background-scan {
  0% { transform: translateX(-100%) translateY(-100%); }
  100% { transform: translateX(100%) translateY(100%); }
}

@keyframes stat-glow {
  0%, 100% { 
    box-shadow: 0 0 10px var(--primary-green); 
  }
  50% { 
    box-shadow: 0 0 20px var(--primary-green), 0 0 30px var(--accent-cyan); 
  }
}

@keyframes message-appear {
  from { 
    opacity: 0; 
    transform: translateX(-30px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

@keyframes status-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes progress-glow {
  0%, 100% { 
    box-shadow: 0 0 25px var(--primary-green); 
  }
  50% { 
    box-shadow: 0 0 40px var(--primary-green), 0 0 60px var(--accent-cyan); 
  }
}

@keyframes progress-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .boot-container {
    margin: 10px;
    max-width: calc(100% - 20px);
  }
  
  .boot-header {
    padding: 25px 25px 20px;
  }
  
  .boot-content {
    padding: 20px 25px;
  }
  
  .boot-messages {
    height: 280px;
    padding: 15px;
  }
  
  .system-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .status-indicators {
    flex-wrap: wrap;
  }
  
  .boot-message {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .rockerspace-main {
    letter-spacing: 4px;
  }
}

@media (max-width: 480px) {
  .boot-screen {
    padding: 10px;
  }
  
  .rockerspace-title {
    margin-bottom: 20px;
  }
  
  .system-stats {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .boot-messages {
    height: 240px;
    padding: 12px;
  }
  
  .status-indicators {
    grid-template-columns: repeat(3, 1fr);
    display: grid;
  }
  
  .rockerspace-main {
    letter-spacing: 2px;
  }
}

@media (max-height: 600px) {
  .boot-messages {
    height: 200px;
  }
  
  .boot-header {
    padding: 20px 25px 15px;
  }
  
  .boot-content {
    padding: 15px 25px;
  }
}
</style>
