<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
let animationId = null;
let ctx = null;
let canvas = null;

// Minimal particle systems for subtle effect
let particles = [];
let matrixLines = [];
let scanlines = [];
let gridDots = [];
let digitalRain = [];

// Very conservative configuration for better visibility
const CONFIG = {
  PARTICLE_COUNT: 15,
  MATRIX_LINES: 8,
  SCANLINE_COUNT: 3,
  GRID_DOTS: 20,
  DIGITAL_RAIN_COLUMNS: 30,
  MAX_OPACITY: 0.08
};

// Subtle floating particles
class SubtleParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.size = Math.random() * 1.5 + 0.5;
    this.life = 1;
    this.decay = Math.random() * 0.002 + 0.001;
    this.baseOpacity = Math.random() * 0.05 + 0.02;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    
    if (this.life <= 0 || this.x < -10 || this.x > this.canvas.width + 10 || 
        this.y < -10 || this.y > this.canvas.height + 10) {
      this.reset();
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life * this.baseOpacity;
    ctx.fillStyle = `rgba(0, 255, 0, ${this.life * this.baseOpacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Minimal matrix effect
class MatrixLine {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = -50;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.03 + 0.01;
    this.char = Math.random() > 0.5 ? '0' : '1';
    this.length = Math.random() * 8 + 4;
    this.segments = [];
    this.initSegments();
  }
  
  initSegments() {
    for (let i = 0; i < this.length; i++) {
      this.segments.push({
        y: this.y - (i * 20),
        opacity: this.opacity * ((this.length - i) / this.length),
        char: Math.random() > 0.5 ? '0' : '1'
      });
    }
  }
  
  update() {
    this.y += this.speed;
    this.segments.forEach(segment => {
      segment.y += this.speed;
      segment.opacity -= 0.0001;
    });
    
    if (this.y > this.canvas.height + 100) {
      this.x = Math.random() * this.canvas.width;
      this.y = -50;
      this.initSegments();
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.font = '12px JetBrains Mono';
    ctx.textAlign = 'center';
    
    this.segments.forEach(segment => {
      if (segment.opacity > 0) {
        ctx.globalAlpha = segment.opacity;
        ctx.fillStyle = `rgba(0, 255, 0, ${segment.opacity})`;
        ctx.fillText(segment.char, this.x, segment.y);
      }
    });
    ctx.restore();
  }
}

// Subtle scanlines
class SubtleScanline {
  constructor(canvas) {
    this.canvas = canvas;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 0.5 + 0.2;
    this.opacity = Math.random() * 0.02 + 0.005;
    this.height = 1;
  }
  
  update() {
    this.y += this.speed;
    if (this.y > this.canvas.height) {
      this.y = -this.height;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`;
    ctx.fillRect(0, this.y, this.canvas.width, this.height);
    ctx.restore();
  }
}

// Minimal grid dots
class GridDot {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.baseOpacity = Math.random() * 0.02 + 0.005;
    this.opacity = this.baseOpacity;
    this.pulseSpeed = Math.random() * 0.01 + 0.005;
    this.size = 1;
  }
  
  update() {
    this.opacity = this.baseOpacity + Math.sin(Date.now() * this.pulseSpeed) * 0.01;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }
}

// Minimal digital rain
class DigitalRain {
  constructor(x, canvas) {
    this.x = x;
    this.canvas = canvas;
    this.drops = [];
    this.maxDrops = 3;
    this.spawnRate = 0.003;
    this.initDrops();
  }
  
  initDrops() {
    for (let i = 0; i < this.maxDrops; i++) {
      this.drops.push({
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.03 + 0.01,
        char: String.fromCharCode(33 + Math.floor(Math.random() * 94))
      });
    }
  }
  
  update() {
    this.drops.forEach(drop => {
      drop.y += drop.speed;
      drop.opacity -= 0.00005;
      
      if (drop.y > this.canvas.height || drop.opacity <= 0) {
        drop.y = -20;
        drop.opacity = Math.random() * 0.03 + 0.01;
        drop.char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      }
    });
    
    // Rarely spawn new drops
    if (Math.random() < this.spawnRate && this.drops.length < this.maxDrops) {
      this.drops.push({
        y: -20,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.03 + 0.01,
        char: String.fromCharCode(33 + Math.floor(Math.random() * 94))
      });
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.font = '8px JetBrains Mono';
    ctx.textAlign = 'center';
    
    this.drops.forEach(drop => {
      ctx.globalAlpha = drop.opacity;
      ctx.fillStyle = `rgba(0, 255, 0, ${drop.opacity})`;
      ctx.fillText(drop.char, this.x, drop.y);
    });
    ctx.restore();
  }
}

const initCanvas = () => {
  canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  const initSystems = () => {
    // Clear existing systems
    particles = [];
    matrixLines = [];
    scanlines = [];
    gridDots = [];
    digitalRain = [];
    
    // Initialize minimal particle system
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      particles.push(new SubtleParticle(canvas));
    }
    
    // Initialize sparse matrix lines
    for (let i = 0; i < CONFIG.MATRIX_LINES; i++) {
      matrixLines.push(new MatrixLine(canvas));
    }
    
    // Initialize subtle scanlines
    for (let i = 0; i < CONFIG.SCANLINE_COUNT; i++) {
      scanlines.push(new SubtleScanline(canvas));
    }
    
    // Initialize grid dots
    const gridSpacing = 120;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        if (Math.random() > 0.7) { // Very sparse grid
          gridDots.push(new GridDot(x, y, canvas));
        }
      }
    }
    
    // Initialize digital rain
    const columnWidth = canvas.width / CONFIG.DIGITAL_RAIN_COLUMNS;
    for (let i = 0; i < CONFIG.DIGITAL_RAIN_COLUMNS; i++) {
      if (Math.random() > 0.8) { // Very sparse
        digitalRain.push(new DigitalRain(i * columnWidth, canvas));
      }
    }
  };
  
  const animate = () => {
    // Very subtle fade - keeps background dark
    ctx.fillStyle = 'rgba(0, 0, 0, 0.005)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all systems with very low opacity
    gridDots.forEach(dot => {
      dot.update();
      dot.draw(ctx);
    });
    
    scanlines.forEach(line => {
      line.update();
      line.draw(ctx);
    });
    
    digitalRain.forEach(rain => {
      rain.update();
      rain.draw(ctx);
    });
    
    particles.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });
    
    matrixLines.forEach(line => {
      line.update();
      line.draw(ctx);
    });
    
    // Very subtle particle connections
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.01)';
    ctx.lineWidth = 0.5;
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.globalAlpha = (100 - distance) / 100 * 0.01;
          ctx.stroke();
        }
      });
    });
    
    // Very rare circuit-like lines
    if (Math.random() > 0.999) {
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.globalAlpha = 0.02;
      ctx.stroke();
    }
    
    animationId = requestAnimationFrame(animate);
  };
  
  resize();
  initSystems();
  animate();
  
  window.addEventListener('resize', () => {
    resize();
    initSystems();
  });
};

onMounted(() => {
  initCanvas();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', () => {});
});
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="background-canvas"
  ></canvas>
</template>

<style scoped>
.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  opacity: 0.6; /* Further reduce overall opacity */
}
</style>
