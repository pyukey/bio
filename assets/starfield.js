const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

const pixelSize = 4;
let stars = [];
let scrollY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateStars();
}

function generateStars() {
  stars = [];
  const cols = Math.ceil(canvas.width / pixelSize);
  const rows = Math.ceil(canvas.height / pixelSize);
  const starCount = Math.floor((cols * rows) / 30);
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.floor(Math.random() * cols) * pixelSize,
      y: Math.floor(Math.random() * rows) * pixelSize,
      brightness: Math.random() * 0.5 + 0.5,
      shimmerSpeed: Math.random() * 0.25 + 0.75,
      shimmerOffset: Math.random() * Math.PI * 2,
      baseSize: Math.random() > 0.7 ? pixelSize * 2 : pixelSize,
      color: Math.random() > 0.9 ? 'rgb(150,180,255)' : 'rgb(255,255,255)'
    });
  }
}

function draw() {
  background = getComputedStyle(document.documentElement).getPropertyValue('--color-starback-primary').trim()
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const time = Date.now() * 0.001;
  
  stars.forEach(star => {
    const shimmer = Math.sin(time * star.shimmerSpeed + star.shimmerOffset + scrollY * 0.001) * 0.5 + 0.5;
    const scrollShimmer = Math.sin(scrollY * 0.01 + star.y * 0.01) * 0.1 + 0.9;
    const alpha = star.brightness * shimmer * scrollShimmer;
    
    const r = star.color.includes('150') ? 150 : 255;
    const g = star.color.includes('180') ? 180 : 255;
    const b = 255;
    
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(star.x, star.y, star.baseSize, star.baseSize);
    
    if (shimmer > 0.8 && star.baseSize === pixelSize * 2) {
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
      ctx.fillRect(star.x - pixelSize, star.y, pixelSize, pixelSize);
      ctx.fillRect(star.x + star.baseSize, star.y, pixelSize, pixelSize);
      ctx.fillRect(star.x, star.y - pixelSize, star.baseSize, pixelSize);
      ctx.fillRect(star.x, star.y + star.baseSize, star.baseSize, pixelSize);
    }
  });
  
  requestAnimationFrame(draw);
}

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
draw();