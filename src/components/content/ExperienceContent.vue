<script setup>
import { ref, computed } from 'vue';

const experiences = ref([
  // {
  //   id: 1,
  //   title: 'Senior Full-Stack Developer',
  //   company: 'Tech Innovations Lab',
  //   duration: '2024 - Present',
  //   location: 'Remote',
  //   type: 'Full-time',
  //   status: 'ACTIVE',
  //   description: 'Leading development of scalable web applications using modern technologies. Specializing in React, Node.js, and cloud infrastructure.',
  //   achievements: [
  //     'Developed advanced media viewers with double-tap controls and resume playback functionality',
  //     'Built comprehensive analytics platforms integrated with Google Cloud and Firebase',
  //     'Optimized application performance by 40% through advanced caching strategies',
  //     'Led a team of 5 developers in delivering critical product features',
  //     'Implemented CI/CD pipelines reducing deployment time by 60%'
  //   ],
  //   technologies: ['React', 'Node.js', 'TypeScript', 'Google Cloud', 'Firebase', 'Docker'],
  //   classification: 'HIGH-PRIORITY'
  // },
  // {
  //   id: 2,
  //   title: 'Full-Stack Developer',
  //   company: 'Digital Solutions Inc',
  //   duration: '2023 - 2024',
  //   location: 'Hybrid',
  //   type: 'Full-time',
  //   status: 'COMPLETED',
  //   description: 'Developed and maintained multiple web applications focusing on user experience and performance optimization.',
  //   achievements: [
  //     'Created responsive web applications serving 10,000+ active users',
  //     'Implemented real-time chat systems using Socket.io and WebRTC',
  //     'Developed RESTful APIs with comprehensive authentication systems',
  //     'Reduced server response times by 35% through database optimization',
  //     'Mentored junior developers and conducted code reviews'
  //   ],
  //   technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Redis', 'AWS', 'Jest'],
  //   classification: 'MEDIUM-PRIORITY'
  // }
]);

const projects = ref([
  {
    id: 1,
    name: 'MichiKon',
    role: 'Founder | Developer',
    duration: '2025',
    description: 'Next-gen AI assistant with unmatched intelligence and limitless features',
    impact: 'Processed $2M+ in transactions, 5000+ active users',
    technologies: ['TensorFlow', 'Next.js', 'MongoDB', 'Whisper']
  },
  {
    id: 2,
    name: 'JEEzy',
    role: 'Founder | Developer',
    duration: '2025',
    description: 'AI-powered platform for JEE prep with notes, tests, analytics',
    impact: 'Processed $2M+ in transactions, 5000+ active users',
    technologies: ['Flutter', 'Firebase', 'React.js', 'Node.js']
  },
  {
    id: 3,
    name: 'WHISPR',
    role: 'Developer',
    duration: '2025',
    description: 'A minimalist messenger application completely made in C',
    impact: '10,000+ registered users, 50,000+ posts created',
    technologies: ['C', 'Socket Programming', 'Diffie-Hellmann']
  }
]);

const selectedExperience = ref(null);

