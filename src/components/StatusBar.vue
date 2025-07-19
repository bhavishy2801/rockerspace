<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref(new Date());
const portfolioStats = ref({
  liveProjects: 4,
  totalViews: 0,
  sessionDuration: 0,
  currentVisitors: 1, // Current user
  lastUpdate: new Date(),
  systemUptime: 0
});

const scrollProgress = ref(0);
const systemStatus = ref('ONLINE');
const sessionStartTime = ref(new Date());

// Real analytics functions
const getStoredStats = () => {
  const stored = localStorage.getItem('portfolio-stats');
  if (stored) {
    const stats = JSON.parse(stored);
    return {
      totalViews: stats.totalViews || 0,
      lastVisit: stats.lastVisit ? new Date(stats.lastVisit) : new Date()
    };
  }
  return { totalViews: 0, lastVisit: new Date() };
};

const updateStoredStats = () => {
  const stored = getStoredStats();
  const newStats = {
    totalViews: stored.totalViews + 1,
    lastVisit: new Date().toISOString()
  };
  localStorage.setItem('portfolio-stats', JSON.stringify(newStats));
  portfolioStats.value.totalViews = newStats.totalViews;
};

const calculateSessionDuration = () => {
  const now = new Date();
  const duration = Math.floor((now - sessionStartTime.value) / 1000);
  portfolioStats.value.sessionDuration = duration;
};

const calculateUptime = () => {
  // Portfolio "uptime" since deployment (you can adjust this date)
  const deploymentDate = new Date('2025-07-15'); // Adjust to your actual deployment date
  const now = new Date();
  const uptimeMs = now - deploymentDate;
  portfolioStats.value.systemUptime = Math.floor(uptimeMs / (1000 * 60 * 60 * 24)); // Days
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
    minute: '2-digit',
    second: '2-digit'
  });
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

// Real-time visitor simulation (you can integrate with Google Analytics API)
const simulateRealTimeVisitors = () => {
  // Simulate 1-8 concurrent visitors based on time of day
  const hour = new Date().getHours();
  let baseVisitors = 1;
  
  // More visitors during business hours
  if (hour >= 9 && hour <= 17) {
    baseVisitors = Math.floor(Math.random() * 5) + 2;
  } else if (hour >= 18 && hour <= 22) {
    baseVisitors = Math.floor(Math.random() * 3) + 1;
  }
  
  portfolioStats.value.currentVisitors = baseVisitors;
};

let timeInterval;
let statsInterval;
let durationInterval;

onMounted(() => {
  // Initialize stats
  const stored = getStoredStats();
  portfolioStats.value.totalViews = stored.totalViews;
  updateStoredStats(); // Increment view count
  calculateUptime();
  
  // Set up intervals
  timeInterval = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
  
  durationInterval = setInterval(() => {
    calculateSessionDuration();
  }, 1000);
  
  statsInterval = setInterval(() => {
    simulateRealTimeVisitors();
    calculateUptime();
  }, 5000);
  
  simulateRealTimeVisitors();
  
  // Scroll progress
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
  }
  
  // Page visibility API to track when user leaves/returns
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      sessionStartTime.value = new Date();
    }
  });
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (statsInterval) clearInterval(statsInterval);
  if (durationInterval) clearInterval(durationInterval);
  
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
        <span class="status-label">LIVE PROJECTS:</span>
        <span class="status-value">{{ portfolioStats.liveProjects }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">TOTAL VIEWS:</span>
        <span class="status-value">{{ portfolioStats.totalViews.toLocaleString() }}</span>
      </div>
      
      <div class="status-item">
        <span class="status-label">ACTIVE USERS:</span>
        <span class="status-value">{{ portfolioStats.currentVisitors }}</span>
        <div class="visitor-indicator">
          <div 
            v-for="i in Math.min(portfolioStats.currentVisitors, 5)" 
            :key="i"
            class="visitor-dot"
            :style="{ animationDelay: (i * 0.2) + 's' }"
          ></div>
        </div>
      </div>
      
      <div class="status-item">
        <span class="status-label">SESSION:</span>
        <span class="status-value">{{ formatDuration(portfolioStats.sessionDuration) }}</span>
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
        <span class="status-label">UPTIME:</span>
        <span class="status-value">{{ portfolioStats.systemUptime }}d</span>
      </div>
      
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

.visitor-indicator {
  display: flex;
  gap: 2px;
}

.visitor-dot {
  width: 6px;
  height: 6px;
  background: var(--primary-green);
  border-radius: 50%;
  animation: visitor-pulse 2s ease-in-out infinite;
  box-shadow: 0 0 5px var(--primary-green);
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

@keyframes visitor-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
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
  
  .scroll-indicator {
    width: 16px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .status-left, .status-right {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  
  .system-status-bar {
    height: auto;
    min-height: var(--status-height);
    padding: var(--spacing-sm);
  }
  
  .status-item {
    min-width: 60px;
    justify-content: center;
  }
}
</style>
