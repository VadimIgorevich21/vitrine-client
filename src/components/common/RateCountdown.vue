<template>
  <div class="countdown-wrapper">
    <svg class="countdown-svg" viewBox="0 0 24 24">
      <!-- Background circle -->
      <circle
        class="countdown-bg"
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke-width="2"
      />
      <!-- Progress circle -->
      <circle
        class="countdown-progress"
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke-width="2"
        :style="{ strokeDashoffset: offset }"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(defineProps<{
  duration?: number;
  resetTrigger?: any;
  startTime?: number; // timestamp in ms
}>(), {
  duration: 60
});

const timeLeft = ref(props.duration);
const circumference = 2 * Math.PI * 10;
let timer: any = null;

const offset = computed(() => {
  const progress = timeLeft.value / props.duration;
  return circumference * (1 - progress);
});

const calculateTimeLeft = () => {
  if (props.startTime) {
    const elapsed = (Date.now() - props.startTime) / 1000;
    const remaining = Math.max(0, props.duration - elapsed);
    timeLeft.value = remaining;
  } else {
    timeLeft.value = props.duration;
  }
};

const startTimer = () => {
  if (timer) clearInterval(timer);
  calculateTimeLeft();
  
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      if (props.startTime) {
         calculateTimeLeft();
      } else {
         timeLeft.value -= 1;
      }
    }
  }, 1000);
};

watch(() => props.resetTrigger, () => {
  startTimer();
}, { deep: true });

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.countdown-wrapper {
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.countdown-bg {
  stroke: #f3f4f6;
}

:deep(.dark) .countdown-bg {
  stroke: #374151;
}

.countdown-progress {
  stroke: #6366f1; /* Indigo-500 */
  stroke-dasharray: 62.83; /* 2 * PI * 10 */
  transition: stroke-dashoffset 1s linear;
  stroke-linecap: round;
}

:deep(.dark) .countdown-progress {
  stroke: #818cf8; /* Indigo-400 */
}
</style>
