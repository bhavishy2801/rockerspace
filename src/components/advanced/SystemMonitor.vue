<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Real portfolio metrics
const portfolioMetrics = ref({
  projectsCompleted: 3,
  technologiesUsed: 15,
  codeCommits: 250,
  liveApplications: 4,
  skillProficiency: 75
});

const currentActivity = ref('C++ Algorithm Development');
const lastUpdated = ref(new Date());
const developmentTime = ref(0);

// Real project status
const projectStatus = ref([
  { name: 'Whispr', status: 'Live', uptime: '99.9%', users: 5, lastDeploy: '2025-4-15' },
  { name: 'JEEzy', status: 'Development', uptime: '98%', users: 0, lastDeploy: '2025-6-27' },
  { name: 'CubedUp', status: 'Development', uptime: '99.6%', users: 0, lastDeploy: '2025-7-10' },
  { name: 'MichiKon', status: 'Development', uptime: '99.2%', users: 0, lastDeploy: '2025-7-14' }
]);

// Real skill progression - changed to integers only
const skillMetrics = ref([
  { skill: 'C++', level: 92, recentWork: 'Mathematical Algorithms', trending: 'up' },
  { skill: 'JavaScript', level: 88, recentWork: 'React and Vue applications', trending: 'stable' },
  { skill: 'Flutter', level: 85, recentWork: 'JEEzy', trending: 'up' },
  { skill: 'Analytics', level: 80, recentWork: 'Google Cloud and Firebase integration in JEEzy', trending: 'up' },
  { skill: 'Data Structures', level: 75, recentWork: 'work in progress', trending: 'stable' }
]);

// Real technology stack
const techStack = ref([
  { name: 'React.js', usage: 85, projects: 1, status: 'active' },
  { name: 'Python', usage: 100, projects: 1, status: 'active' },
  { name: 'Flask', usage: 95, projects: 1, status: 'active' },
  { name: 'OpenCV', usage: 90, projects: 1, status: 'active' },
  { name: 'TensorFlow', usage: 85, projects: 1, status: 'active' },
  { name: 'Node.js', usage: 80, projects: 1, status: 'active' },
  { name: 'Flutter', usage: 90, projects: 1, status: 'active' },
  { name: 'Firebase', usage: 75, projects: 1, status: 'active' },
  { name: 'Socket.io', usage: 65, projects: 1, status: 'active' },
  { name: 'C', usage: 100, projects: 1, status: 'active' },
]);

// Recent development activity
const recentActivity = ref([
  { time: '2 hours ago', activity: 'Working on C++ mathematical algorithms', type: 'code' },
  { time: '1 day ago', activity: 'Implemented 2FA authentication system', type: 'feature' },
  { time: '3 days ago', activity: 'Optimized cache management system', type: 'optimization' },
  { time: '5 days ago', activity: 'Integrated Google Cloud analytics', type: 'integration' },
  { time: '1 week ago', activity: 'Deployed Krypto platform update', type: 'deployment' }
]);

// Academic progress
const academicProgress = ref({
  institution: 'IIT Jodhpur',
  program: 'Computer Science',
  currentYear: 'Second',
  gpa: 9.36,
  focusAreas: ['Algorithms', 'Data Structures', 'Software Engineering'],
  recentCourses: ['Advanced Algorithms', 'Database Systems', 'Machine Learning']
});

const updateRealTimeData = () => {
  // Update development time
  developmentTime.value += 1;
  
  // Update current activity based on time
  const activities = [
    'C++ Algorithm Development',
    '2FA System Implementation',
    'Analytics Platform Integration',
    'Code Debugging & Optimization',
    'React Application Development'
  ];
  
  if (developmentTime.value % 30 === 0) {
    currentActivity.value = activities[Math.floor(Math.random() * activities.length)];
  }
  
  // Update last updated time
  lastUpdated.value = new Date();
  
  // Simulate small changes in metrics
  // portfolioMetrics.value.codeCommits += Math.random() > 0.95 ? 1 : 0;
  
  // Update skill levels slightly based on activity - ensure integers only
  skillMetrics.value.forEach(skill => {
    if (skill.trending === 'up' && Math.random() > 0.98) {
      skill.level = Math.min(100, Math.floor(skill.level + 1)); // Changed to Math.floor to ensure integer
    }
  });
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'live': return 'var(--primary-green)';
    case 'active': return 'var(--primary-green)';
    case 'development': return 'var(--warning-yellow)';
    case 'maintenance': return 'var(--danger-red)';
    default: return 'var(--primary-green)';
  }
};

const getTrendingIcon = (trend) => {
  switch (trend) {
    case 'up': return '↗';
    case 'down': return '↘';
    case 'stable': return '→';
    default: return '→';
  }
};