const getStatusColor = (status) => {
  switch (status) {
    case 'ACTIVE': return 'text-green-400';
    case 'COMPLETED': return 'text-blue-400';
    case 'PENDING': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

const getClassificationColor = (classification) => {
  switch (classification) {
    case 'HIGH-PRIORITY': return 'text-red-400';
    case 'MEDIUM-PRIORITY': return 'text-yellow-400';
    case 'LOW-PRIORITY': return 'text-green-400';
    default: return 'text-gray-400';
  }
};

const totalExperience = computed(() => {
  return '404';
});

const totalProjects = computed(() => {
  return 4; // Including other projects
});

const openExperience = (experience) => {
  selectedExperience.value = experience;
};

const closeExperience = () => {
  selectedExperience.value = null;
};
</script>

<template>
  <div class="content-block">
    <h1>~$ tree ~/portfolio</h1>
    
    <!-- Experience Overview -->
    <div class="experience-overview">
      <div class="overview-stats">
        <div class="stat-card">
          <span class="stat-value">{{ totalExperience }}</span>
          <span class="stat-label">TOTAL EXPERIENCE</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ experiences.length }}</span>
          <span class="stat-label">POSITIONS HELD</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ totalProjects }}</span>
          <span class="stat-label">PROJECTS COMPLETED</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">15+</span>
          <span class="stat-label">TECHNOLOGIES USED</span>
        </div>
      </div>
    </div>

    <!-- Experience Timeline -->
    <!-- <div class="timeline-section">
      <h2>CAREER TIMELINE</h2>
      <div class="timeline">
        <div 
          v-for="(experience, index) in experiences" 
          :key="experience.id"
          class="timeline-item"
          @click="openExperience(experience)"
        >
          <div class="timeline-marker">
            <div class="timeline-dot" :class="getStatusColor(experience.status)"></div>
            <div v-if="index !== experiences.length - 1" class="timeline-line"></div>
          </div>
          
          <div class="timeline-content">
            <div class="timeline-header">
              <h3 class="timeline-title">{{ experience.title }}</h3>
              <span class="timeline-duration">{{ experience.duration }}</span>
            </div>
            
            <div class="timeline-company">
              <span class="company-name">{{ experience.company }}</span>
              <span class="company-location">{{ experience.location }}</span>
              <span class="company-type">{{ experience.type }}</span>
            </div>
            
            <p class="timeline-description">{{ experience.description }}</p>
            
            <div class="timeline-meta">
              <span class="timeline-status" :class="getStatusColor(experience.status)">
                ● {{ experience.status }}
              </span>
              <span class="timeline-classification" :class="getClassificationColor(experience.classification)">
                {{ experience.classification }}
              </span>
            </div>
            
            <div class="timeline-tech">
              <span 
                v-for="tech in experience.technologies.slice(0, 4)" 
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
              <span v-if="experience.technologies.length > 4" class="tech-more">
                +{{ experience.technologies.length - 4 }} more
              </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Key Projects -->
    <div class="projects-section">
      <h2>NOTABLE PROJECTS</h2>
      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="project-card"
        >
          <div class="project-header">
            <h3>{{ project.name }}</h3>
            <span class="project-duration">{{ project.duration }}</span>
          </div>
          
          <div class="project-role">{{ project.role }}</div>
          <p class="project-description">{{ project.description }}</p>
          
          <!-- <div class="project-impact">
            <span class="impact-label">IMPACT:</span>
            <span class="impact-value">{{ project.impact }}</span>
          </div> -->
          
          <div class="project-technologies">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="tech-chip"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Experience Detail Modal -->
    <div v-if="selectedExperience" class="experience-modal" @click="closeExperience">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedExperience.title }}</h2>
          <button @click="closeExperience" class="close-button">×</button>
        </div>
        
        <div class="modal-body">
          <div class="experience-details">
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">COMPANY:</span>
                <span class="detail-value">{{ selectedExperience.company }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">DURATION:</span>
                <span class="detail-value">{{ selectedExperience.duration }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">LOCATION:</span>
                <span class="detail-value">{{ selectedExperience.location }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">TYPE:</span>
                <span class="detail-value">{{ selectedExperience.type }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">STATUS:</span>
                <span class="detail-value" :class="getStatusColor(selectedExperience.status)">
                  {{ selectedExperience.status }}
                </span>
              </div>
              <div class="detail-item">
                <span class="detail-label">CLASSIFICATION:</span>
                <span class="detail-value" :class="getClassificationColor(selectedExperience.classification)">
                  {{ selectedExperience.classification }}
                </span>
              </div>
            </div>
            
            <div class="description-section">
              <h3>MISSION BRIEFING</h3>
              <p>{{ selectedExperience.description }}</p>
            </div>
            
            <div class="achievements-section">
              <h3>KEY ACHIEVEMENTS</h3>
              <ul class="achievements-list">
                <li v-for="achievement in selectedExperience.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            
            <div class="technologies-section">
              <h3>TECHNOLOGIES DEPLOYED</h3>
              <div class="tech-grid">
                <span 
                  v-for="tech in selectedExperience.technologies" 
                  :key="tech"
                  class="tech-item"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-overview {
  margin-bottom: 32px;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  row-gap: 16px;
  column-gap: 16px;
  padding: 20px 15px;
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

.stat-value {
  font-family: 'Orbitron', monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent-cyan);
  text-shadow: 0 0 15px var(--accent-cyan);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 12px;
  color: var(--primary-green);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'JetBrains Mono', monospace;
}

.timeline-section {
  margin-bottom: 40px;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline-item {
  display: flex;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.timeline-item:hover {
  transform: translateX(10px);
}

.timeline-marker {
  position: relative;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 10px currentColor;
  border: 2px solid rgba(0, 255, 0, 0.3);
  z-index: 1;
}

.timeline-line {
  width: 2px;
  height: 60px;
  background: rgba(0, 255, 0, 0.3);
  margin-top: 10px;
}

.timeline-content {
  flex: 1;
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.timeline-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
  transition: left 0.6s;
}

.timeline-item:hover .timeline-content::before {
  left: 100%;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.timeline-title {
  font-family: 'Orbitron', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-green);
  text-shadow: 0 0 10px var(--primary-green);
  margin: 0;
}

.timeline-duration {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.timeline-company {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
}

.company-name {
  color: var(--accent-cyan);
  font-weight: 600;
}

.company-location, .company-type {
  color: var(--primary-green);
  font-size: 12px;
}

.timeline-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--primary-green);
  margin-bottom: 16px;
}

.timeline-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}

.timeline-status, .timeline-classification {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.timeline-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  color: var(--primary-green);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tech-more {
  color: var(--accent-cyan);
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  align-self: center;
}

.projects-section {
  margin-bottom: 32px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.project-card {
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
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
      transparent 20px,
      rgba(0, 255, 0, 0.01) 20px,
      rgba(0, 255, 0, 0.01) 40px
    );
  pointer-events: none;
}

.project-card:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  transform: translateY(-4px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.project-header h3 {
  font-family: 'Orbitron', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-green);
  text-shadow: 0 0 10px var(--primary-green);
  margin: 0;
}

.project-duration {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.project-role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--primary-green);
  margin-bottom: 16px;
}

.project-impact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 6px;
}

.impact-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.impact-value {
  font-size: 12px;
  color: var(--primary-green);
  font-weight: 600;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-chip {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  color: var(--primary-green);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
}

/* Modal Styles */
.experience-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(13, 17, 23, 0.95) 100%);
  border: 2px solid var(--primary-green);
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(0, 255, 0, 0.4);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
}

.modal-header h2 {
  margin: 0;
  font-family: 'Orbitron', monospace;
  color: var(--primary-green);
  text-shadow: 0 0 15px var(--primary-green);
}

.close-button {
  background: none;
  border: none;
  color: var(--primary-green);
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-button:hover {
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
}

.modal-body {
  padding: 20px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 6px;
}

.detail-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-value {
  font-size: 12px;
  color: var(--primary-green);
  font-weight: 600;
}

.description-section, .achievements-section, .technologies-section {
  margin-bottom: 24px;
}

.description-section h3, .achievements-section h3, .technologies-section h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 16px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievements-list li {
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  color: var(--primary-green);
  font-size: 14px;
  line-height: 1.6;
}

.achievements-list li::before {
  content: "▶";
  position: absolute;
  left: 0;
  color: var(--accent-cyan);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}

.tech-item {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 6px;
  padding: 8px 12px;
  text-align: center;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent-cyan);
}

@media (max-width: 768px) {
  .overview-stats {
    grid-template-columns: 1fr 1fr;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-marker {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .timeline-line {
    width: 60px;
    height: 2px;
    margin-top: 0;
    margin-left: 10px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 400px) {
  .overview-stats { 
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 393px) {
  .overview-stats { 
    grid-template-columns: auto;
  }
}

</style>
