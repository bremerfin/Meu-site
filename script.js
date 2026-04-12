/* ===== NAVEGAÇÃO ===== */
function showSection(id) {
  document.getElementById('home').style.display = 'none';
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'historia') {
    setTimeout(() => {
      document.querySelectorAll('.timeline-item').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 300);
      });
    }, 200);
    startCarousel();
  }
}

function goHome() {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('home').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  stopCarousel();
}

/* ===== CARROSSEL AUTO-PLAY ===== */
let currentSlide = 0;
const totalSlides = 5;
const slideDuration = 5000;
let carouselInterval = null;

function updateCarousel() {
  const track = document.getElementById('galeriaTrack');
  const counter = document.getElementById('galeriaCounter');
  const bars = document.querySelectorAll('#galeriaProgress .progress-bar');

  if (!track) return;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  counter.textContent = `0${currentSlide + 1} / 0${totalSlides}`;

  bars.forEach((bar, i) => {
    bar.classList.remove('active', 'done');
    if (i < currentSlide) bar.classList.add('done');
    if (i === currentSlide) bar.classList.add('active');
  });
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarousel();
  restartAutoplay();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  restartAutoplay();
}

function startCarousel() {
  stopCarousel();
  currentSlide = 0;
  updateCarousel();
  carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, slideDuration);
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function restartAutoplay() {
  stopCarousel();
  carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, slideDuration);
}