const getActivityTypeColor = (type) => {
  switch (type) {
    case 'code': return 'var(--primary-green)';
    case 'feature': return 'var(--accent-cyan)';
    case 'optimization': return 'var(--warning-yellow)';
    case 'integration': return 'var(--accent-blue)';
    case 'deployment': return 'var(--secondary-green)';
    default: return 'var(--primary-green)';
  }
};

const formatUptime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
};

let interval;

onMounted(() => {
  updateRealTimeData();
  interval = setInterval(updateRealTimeData, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div class="system-monitor">
    <div class="monitor-header">
      <h3>◆ PORTFOLIO SYSTEM MONITOR ◆</h3>
      <div class="current-status">
        <div class="status-light online"></div>
        <span>{{ currentActivity }}</span>
      </div>
    </div>
    
    <!-- Portfolio Overview -->
    <div class="portfolio-overview">
      <div class="overview-card">
        <div class="card-icon">🎯</div>
        <div class="card-info">
          <div class="card-title">Projects</div>
          <div class="card-value">{{ portfolioMetrics.projectsCompleted }}</div>
          <div class="card-subtitle">Live Applications</div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon">🛠️</div>
        <div class="card-info">
          <div class="card-title">Technologies</div>
          <div class="card-value">{{ portfolioMetrics.technologiesUsed }}</div>
          <div class="card-subtitle">In Use</div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon">💻</div>
        <div class="card-info">
          <div class="card-title">Code Commits</div>
          <div class="card-value">{{ portfolioMetrics.codeCommits }}+</div>
          <div class="card-subtitle">This Year</div>
        </div>
      </div>
      
      <div class="overview-card">
        <div class="card-icon">📈</div>
        <div class="card-info">
          <div class="card-title">Skill Level</div>
          <div class="card-value">{{ portfolioMetrics.skillProficiency }}%</div>
          <div class="card-subtitle">Average</div>
        </div>
      </div>
    </div>
    
    <!-- Project Status -->
    <div class="info-section">
      <h4>🚀 Live Projects Status</h4>
      <div class="project-grid">
        <div 
          v-for="project in projectStatus" 
          :key="project.name"
          class="project-card"
        >
          <div class="project-header">
            <span class="project-name">{{ project.name }}</span>
            <span class="project-status">
              <div class="status-dot" :style="{ backgroundColor: getStatusColor(project.status) }"></div>
              {{ project.status }}
            </span>
          </div>
          <div class="project-metrics">
            <div class="metric">
              <span class="metric-label">Uptime:</span>
              <span class="metric-value">{{ project.uptime }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Users:</span>
              <span class="metric-value">{{ project.users }}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Last Deploy:</span>
              <span class="metric-value">{{ project.lastDeploy }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Skill Progression -->
    <div class="info-section">
      <h4>📊 Skill Development Metrics</h4>
      <div class="skills-progress">
        <div 
          v-for="skill in skillMetrics" 
          :key="skill.skill"
          class="skill-row"
        >
          <div class="skill-info">
            <span class="skill-name">{{ skill.skill }}</span>
            <span class="skill-work">{{ skill.recentWork }}</span>
          </div>
          <div class="skill-level">
            <div class="skill-bar">
              <div 
                class="skill-fill" 
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
            <!-- Changed to display integer only -->
            <span class="skill-percentage">{{ Math.floor(skill.level) }}%</span>
            <span class="skill-trend">{{ getTrendingIcon(skill.trending) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Technology Stack -->
    <div class="info-section">
      <h4>🔧 Technology Stack Usage</h4>
      <div class="tech-grid">
        <div 
          v-for="tech in techStack" 
          :key="tech.name"
          class="tech-item"
        >
          <div class="tech-header">
            <span class="tech-name">{{ tech.name }}</span>
            <span class="tech-usage">{{ tech.usage }}%</span>
          </div>
          <div class="tech-details">
            <span class="tech-projects">{{ tech.projects }} projects</span>
            <span :class="['tech-status', tech.status]">{{ tech.status }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <!-- <div class="info-section">
      <h4>🔄 Recent Development Activity</h4>
      <div class="activity-list">
        <div 
          v-for="activity in recentActivity" 
          :key="activity.time"
          class="activity-item"
        >
          <div class="activity-time">{{ activity.time }}</div>
          <div class="activity-content">
            <div class="activity-type" :style="{ color: getActivityTypeColor(activity.type) }">
              {{ activity.type.toUpperCase() }}
            </div>
            <div class="activity-description">{{ activity.activity }}</div>
          </div>
        </div>
      </div>
    </div> -->
    
    <!-- Academic Progress -->
    <div class="info-section">
      <h4>🎓 Academic Progress</h4>
      <div class="academic-info">
        <div class="academic-row">
          <span class="academic-label">Institution:</span>
          <span class="academic-value">{{ academicProgress.institution }}</span>
        </div>
        <div class="academic-row">
          <span class="academic-label">Program:</span>
          <span class="academic-value">{{ academicProgress.program }}</span>
        </div>
        <div class="academic-row">
          <span class="academic-label">Current Year:</span>
          <span class="academic-value">{{ academicProgress.currentYear }}</span>
        </div>
        <div class="academic-row">
          <span class="academic-label">GPA:</span>
          <span class="academic-value">{{ academicProgress.gpa }}/10</span>
        </div>
        <div class="academic-row">
          <span class="academic-label">Focus Areas:</span>
          <span class="academic-value">{{ academicProgress.focusAreas.join(', ') }}</span>
        </div>
      </div>
    </div>
    
    <!-- System Info -->
    <!-- <div class="system-info">
      <div class="info-item">
        <span class="info-label">Last Updated:</span>
        <span class="info-value">{{ lastUpdated.toLocaleTimeString() }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Development Time:</span>
        <span class="info-value">{{ formatUptime(developmentTime) }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Status:</span>
        <span class="info-value text-green">Active Development</span>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
/* ... (all the existing styles remain the same) ... */
.system-monitor {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 0, 0.9) 100%);
  border: 2px solid rgba(0, 255, 0, 0.4);
  border-radius: 12px;
  padding: 24px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--primary-green);
  max-height: 600px;
  overflow-y: auto;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
}

.monitor-header h3 {
  color: var(--accent-cyan);
  font-size: 16px;
  margin: 0;
}

.current-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--primary-green);
}

.portfolio-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.overview-card {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.overview-card:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

.card-icon {
  font-size: 24px;
  opacity: 0.8;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 12px;
  color: var(--accent-cyan);
  margin-bottom: 4px;
}

.card-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-green);
  margin-bottom: 2px;
}

.card-subtitle {
  font-size: 10px;
  color: rgba(0, 255, 0, 0.7);
}

.info-section {
  margin-bottom: 24px;
}

.info-section h4 {
  color: var(--accent-cyan);
  font-size: 14px;
  margin-bottom: 12px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.project-card {
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 6px;
  padding: 12px;
  transition: all 0.3s ease;
}
.project-card:hover {
    box-shadow: rgba(0, 255, 0, 0.3) 0px 0px 15px;
    border-color: var(--primary-green);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.project-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-green);
}

.project-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: var(--primary-green);
}

.project-metrics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}

.metric-label {
  color: var(--accent-cyan);
}

.metric-value {
  color: var(--primary-green);
  font-weight: 600;
}

.skills-progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(0, 255, 0, 0.03);
  border-radius: 6px;
  transition: all 0.3s ease;
}
.skill-row:hover {
    box-shadow: rgba(0, 255, 0, 0.5) 0px 0px 15px;
    border-color: var(--primary-green);
}


.skill-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.skill-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-green);
}

