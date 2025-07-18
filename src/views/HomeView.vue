<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import BackgroundCanvas from '../components/BackgroundCanvas.vue';
import NavigationBar from '../components/NavigationBar.vue';
import StatusBar from '../components/StatusBar.vue';
import BootScreen from '../components/BootScreen.vue';

// Import enhanced content components
import AboutContent from '../components/content/AboutContent.vue';
import ProjectsContent from '../components/content/ProjectsContent.vue';
import ContactContent from '../components/content/ContactContent.vue';
import SkillsContent from '../components/content/SkillsContent.vue';
import ExperienceContent from '../components/content/ExperienceContent.vue';

const showBootScreen = ref(true);
const activeSection = ref('about');
const isTransitioning = ref(false);
const transitionDirection = ref('right');

const sections = [
  { 
    id: 'about', 
    name: 'ABOUT', 
    component: AboutContent,
    description: 'Learn about my background and expertise'
  },
  { 
    id: 'portfolio', 
    name: 'PORTFOLIO', 
    component: ExperienceContent,
    description: 'Professional experience and career timeline'
  },
  { 
    id: 'projects', 
    name: 'PROJECTS', 
    component: ProjectsContent,
    description: 'Featured projects and applications'
  },
  { 
    id: 'skills', 
    name: 'SKILLS', 
    component: SkillsContent,
    description: 'Technical skills and proficiency levels'
  },
  { 
    id: 'contact', 
    name: 'CONTACT', 
    component: ContactContent,
    description: 'Get in touch and connect with me'
  }
];

function onBootComplete() {
  showBootScreen.value = false;
  setTimeout(() => {
    activeSection.value = 'about';
  }, 300);
}

async function navigateToSection(sectionId) {
  if (isTransitioning.value || sectionId === activeSection.value) return;
  
  console.log('Navigating to:', sectionId);
  
  // Determine transition direction
  const currentIndex = sections.findIndex(s => s.id === activeSection.value);
  const nextIndex = sections.findIndex(s => s.id === sectionId);
  transitionDirection.value = nextIndex > currentIndex ? 'right' : 'left';
  
  isTransitioning.value = true;
  
  // Add transitioning class to main content
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.classList.add('transitioning');
  }
  
  // Wait for transition to start
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Change active section
  activeSection.value = sectionId;
  
  // Wait for transition to complete
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Remove transition classes
  if (mainContent) {
    mainContent.classList.remove('transitioning');
  }
  
  isTransitioning.value = false;
  
  // Scroll to top
  nextTick(() => {
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  });
}

// Handle keyboard shortcuts
const handleKeydown = (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case '1':
        e.preventDefault();
        navigateToSection('about');
        break;
      case '2':
        e.preventDefault();
        navigateToSection('portfolio');
        break;
      case '3':
        e.preventDefault();
        navigateToSection('projects');
        break;
      case '4':
        e.preventDefault();
        navigateToSection('skills');
        break;
      case '5':
        e.preventDefault();
        navigateToSection('contact');
        break;
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div id="app">
    <BootScreen v-if="showBootScreen" @bootComplete="onBootComplete" />
    
    <template v-else>
      <BackgroundCanvas />
      
      <NavigationBar 
        :sections="sections"
        :active-section="activeSection"
        @navigate="navigateToSection"
      />
      
      <main class="main-content" :class="{ transitioning: isTransitioning }">
        <Transition 
          :name="transitionDirection === 'right' ? 'slide-right' : 'slide-left'" 
          mode="out-in"
          appear
        >
          <div 
            :key="activeSection"
            class="content-section"
          >
            <component :is="sections.find(s => s.id === activeSection)?.component" />
          </div>
        </Transition>
      </main>
      
      <StatusBar />
    </template>
  </div>
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* Slide Right Transitions */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-right-enter-from {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
  filter: blur(5px);
}

.slide-right-leave-to {
  transform: translateX(-100%) scale(0.95);
  opacity: 0;
  filter: blur(5px);
}

/* Slide Left Transitions */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-left-enter-from {
  transform: translateX(-100%) scale(0.95);
  opacity: 0;
  filter: blur(5px);
}

.slide-left-leave-to {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
  filter: blur(5px);
}

/* Content section base styles */
.content-section {
  animation: contentFadeIn 0.8s ease-out;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
