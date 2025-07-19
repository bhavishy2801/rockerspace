<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['bootComplete']);

/* ───── CONFIG ───────────────────────────────────────────── */
const TEXT         = 'ROCKERSPACE';
const STAGE_DELAY  = 500;   // delay before anything happens (reduced)
const STAGGER      = 60;    // ms between each letter appearing (slightly faster)
const WAVE_DELAY   = 400;   // pause before "fill-in" stage (reduced)
const FILL_TIME    = 800;   // time the fill animation is visible (reduced)
const OUT_DELAY    = 1500;   // pause before fade-out starts (reduced)
const OUT_TIME     = 600;   // fade-out duration (faster)

/* ───── STATE ────────────────────────────────────────────── */
const letters       = ref([]);
const showText      = ref(false);
const titleFilled   = ref(false);
const bootDone      = ref(false);
const fadeOut       = ref(false);

/* ───── LIFE-CYCLE ───────────────────────────────────────── */
onMounted(async () => {
  // initialise letters
  letters.value = TEXT.split('').map((c, i) => ({ char: c, shown: false, filled: false, i }));

  /* Stage 1 – wait, then show container  */
  await wait(STAGE_DELAY);
  showText.value = true;

  /* Stage 2 – wave-in letters  */
  for (const l of letters.value) {
    l.shown = true;
    await wait(STAGGER);
  }

  /* Stage 3 – pause, then fill (trigger both states simultaneously) */
  await wait(WAVE_DELAY);
  titleFilled.value = true;
  // Fill letters individually for better animation
  for (const l of letters.value) {
    l.filled = true;
    await wait(30); // very fast fill animation
  }

  /* Stage 4 – keep filled state a moment  */
  await wait(FILL_TIME);
  bootDone.value = true;

  /* Stage 5 – fade everything out  */
  await wait(OUT_DELAY);
  fadeOut.value = true;
  await wait(OUT_TIME);

  /* BOOT COMPLETE */
  emit('bootComplete');
});

/* helpers */
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
</script>

<template>
  <div class="boot-screen" :class="{ 'fade-out': fadeOut }">
    <!-- Subtle CRT scanlines -->
    <div class="scanlines" />

    <!-- Title container -->
    <div class="title-wrap" :class="{ show: showText }">
      <h1
        class="main-title"
        :class="{ filled: titleFilled, active: bootDone }"
        style="font-family: 'FODECUMBERS THICK HOLOW', monospace"
      >
        <span
          v-for="l in letters"
          :key="l.i"
          class="letter"
          :class="{
            show: l.shown,
            filled: l.filled
          }"
        >
          {{ l.char }}
        </span>
      </h1>
      
      <!-- Underline Effect -->
      <div 
        v-if="bootDone" 
        class="underline-effect"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* ───── LAYOUT ───────────────────────────────────────────── */
.boot-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10000;
  transition: opacity .6s ease, transform .6s ease;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.boot-screen.fade-out { opacity: 0; transform: translateY(-20px) scale(.99); }

/* ───── SCANLINES ───────────────────────────────────────── */
.scanlines {
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent 0 7px,
    rgba(0,255,0,.02) 7px 8px
  );
  animation: scan-move 16s linear infinite;
  pointer-events: none;
}

