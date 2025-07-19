<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  sections: Array,
  activeSection: String
});

const emit = defineEmits(['navigate']);

const currentTime = ref(new Date());

const navigateToSection = (sectionId) => {
  console.log('Nav clicked:', sectionId); // Debug log
  emit('navigate', sectionId);
};

const navigateToHome = () => {
  emit('navigate', 'about');
};

const downloadResume = () => {
  window.open('https://drive.google.com/file/d/1oQTJAIJr8HcoY_ZZSJf4V-BcGVaWnz4p/view?usp=drive_link', '_blank');
};

const updateTime = () => {
  currentTime.value = new Date();
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
};

let timeInterval;

onMounted(() => {
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<template>
  <nav class="nav-bar">
    <div class="nav-logo" @click="navigateToHome">
      <a href="https://rockerspace.vercel.app/">
        ROCKERSPACE
      </a>
    </div>
    
    <div class="nav-menu">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="navigateToSection(section.id)"
        :class="[
          'nav-item',
          { 'active': activeSection === section.id }
        ]"
        :title="section.description"
      >
        {{ section.name }}
      </button>
      
      <button
        @click="downloadResume"
        class="nav-item resume-button"
        title="Download Resume"
      >
        <span class="resume-icon">📄</span>
        RESUME
      </button>
    </div>
    
    <div class="nav-time">{{ formatTime(currentTime) }}</div>
  </nav>
</template>

<style scoped>
.nav-logo {
  transition: all 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
  text-shadow: 
    0 0 30px var(--primary-green),
    0 0 60px var(--primary-green);
}

.resume-button {
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
  border-color: var(--accent-cyan) !important;
  color: var(--accent-cyan) !important;
  display: flex;
  align-items: center;
  gap: 8px;
}

.resume-button:hover {
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
}

.resume-icon {
  font-size: 16px;
  filter: brightness(0) saturate(100%) invert(50%) sepia(100%) saturate(1000%) hue-rotate(180deg);
}

.nav-time {
  color: var(--accent-cyan);
  font-weight: 600;
  padding: 6px 12px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
</style>
