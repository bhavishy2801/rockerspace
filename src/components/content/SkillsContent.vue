<script setup>
import { ref, computed } from 'vue';

const skills = ref([
  {
    category: 'Frontend Arsenal',
    icon: '🎨',
    items: [
      { name: 'React.js', level: 90, experience: '4+ years' },
      { name: 'Flutter', level: 95, experience: '3+ years' },
      { name: 'Vue.js', level: 85, experience: '6+ months' },
      { name: 'TypeScript', level: 80, experience: '2+ years' },
      { name: 'JavaScript', level: 95, experience: '4+ years' },
      { name: 'HTML/CSS', level: 95, experience: '4+ years' },
      { name: 'Tailwind CSS', level: 90, experience: '2+ years' },
      { name: 'Next.js', level: 75, experience: '2+ years' }
    ]
  },
  {
    category: 'Backend Systems',
    icon: '⚙️',
    items: [
      { name: 'Node.js', level: 85, experience: '3+ years' },
      { name: 'Express.js', level: 85, experience: '3+ years' },
      { name: 'Python', level: 90, experience: '2+ years' },
      { name: 'REST APIs', level: 80, experience: '2+ years' },
    ]
  },
  {
    category: 'Database Management',
    icon: '🗄️',
    items: [
      { name: 'MongoDB', level: 75, experience: '3+ years' },
      { name: 'PostgreSQL', level: 80, experience: '2+ years' },
      { name: 'MySQL', level: 80, experience: '2+ years' },
      { name: 'SQLite', level: 90, experience: '2+ years' },
      { name: 'Firebase', level: 95, experience: '1+ year' },
    ]
  },
  {
    category: 'Programming Languages',
    icon: '💻',
    items: [
      { name: 'C', level: 95, experience: '4+ years' },
      { name: 'C++', level: 95, experience: '4+ years' },
      { name: 'Kotlin', level: 75, experience: '3+ years' },
      { name: 'Python', level: 82, experience: '2+ years' },
      { name: 'Go', level: 60, experience: '2+ months' },
    ]
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    items: [
      { name: 'AWS', level: 80, experience: '1+ year' },
      { name: 'Azure', level: 85, experience: '1+ year' },
      { name: 'Google Cloud', level: 85, experience: '2+ years' },
      { name: 'Firebase', level: 95, experience: '1+ year' },
      { name: 'Docker', level: 75, experience: '1+ year' },
      { name: 'Vercel', level: 90, experience: '2+ years' },
      { name: 'Netlify', level: 85, experience: '2+ years' },
      { name: 'CI/CD', level: 78, experience: '1+ year' }
    ]
  },
  {
    category: 'Development Tools',
    icon: '🔧',
    items: [
      { name: 'Git/GitHub', level: 90, experience: '4+ years' },
      { name: 'VS Code', level: 95, experience: '4+ years' },
      { name: 'Terminal/CLI', level: 88, experience: '3+ years' },
      { name: 'Postman', level: 85, experience: '2+ years' },
      { name: 'Figma', level: 80, experience: '2+ years' },
      { name: 'Webpack', level: 65, experience: '4+ months' },
      { name: 'Vite', level: 88, experience: '1+ years' },
      { name: 'ESLint/Prettier', level: 85, experience: '2+ years' }
    ]
  },
  {
    category: 'Specialized Skills',
    icon: '🎯',
    items: [
      { name: 'DSA', level: 80, experience: '6+ months' },
      { name: 'Machine Learning', level: 85, experience: '3+ months' },
      { name: 'Deep Learning', level: 80, experience: '2+ months' },
      { name: 'TensorFlow', level: 75, experience: '1+ month' },
      { name: 'Keras', level: 75, experience: '1+ month' },
      { name: 'PyTorch', level: 70, experience: '1+ month' },
    ]
  }
]);

const selectedCategory = ref(null);
const filterLevel = ref(0);

const filteredSkills = computed(() => {
  if (selectedCategory.value) {
    return skills.value.filter(category => category.category === selectedCategory.value);
  }
  return skills.value;
});

const getSkillColor = (level) => {
  if (level >= 90) return 'skill-expert';
  if (level >= 80) return 'skill-advanced';
  if (level >= 70) return 'skill-intermediate';
  return 'skill-beginner';
};

const getSkillLabel = (level) => {
  if (level >= 90) return 'EXPERT';
  if (level >= 80) return 'ADVANCED';
  if (level >= 70) return 'INTERMEDIATE';
  return 'BEGINNER';
};

const selectCategory = (category) => {
  selectedCategory.value = selectedCategory.value === category ? null : category;
};

const overallStats = computed(() => {
  const allItems = skills.value.flatMap(category => category.items);
  const totalSkills = allItems.length;
  const averageLevel = allItems.reduce((sum, item) => sum + item.level, 0) / totalSkills;
  const expertSkills = allItems.filter(item => item.level >= 90).length;
  const advancedSkills = allItems.filter(item => item.level >= 80 && item.level < 90).length;
  
  return {
    totalSkills,
    averageLevel: Math.round(averageLevel),
    expertSkills,
    advancedSkills
  };
});
</script>

