<script setup>
import { ref } from 'vue';

const contactForm = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref('');

const contactChannels = [
  {
    id: 'email',
    name: 'GMAIL',
    value: 'bhavishyrocker2801@gmail.com',
    url: 'mailto:bhavishyrocker2801@gmail.com',
    icon: '📧',
    status: 'ACTIVE'
  },
  {
    id: 'github',
    name: 'GITHUB',
    value: 'github.com/bhavishy2801',
    url: 'https://github.com/bhavishy2801',
    icon: '🔗',
    status: 'ACTIVE'
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN',
    value: 'linkedin.com/in/bhavishy2801',
    url: 'https://www.linkedin.com/in/bhavishy2801/',
    icon: '💼',
    status: 'ACTIVE'
  },
  {
    id: 'resume',
    name: 'RESUME',
    value: 'Download Resume',
    url: 'https://drive.google.com/file/d/1oQTJAIJr8HcoY_ZZSJf4V-BcGVaWnz4p/view',
    icon: '📄',
    status: 'ACTIVE'
  }
];

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  submitStatus.value = 'MESSAGE_TRANSMITTED';
  isSubmitting.value = false;
  
  // Reset form
  contactForm.value = {
    name: '',
    email: '',
    message: ''
  };
  
  setTimeout(() => {
    submitStatus.value = '';
  }, 3000);
};
</script>

<template>
  <div class="content-block contactheading">
    <h1>> ./init_handshake.sh</h1>
    
    <div class="communication-grid">
      <!-- Contact Channels -->
      <div class="channels-section">
        <h2>SECURE CHANNELS</h2>
        <div class="channels-list">
          <div 
            v-for="channel in contactChannels" 
            :key="channel.id"
            class="channel-item"
          >
            <div class="channel-icon">{{ channel.icon }}</div>
            <div class="channel-info">
              <div class="channel-name">{{ channel.name }}</div>
              <a 
                :href="channel.url" 
                target="_blank" 
                class="channel-link"
              >
                {{ channel.value }}
              </a>
            </div>
            <div class="channel-status">
              <span class="status-light online"></span>
              <span class="status-text">{{ channel.status }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="form-section">
        <h2>DIRECT TRANSMISSION</h2>
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <label for="name">SENDER_ID</label>
            <input 
              type="text" 
              id="name" 
              v-model="contactForm.name"
              required
              placeholder="Enter your identification"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="email">TRANSMISSION_ADDRESS</label>
            <input 
              type="email" 
              id="email" 
              v-model="contactForm.email"
              required
              placeholder="Enter your email address"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="message">MESSAGE_PAYLOAD</label>
            <textarea 
              id="message" 
              v-model="contactForm.message"
              required
              placeholder="Enter your message..."
              rows="6"
              class="form-textarea"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="submit-button"
          >
            <span v-if="isSubmitting">TRANSMITTING...</span>
            <span v-else>◆ SEND TRANSMISSION</span>
          </button>
          
          <div v-if="submitStatus" class="submit-status">
            <span class="status-icon">✓</span>
            {{ submitStatus }}
          </div>
        </form>
      </div>
    </div>
    
    <!-- Additional Information -->
    <div class="additional-info">
      <h2>OPERATIONAL PARAMETERS</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">RESPONSE_TIME:</span>
          <span class="info-value">24-48 HOURS</span>
        </div>
        <div class="info-item">
          <span class="info-label">TIMEZONE:</span>
          <span class="info-value">UTC+5:30 (IST)</span>
        </div>
        <div class="info-item">
          <span class="info-label">AVAILABILITY:</span>
          <span class="info-value">MONDAY - FRIDAY</span>
        </div>
        <div class="info-item">
          <span class="info-label">ENCRYPTION:</span>
          <span class="info-value">END-TO-END</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.communication-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
}

.channels-section, .form-section {
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  /* padding: 24px; */
  border-radius: 12px;
  max-width: 80vw;
}

.channels-list {
  /* display: flex; */
  /* flex-direction: column; */
  gap: 16px;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.channel-item:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

.channel-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 0, 0.1);
  border-radius: 8px;
}

.channel-info {
  flex: 1;
}

.channel-name {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.channel-link {
  color: var(--primary-green);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.channel-link:hover {
  color: var(--accent-cyan);
  text-shadow: 0 0 8px var(--accent-cyan);
}

.channel-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-green);
  box-shadow: 0 0 8px var(--primary-green);
}

.status-text {
  font-size: 12px;
  color: var(--primary-green);
  font-family: 'JetBrains Mono', monospace;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input, textarea {
  cursor: url('../../assets/files/textCursor.svg') 15 15, move !important;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-input, .form-textarea {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: var(--primary-green);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
  background: rgba(0, 255, 0, 0.1);
}

.form-input::placeholder, .form-textarea::placeholder {
  color: rgba(0, 255, 0, 0.5);
}

.submit-button {
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid var(--primary-green);
  color: var(--primary-green);
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent);
  transition: left 0.6s;
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:hover {
  background: rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
  color: var(--accent-cyan);
  border-color: var(--accent-cyan);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-green);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-icon {
  color: var(--accent-cyan);
  font-size: 16px;
}

.additional-info {
  background: rgba(0, 255, 0, 0.02);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 12px;
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 6px;
}

.info-label {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  color: var(--accent-cyan);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--primary-green);
  font-weight: 600;
}

@media (max-width: 768px) {
  .communication-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 490px) {
  .channels-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.channel-item {
  display: flex;
  flex-direction: column;
  align-items: start;
}
}
</style>
