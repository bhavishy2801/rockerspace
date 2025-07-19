<script setup>
import { ref, computed } from 'vue';

const projects = ref([
  {
    id: 1,
    title: 'MichiKon',
    description: 'Next-gen AI assistant with unmatched intelligence and limitless features.',
    technologies: ['TensorFlow', 'Next.js', 'MongoDB', 'Whisper'],
    repoUrl: 'https://github.com/bhavishy2801/Netflix-Clone',
    liveUrl: '#',
    status: 'DEVELOPMENT',
    classification: 'HIGH-PRIORITY'
  },
  {
    id: 2,
    title: 'CubedUp',
    description: 'AI-driven Rubik’s Cube solver with real-time 3D computation.',
    technologies: ['TensorFlow', 'OpenCV', 'Flask','Flutter'],
    repoUrl: 'https://github.com/bhavishy2801/CubedUp',
    liveUrl: '#',
    status: 'DEVELOPMENT',
    classification: 'HIGH-PRIORITY'
  },
  {
    id: 3,
    title: 'JEEzy',
    description: 'AI-powered platform for JEE prep with notes, tests, analytics.',
    technologies: ['Flutter', 'Firebase', 'React.js', 'Node.js'],
    repoUrl: 'https://github.com/bhavishy2801/jeezy',
    liveUrl: 'https://jeezy-c518d.web.app/',
    status: 'DEVELOPMENT',
    classification: 'MEDIUM-PRIORITY'
  },
  {
    id: 4,
    title: 'Whispr',
    description: 'A minimalist messenger application completely made in C.',
    technologies: ['C', 'Socket Programming', 'Diffie-Hellmann'],
    repoUrl: 'https://github.com/bhavishy2801/whispr',
    liveUrl: '#',
    status: 'OPERATIONAL'
  }
]);

const selectedProject = ref(null);

const getStatusColor = (status) => {
  switch (status) {
    case 'OPERATIONAL': return 'text-green-400';
    case 'DEVELOPMENT': return 'text-yellow-400';
    case 'MAINTENANCE': return 'text-red-400';
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

const openProject = (project) => {
  selectedProject.value = project;
};

const closeProject = () => {
  selectedProject.value = null;
};
</script>

<template>
  <div class="content-block">
    <h1>~$ ls ~/projects/</h1>
    
    <div class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="project-card"
        @click="openProject(project)"
      >
        <div class="project-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <div class="project-meta">
            <span class="project-status" :class="getStatusColor(project.status)">
              ● {{ project.status }}
            </span>
            <span class="project-classification" :class="getClassificationColor(project.classification)">
              {{ project.classification }}
            </span>
          </div>
        </div>
        
        <p class="project-description">{{ project.description }}</p>
        
        <div class="project-tech">
          <span 
            v-for="tech in project.technologies" 
            :key="tech"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
        
        <div class="project-actions">
          <a 
            :href="project.repoUrl" 
            target="_blank" 
            class="action-button repo-button"
            @click.stop
          >
            <span>◆</span> REPOSITORY
          </a>
          <a 
            v-if="project.liveUrl && project.liveUrl !== '#'"
            :href="project.liveUrl" 
            target="_blank" 
            class="action-button live-button"
            @click.stop
          >
            <span>▶</span> LIVE DEMO
          </a>
        </div>
      </div>
    </div>
    
    <!-- Project Detail Modal -->
    <div v-if="selectedProject" class="project-modal" @click="closeProject">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedProject.title }}</h2>
          <button @click="closeProject" class="close-button">×</button>
        </div>
        
        <div class="modal-body">
          <div class="project-details">
            <div class="detail-section">
              <h3>MISSION BRIEFING</h3>
              <p>{{ selectedProject.description }}</p>
            </div>
            
            <div class="detail-section">
              <h3>TECH STACK</h3>
              <div class="tech-grid">
                <span 
                  v-for="tech in selectedProject.technologies" 
                  :key="tech"
                  class="tech-item"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div class="detail-section">
              <h3>OPERATIONAL STATUS</h3>
              <div class="status-info">
                <span class="status-label">Current Status:</span>
                <span :class="getStatusColor(selectedProject.status)">
                  {{ selectedProject.status }}
                </span>
              </div>
              <div class="status-info">
                <span class="status-label">Classification:</span>
                <span :class="getClassificationColor(selectedProject.classification)">
                  {{ selectedProject.classification }}
                </span>
              </div>
            </div>
            
            <div class="detail-actions">
              <a 
                :href="selectedProject.repoUrl" 
                target="_blank" 
                class="detail-button repo-button"
              >
                <span>◆</span> ACCESS REPOSITORY
              </a>
              <a 
                v-if="selectedProject.liveUrl && selectedProject.liveUrl !== '#'"
                :href="selectedProject.liveUrl" 
                target="_blank" 
                class="detail-button live-button"
              >
                <span>▶</span> LAUNCH APPLICATION
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 24px;
  margin-top: 20px;
}

.project-card {
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 12px;
  padding: 24px;
  cursor: url('../../assets/files/arrowClick.svg') 15 15, move !important;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
  transition: left 0.6s;
}

.project-card:hover::before {
  left: 100%;
}

.project-card:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
  transform: translateY(-4px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.project-title {
  font-family: 'Orbitron', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-green);
  text-shadow: 0 0 10px var(--primary-green);
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.project-status, .project-classification {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-description {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
  color: var(--primary-green);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--accent-cyan);
  font-family: 'JetBrains Mono', monospace;
}

.project-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  flex: 1;
  padding: 8px 16px;
  border: 1px solid;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.repo-button {
  border-color: var(--primary-green);
  color: var(--primary-green);
  background: rgba(0, 255, 0, 0.1);
}

.repo-button:hover {
  background: rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.4);
}

.live-button {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background: rgba(0, 255, 255, 0.1);
}

.live-button:hover {
  background: rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
}

/* Modal Styles */
.project-modal {
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
  max-width: 700px;
  max-height: 80vh;
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
}

.close-button:hover {
  color: var(--accent-cyan);
}

.modal-body {
  padding: 20px;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h3 {
  font-family: 'Orbitron', monospace;
  color: var(--accent-cyan);
  font-size: 16px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
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

.status-info {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.status-label {
  color: var(--primary-green);
  font-weight: 600;
}

.detail-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.detail-button {
  flex: 1;
  padding: 12px 24px;
  border: 1px solid;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}
</style>