/* ───── TITLE WRAPPER  ──────────────────────────────────── */
.title-wrap { 
  opacity: 0; 
  transform: translateY(50px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.title-wrap.show { animation: title-wrap-in .6s cubic-bezier(.25,.8,.35,1) forwards; }

/* ───── MAIN TITLE ──────────────────────────────────────── */
.main-title {
  font-size: clamp(20px, 12vw, 170px);
  letter-spacing: clamp(1px, 2vw, 15px);
  white-space: nowrap;
  margin: 0;
  --stroke: #00ff00;
  --stroke-filled: #00ff00;
  position: relative;
  text-align: center;
  width: fit-content;
  line-height: 1;
  display: block;
}

/* subtle brightness increase when active */
.main-title.active {
  filter: brightness(1.1);
}

/* ───── LETTERS ─────────────────────────────────────────── */
.letter {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: clamp(1px, 0.4vw, 3px) var(--stroke);
  text-stroke: clamp(1px, 0.4vw, 3px) var(--stroke);
  opacity: 0;
  transform: translateY(20px) scale(.8);
  transition:
    opacity .4s ease,
    transform .4s cubic-bezier(.25,.8,.35,1),
    color .5s ease,
    -webkit-text-stroke .5s ease;
}

/* wave-in */
.letter.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* fill stage */
.letter.filled {
  color: var(--stroke-filled);
  -webkit-text-stroke: clamp(0.5px, 0.3vw, 2px) rgba(0,255,0,.8);
  text-stroke: clamp(0.5px, 0.3vw, 2px) rgba(0,255,0,.8);
}

/* ───── UNDERLINE EFFECT ────────────────────────────────── */
.underline-effect {
  width: 0;
  height: clamp(1px, 0.5vw, 3px);
  background: linear-gradient(90deg, transparent, #00ff00, transparent);
  margin-top: clamp(8px, 3vw, 20px);
  animation: underline-expand 1.5s ease-out forwards;
  box-shadow: 0 0 6px rgba(0,255,0,.6);
  align-self: center;
}

/* ───── KEYFRAMES ───────────────────────────────────────── */
@keyframes scan-move { to { transform: translateY(100vh); } }

@keyframes title-wrap-in {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes underline-expand {
  0% { width: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { width: 100%; opacity: 0.8; }
}

/* ───── RESPONSIVE BREAKPOINTS ─────────────────────────── */

/* Large screens */
@media (min-width: 769px) {
  .main-title {
    font-size: clamp(48px, 8vw, 170px);
    letter-spacing: clamp(4px, 1vw, 15px);
  }
}

/* Tablets */
@media (max-width: 768px) {
  .main-title {
    font-size: clamp(30px, 10vw, 120px);
    letter-spacing: clamp(2px, 1.5vw, 10px);
  }
}

/* Mobile phones - 481px to 600px */
@media (max-width: 600px) {
  .main-title {
    font-size: clamp(24px, 12vw, 90px);
    letter-spacing: clamp(1px, 2vw, 8px);
  }
  
  .underline-effect {
    margin-top: clamp(8px, 2vw, 15px);
  }
}

/* Small phones - 321px to 480px */
@media (max-width: 480px) {
  .boot-screen {
    padding: 0 10px;
  }
  
  .title-wrap {
    width: 100%;
    padding: 0;
    scale: 0.9;
    justify-content: center;
  }
  
  .main-title {
    font-size: clamp(16px, 15vw, 70px);
    letter-spacing: clamp(0.5px, 3vw, 6px);
    width: fit-content;
  }
  
  .letter {
    -webkit-text-stroke: clamp(0.8px, 0.6vw, 2px) var(--stroke);
    text-stroke: clamp(0.8px, 0.6vw, 2px) var(--stroke);
  }
  
  .letter.filled {
    -webkit-text-stroke: clamp(0.5px, 0.4vw, 1.5px) rgba(0,255,0,.8);
    text-stroke: clamp(0.5px, 0.4vw, 1.5px) rgba(0,255,0,.8);
  }
  
  .underline-effect {
    height: clamp(1px, 0.6vw, 2px);
    margin-top: clamp(6px, 2vw, 12px);
  }
}

/* Very small phones - 280px to 320px */
@media (max-width: 320px) {
  .boot-screen {
    padding: 0 8px;
  }
  
  .title-wrap {
    width: 100%;
    padding: 0;
    scale: 0.9;
  }
  
  .main-title {
    font-size: clamp(13px, 18vw, 55px);
    letter-spacing: clamp(0.3px, 4vw, 4px);
    width: fit-content;
  }
  
  .letter {
    -webkit-text-stroke: clamp(0.6px, 0.8vw, 1.5px) var(--stroke);
    text-stroke: clamp(0.6px, 0.8vw, 1.5px) var(--stroke);
  }
  
  .letter.filled {
    -webkit-text-stroke: clamp(0.4px, 0.6vw, 1px) rgba(0,255,0,.8);
    text-stroke: clamp(0.4px, 0.6vw, 1px) rgba(0,255,0,.8);
  }
  
  .underline-effect {
    margin-top: clamp(4px, 1.5vw, 8px);
  }
}

/* Extra small phones - below 280px */
@media (max-width: 280px) {
  .boot-screen {
    padding: 0 5px;
  }
  
  .main-title {
    font-size: clamp(11px, 20vw, 45px);
    letter-spacing: clamp(0.2px, 4.5vw, 3px);
    width: fit-content;
  }
  
  .letter {
    -webkit-text-stroke: clamp(0.5px, 1vw, 1.2px) var(--stroke);
    text-stroke: clamp(0.5px, 1vw, 1.2px) var(--stroke);
  }
  
  .letter.filled {
    -webkit-text-stroke: clamp(0.3px, 0.8vw, 0.8px) rgba(0,255,0,.8);
    text-stroke: clamp(0.3px, 0.8vw, 0.8px) rgba(0,255,0,.8);
  }
  
  .underline-effect {
    margin-top: clamp(3px, 1vw, 6px);
  }
}

/* Landscape orientation for small phones */
@media (max-height: 500px) and (orientation: landscape) and (max-width: 800px) {
  .boot-screen {
    padding: 0 5px;
  }
  
  .main-title {
    font-size: clamp(18px, 10vh, 60px);
    letter-spacing: clamp(0.8px, 1.5vh, 6px);
  }
  
  .underline-effect {
    margin-top: clamp(4px, 1vh, 8px);
  }
}

/* Ultra-wide screens */
@media (min-width: 1920px) {
  .main-title {
    font-size: clamp(120px, 8vw, 200px);
    letter-spacing: clamp(10px, 1vw, 20px);
  }
}
</style>
