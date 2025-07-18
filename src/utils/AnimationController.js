class AnimationController {
  constructor() {
    this.isAnimating = false;
    this.currentSection = null;
    this.animationQueue = [];
    this.observers = new Map();
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElementsInView(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
  }

  animateElementsInView(container) {
    const elements = container.querySelectorAll('.content-block');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-in');
      }, index * 100);
    });
  }

  async transitionToSection(fromSection, toSection, direction = 'right') {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Show loading state
    this.showLoadingState();
    
    // Animate out current section
    if (fromSection) {
      await this.animateOut(fromSection, direction);
    }
    
    // Simulate loading time
    await this.simulateLoading();
    
    // Animate in new section
    await this.animateIn(toSection, direction);
    
    // Hide loading state
    this.hideLoadingState();
    
    this.isAnimating = false;
    this.currentSection = toSection;
  }

  async animateOut(section, direction) {
    return new Promise((resolve) => {
      const className = direction === 'right' ? 'leaving' : 'leaving-reverse';
      section.classList.add(className);
      
      setTimeout(() => {
        section.classList.remove('active', className);
        resolve();
      }, 800);
    });
  }

  async animateIn(section, direction) {
    return new Promise((resolve) => {
      const className = direction === 'right' ? 'entering' : 'entering-reverse';
      
      // Reset content blocks
      const contentBlocks = section.querySelectorAll('.content-block');
      contentBlocks.forEach(block => {
        block.classList.remove('animate-in');
      });
      
      section.classList.add(className);
      
      setTimeout(() => {
        section.classList.add('active');
        section.classList.remove(className);
        
        // Animate content blocks
        this.animateContentBlocks(section);
        
        resolve();
      }, 100);
    });
  }

  animateContentBlocks(section) {
    const contentBlocks = section.querySelectorAll('.content-block');
    contentBlocks.forEach((block, index) => {
      setTimeout(() => {
        block.classList.add('animate-in');
      }, index * 150);
    });
  }

  showLoadingState() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
      this.animateProgressBar();
    }
  }

  hideLoadingState() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }

  async simulateLoading() {
    return new Promise((resolve) => {
      setTimeout(resolve, 600);
    });
  }

  animateProgressBar() {
    const progressBar = document.querySelector('.loading-progress-bar');
    if (progressBar) {
      progressBar.style.width = '0%';
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        progressBar.style.width = `${progress}%`;
      }, 50);
    }
  }

  addParticleEffect(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle-burst';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 800);
  }

  addRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 255, 0, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  observeElement(element) {
    this.intersectionObserver.observe(element);
  }

  unobserveElement(element) {
    this.intersectionObserver.unobserve(element);
  }

  setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    });
  }

  setupMouseTracker() {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      const morphBg = document.querySelector('.morph-background');
      if (morphBg) {
        morphBg.style.setProperty('--mouse-x', `${x}%`);
        morphBg.style.setProperty('--mouse-y', `${y}%`);
      }
    });
  }

  init() {
    this.setupParallaxEffect();
    this.setupMouseTracker();
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default AnimationController;
