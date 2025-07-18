<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref(new Date());
const portfolioStats = ref({
  liveProjects: 4,
  visitors: 12,
  performance: 95
});

const scrollProgress = ref(0);
const systemStatus = ref('ONLINE');

const updateStats = () => {
  // Simple realistic updates
  portfolioStats.value.visitors = Math.floor(Math.random() * 20) + 5;
  portfolioStats.value.performance = Math.floor(Math.random() * 10) + 90;
};

const updateScrollProgress = () => {
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    const scrollTop = mainContent.scrollTop;
    const scrollHeight = mainContent.scrollHeight;
    const clientHeight = mainContent.clientHeight;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollProgress.value = isNaN(progress) ? 0 : Math.min(100, Math.max(0, progress));
  }
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

let timeInterval;
let statsInterval;

onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
  
  statsInterval = setInterval(updateStats, 3000);
  updateStats();
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
  }
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (statsInterval) clearInterval(statsInterval);
  
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.removeEventListener('scroll', updateScrollProgress);
  }
});
</script>

<template>
  <div class="system-status-bar">
    <!-- Left Section -->
    <div class="status-left">
      <div class="status-item">
        <div class="status-light online"></div>
        <span>{{ systemStatus }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">PROJECTS:</span>
        <span class="status-value">{{ portfolioStats.liveProjects }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">VISITORS:</span>
        <span class="status-value">{{ portfolioStats.visitors }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">PERFORMANCE:</span>
        <span class="status-value">{{ portfolioStats.performance }}%</span>
        <div class="status-graph">
          <div 
            v-for="i in 5" 
            :key="i"
            class="status-graph-bar"
            :style="{ height: Math.random() * 100 + '%' }"
          ></div>
        </div>
      </div>
      
      <div class="status-item">
        <span class="status-label">SCROLL:</span>
        <div class="scroll-indicator">
          <div 
            class="scroll-progress"
            :style="{ height: scrollProgress + '%' }"
          ></div>
        </div>
        <span class="status-value">{{ Math.round(scrollProgress) }}%</span>
      </div>
    </div>
    
    <!-- Right Section -->
    <div class="status-right">
      <div class="status-item">
        <span class="status-label">{{ formatDate(currentTime) }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-value">{{ formatTime(currentTime) }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">IST</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">IIT JODHPUR</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-status-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--status-height);
  background: 
    linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 15, 0, 0.95) 50%, rgba(0, 0, 0, 0.95) 100%);
  border-top: 3px solid var(--primary-green);
  color: var(--primary-green);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xl);
  font-family: var(--font-primary);
  font-size: 12px;
  backdrop-filter: blur(20px) saturate(180%);
  z-index: var(--z-status);
  box-shadow: 
    0 0 30px rgba(0, 0, 0, 0.9),
    0 0 60px rgba(0, 255, 0, 0.2),
    inset 0 -1px 0 rgba(0, 255, 0, 0.1);
}

.system-status-bar::before {
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
      transparent 3px,
      rgba(0, 255, 0, 0.08) 3px,
      rgba(0, 255, 0, 0.08) 6px
    );
  pointer-events: none;
  animation: data-stream 10s linear infinite reverse;
}

.system-status-bar::after {
  content: "";
  position: absolute;
  top: -3px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--primary-green) 50%, transparent);
  animation: status-pulse 4s ease-in-out infinite;
}

.status-left, .status-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  z-index: 1;
}

.status-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--spacing-xs);
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
}

.status-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent);
  transition: left 0.8s ease;
}

.status-item:hover::before {
  left: 100%;
}

.status-item:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
  transform: translateY(-1px);
}

.status-light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 10px currentColor;
}

.status-light::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: inherit;
  filter: blur(3px);
  opacity: 0.6;
  animation: pulse-glow 2s ease-in-out infinite;
}

.status-light.online {
  background: var(--primary-green);
  color: var(--primary-green);
}

.status-label {
  font-size: 10px;
  color: var(--accent-cyan);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-green);
}

.status-graph {
  width: 40px;
  height: 16px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 3px;
  padding: 2px;
  display: flex;
  align-items: end;
  gap: 1px;
  overflow: hidden;
}

.status-graph-bar {
  flex: 1;
  background: linear-gradient(180deg, var(--primary-green) 0%, var(--accent-cyan) 100%);
  box-shadow: 0 0 5px var(--primary-green);
  border-radius: 1px;
  animation: data-pulse 2s infinite;
  transition: all var(--transition-speed) ease;
}

.status-graph-bar:nth-child(even) {
  animation-delay: 0.3s;
}

.status-graph-bar:nth-child(3n) {
  animation-delay: 0.6s;
}

.scroll-indicator {
  width: 20px;
  height: 16px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.scroll-progress {
  width: 100%;
  background: linear-gradient(180deg, var(--primary-green) 0%, var(--accent-cyan) 100%);
  transition: height 0.2s ease;
  position: absolute;
  bottom: 0;
  left: 0;
}

/* Animations */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes data-pulse {
  0%, 100% { height: 40%; }
  50% { height: 90%; }
}

@keyframes data-stream {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes status-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .status-left, .status-right {
    gap: var(--spacing-md);
  }
  
  .system-status-bar {
    padding: 0 var(--spacing-md);
    font-size: 10px;
  }
  
  .status-item {
    padding: var(--spacing-xs);
    gap: var(--spacing-xs);
  }
  
  .status-label {
    font-size: 9px;
  }
  
  .status-value {
    font-size: 10px;
  }
  
  .status-graph {
    width: 30px;
    height: 12px;
  }
  
  .scroll-indicator {
    width: 16px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .status-left, .status-right {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .system-status-bar {
    height: 60px;
    padding: var(--spacing-sm);
  }
  
  .status-item {
    min-width: 60px;
    justify-content: center;
  }
}
</style>
