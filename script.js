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

/* ===== CARROSSEL 4 FOTOS COM DESTAQUE ===== */
let fotoAtiva = 0;
const totalFotos = 5;
let carouselInterval = null;

const legendas = [
  "Minha primeira palestra",
  "Primeira rodada de negócios",
  "Maior evento de finanças do Brasil",
  "Palestra sobre dinheiro e sonhos",
  "Mentora financeira de empresários"
];

const srcs = ["foto1.jpg","foto2.jpg","foto3.jpg","foto4.jpg","foto5.jpg"];

function updateGaleria() {
  const items = document.querySelectorAll('.galeria-item');
  const dots = document.querySelectorAll('.galeria-dot');
  if (!items.length) return;

  // Mostra 4 fotos: a ativa e as 3 seguintes (em loop)
  for (let slot = 0; slot < 4; slot++) {
    const fotoIndex = (fotoAtiva + slot) % totalFotos;
    const item = items[slot];
    const img = item.querySelector('img');
    const caption = item.querySelector('.galeria-item-caption span');

    if (img) img.src = srcs[fotoIndex];
    if (caption) caption.textContent = legendas[fotoIndex];
    item.classList.toggle('ativo', slot === 0);
    item.style.display = '';
  }

  dots.forEach((dot, i) => dot.classList.toggle('ativo', i === fotoAtiva));
}

function startCarousel() {
  stopCarousel();
  fotoAtiva = 0;
  updateGaleria();
  carouselInterval = setInterval(() => {
    fotoAtiva = (fotoAtiva + 1) % totalFotos;
    updateGaleria();
  }, 4000);
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function setFotoAtiva(slotIndex) {
  const items = document.querySelectorAll('.galeria-item');
  // descobre qual foto real está nesse slot
  const fotoReal = (fotoAtiva + slotIndex) % totalFotos;
  fotoAtiva = fotoReal;
  updateGaleria();
  stopCarousel();
  carouselInterval = setInterval(() => {
    fotoAtiva = (fotoAtiva + 1) % totalFotos;
    updateGaleria();
  }, 4000);
}