.skill-work {
  font-size: 10px;
  color: var(--accent-cyan);
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skill-bar {
  width: 100px;
  height: 6px;
  background: rgba(0, 255, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-green), var(--accent-cyan));
  transition: width 0.3s ease;
}

.skill-percentage {
  font-size: 10px;
  font-weight: 600;
  color: var(--primary-green);
  width: 35px;
  text-align: right;
}

.skill-trend {
  font-size: 12px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}

.tech-item {
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  padding: 8px;
  transition: all 0.3s ease;
}
.tech-item:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.tech-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--primary-green);
}

.tech-usage {
  font-size: 10px;
  color: var(--accent-cyan);
}

.tech-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-projects {
  font-size: 9px;
  color: rgba(0, 255, 0, 0.7);
}

.tech-status.active {
  color: var(--primary-green);
  font-size: 9px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(0, 255, 0, 0.03);
  border-radius: 6px;
}

.activity-time {
  font-size: 10px;
  color: var(--accent-cyan);
  white-space: nowrap;
  min-width: 80px;
}

.activity-content {
  flex: 1;
}

.activity-type {
  font-size: 9px;
  font-weight: 600;
  margin-bottom: 2px;
}

.activity-description {
  font-size: 11px;
  color: var(--primary-green);
}

.academic-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.academic-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
  background: rgba(0, 255, 0, 0.03);
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.3s ease;
}
.academic-row:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
}


.academic-label {
  color: var(--accent-cyan);
  font-weight: 600;
}

.academic-value {
  color: var(--primary-green);
}

.system-info {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 6px;
  margin-top: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 10px;
  color: var(--accent-cyan);
  font-weight: 600;
}

.info-value {
  font-size: 12px;
  color: var(--primary-green);
}

.text-green {
  color: var(--primary-green) !important;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}

.status-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-green);
  box-shadow: 0 0 8px var(--primary-green);
}

@media (max-width: 768px) {
  .portfolio-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .project-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .system-info {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