<template>
  <div class="content-block">
    <h1>> decode_skills.sh</h1>
    
    <!-- Overall Stats -->
    <div class="stats-overview">
      <div class="stat-item">
        <span class="stat-value">{{ overallStats.totalSkills }}</span>
        <span class="stat-label">TOTAL SKILLS</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ overallStats.averageLevel }}%</span>
        <span class="stat-label">AVERAGE LEVEL</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ overallStats.expertSkills }}</span>
        <span class="stat-label">EXPERT LEVEL</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ overallStats.advancedSkills }}</span>
        <span class="stat-label">ADVANCED LEVEL</span>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      <h2>SKILL CATEGORIES</h2>
      <div class="filter-buttons">
        <button 
          @click="selectCategory(null)"
          :class="{ active: selectedCategory === null }"
          class="filter-button"
        >
          ALL CATEGORIES
        </button>
        <button 
          v-for="category in skills"
          :key="category.category"
          @click="selectCategory(category.category)"
          :class="{ active: selectedCategory === category.category }"
          class="filter-button"
        >
          {{ category.icon }} {{ category.category }}
        </button>
      </div>
    </div>

    <!-- Skills Grid -->
    <div class="skills-container">
      <div 
        v-for="category in filteredSkills" 
        :key="category.category"
        class="skill-category"
      >
        <div class="category-header">
          <span class="category-icon">{{ category.icon }}</span>
          <h3>{{ category.category }}</h3>
          <span class="category-count">{{ category.items.length }} skills</span>
        </div>
        
        <div class="skills-grid">
          <div 
            v-for="skill in category.items" 
            :key="skill.name"
            class="skill-item"
            :class="getSkillColor(skill.level)"
          >
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}%</span>
            </div>
            
            <div class="skill-bar">
              <div 
                class="skill-progress"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
            
            <div class="skill-meta">
              <span class="skill-experience">{{ skill.experience }}</span>
              <span class="skill-badge">{{ getSkillLabel(skill.level) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Legend -->
    <div class="skill-legend">
      <h2>PROFICIENCY LEVELS</h2>
      <div class="legend-items">
        <div class="legend-item">
          <div class="legend-color skill-expert"></div>
          <span>EXPERT (90-100%)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color skill-advanced"></div>
          <span>ADVANCED (80-89%)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color skill-intermediate"></div>
          <span>INTERMEDIATE (70-79%)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color skill-beginner"></div>
          <span>BEGINNER (60-69%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-family: 'Orbitron', monospace;
  font-size: 24px;
  font-weight: 700;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 12px;
  color: var(--primary-green);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'JetBrains Mono', monospace;
}

.category-filter {
  margin-bottom: 32px;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.filter-button {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.3);
  color: var(--primary-green);
  padding: 8px 16px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.filter-button:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--primary-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
}

.filter-button.active {
  background: rgba(0, 255, 0, 0.15);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
}

.skills-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.skill-category {
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.skill-category::before {
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

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 255, 0, 0.2);
}

.category-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.category-header h3 {
  flex: 1;
  font-family: 'Orbitron', monospace;
  color: var(--primary-green);
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.category-count {
  font-size: 12px;
  color: var(--accent-cyan);
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.skill-item {
  background: rgba(0, 255, 0, 0.03);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.skill-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent);
  transition: left 0.5s;
}

.skill-item:hover::before {
  left: 100%;
}

.skill-item:hover {
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
  transform: translateY(-2px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.skill-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-green);
}

.skill-level {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-cyan);
  text-shadow: 0 0 8px var(--accent-cyan);
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: rgba(0, 255, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
  border: 1px solid rgba(0, 255, 0, 0.2);
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-green), var(--accent-cyan));
  border-radius: 4px;
  transition: width 0.8s ease;
  position: relative;
}

.skill-progress::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 4px,
    rgba(255, 255, 255, 0.1) 4px,
    rgba(255, 255, 255, 0.1) 8px
  );
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-experience {
  font-size: 12px;
  color: var(--primary-green);
  font-family: 'JetBrains Mono', monospace;
}

.skill-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Skill Level Colors */
.skill-expert {
  border-color: rgba(0, 255, 0, 0.6);
}

.skill-expert .skill-progress {
  background: linear-gradient(90deg, #00ff00, #00ffff);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
}

.skill-expert .skill-badge {
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
  border: 1px solid rgba(0, 255, 0, 0.4);
}

.skill-advanced {
  border-color: rgba(0, 255, 255, 0.6);
}

.skill-advanced .skill-progress {
  background: linear-gradient(90deg, #00ffff, #0080ff);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
}

.skill-advanced .skill-badge {
  background: rgba(0, 255, 255, 0.2);
  color: #00ffff;
  border: 1px solid rgba(0, 255, 255, 0.4);
}

.skill-intermediate {
  border-color: rgba(255, 255, 0, 0.6);
}

.skill-intermediate .skill-progress {
  background: linear-gradient(90deg, #ffff00, #ff8000);
  box-shadow: 0 0 15px rgba(255, 255, 0, 0.6);
}

.skill-intermediate .skill-badge {
  background: rgba(255, 255, 0, 0.2);
  color: #ffff00;
  border: 1px solid rgba(255, 255, 0, 0.4);
}

.skill-beginner {
  border-color: rgba(255, 128, 0, 0.6);
}

.skill-beginner .skill-progress {
  background: linear-gradient(90deg, #ff8000, #ff4000);
  box-shadow: 0 0 15px rgba(255, 128, 0, 0.6);
}

.skill-beginner .skill-badge {
  background: rgba(255, 128, 0, 0.2);
  color: #ff8000;
  border: 1px solid rgba(255, 128, 0, 0.4);
}

.skill-legend {
  margin-top: 32px;
  padding: 20px;
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--primary-green);
}

.legend-color {
  width: 20px;
  height: 12px;
  border-radius: 6px;
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.legend-color.skill-expert {
  background: linear-gradient(90deg, #00ff00, #00ffff);
}

.legend-color.skill-advanced {
  background: linear-gradient(90deg, #00ffff, #0080ff);
}

.legend-color.skill-intermediate {
  background: linear-gradient(90deg, #ffff00, #ff8000);
}

.legend-color.skill-beginner {
  background: linear-gradient(90deg, #ff8000, #ff4000);
}

@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .legend-items {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
