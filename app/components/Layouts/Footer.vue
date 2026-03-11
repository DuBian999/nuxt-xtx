<template>
  <el-row class="footer-container">
    <el-col :span="24">
      <el-card class="footer-card" shadow="never">
        <div class="footer-content">
          <h2 class="footer-title">Nuxt</h2>
          <p class="footer-subtitle">服务端渲染</p>
          <div class="footer-lines">
            <canvas ref="canvasRef" class="flow-canvas"></canvas>
          </div>
          <p class="footer-copyright">© 2026</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationId: number | null = null;

// 流光线条类
class FlowLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = canvasHeight / 2;
    this.length = 50 + Math.random() * 100;
    this.speed = 2 + Math.random() * 3;
    this.opacity = 0.3 + Math.random() * 0.7;
    this.color = `rgba(255, 103, 0, ${this.opacity})`;
  }

  update(canvasWidth: number) {
    this.x += this.speed;
    if (this.x > canvasWidth + this.length) {
      this.x = -this.length;
      this.opacity = 0.3 + Math.random() * 0.7;
      this.color = `rgba(255, 103, 0, ${this.opacity})`;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y);
    ctx.stroke();
  }
}

// 初始化canvas
const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 设置canvas尺寸
  const container = canvas.parentElement;
  if (container) {
    canvas.width = container.clientWidth * 0.8;
    canvas.height = 40;
  }

  // 创建流光线条
  const lines: FlowLine[] = [];
  for (let i = 0; i < 5; i++) {
    lines.push(new FlowLine(canvas.width, canvas.height));
  }

  // 动画循环
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景渐变
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, 'rgba(255, 103, 0, 0.2)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);

    // 更新和绘制流光线条
    lines.forEach((line) => {
      line.update(canvas.width);
      line.draw(ctx);
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();
};

// 组件挂载时初始化
onMounted(() => {
  // 延迟初始化，确保DOM已渲染
  setTimeout(initCanvas, 100);

  // 监听窗口大小变化
  window.addEventListener('resize', initCanvas);
});

// 组件卸载时清理
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', initCanvas);
});
</script>

<style lang="scss" scoped>
// 主题色
$theme-color: var(--theme-color);

.footer-card {
  text-align: center;
}

.footer-content {
  position: relative;
  z-index: 1;
}

.footer-title {
  font-size: 24px;
  font-weight: 600;
  color: $theme-color;
  @extend .animate-fade-in-up;
}

.footer-subtitle {
  font-size: 16px;
  color: #666;
}

.flow-canvas {
  width: 100%;
  height: 40px;
}

.footer-copyright {
  font-size: 14px;
  color: #999;
  margin: 0;
  @extend .animate-fade-in-up-delay;
}
</style>
