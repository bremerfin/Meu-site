// ===== script.js =====

// --- Galeria de fotos ---
var captions = [
  'Minha primeira palestra "Renda fixa: Cresça seu dinheiro com inteligência"',
  "Primeira rodada de negócios",
  "Maior evento de finanças do Brasil",
  'Palestra sobre "Como cuidar do dinheiro e dos nossos sonhos"',
  "Evento como mentora financeira de outros empresários"
];
var photos = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"];
var total = 5;
var current = 0;
var autoInterval = null;

function getVisibleCount() {
  return window.innerWidth <= 620 ? 2 : 3;
}

function renderGallery() {
  var track = document.getElementById('gg');
  var counter = document.getElementById('cnt');
  if (!track) return;

  var show = getVisibleCount();
  var pct = show === 2 ? '50%' : '33.333%';
  var gap = show === 2 ? 6 : 8;
  var html = '';

  for (var i = 0; i < show; i++) {
    var idx = (current + i) % total;
    var activeClass = i === 0 ? ' active' : '';

    html += '<div class="gallery-item' + activeClass + '" style="flex:0 0 calc(' + pct + ' - ' + gap + 'px)">';
    html += '  <img src="' + photos[idx] + '" alt="' + captions[idx] + '" onerror="this.outerHTML=\'<div class=gallery-placeholder>📸</div>\'" />';
    html += '  <div class="gallery-caption">';
    html += '    <span class="gallery-caption-num">0' + (idx + 1) + '</span>';
    html += '    <span class="gallery-caption-text">' + captions[idx] + '</span>';
    html += '  </div>';
    html += '</div>';
  }

  track.innerHTML = html;
  counter.textContent = '0' + (current + 1) + ' / 0' + total;
}

window.addEventListener('resize', renderGallery);

function mv(direction) {
  current = (current + direction + total) % total;
  renderGallery();
  resetAuto();
}

function startAuto() {
  stopAuto();
  current = 0;
  renderGallery();
  autoInterval = setInterval(function () {
    current = (current + 1) % total;
    renderGallery();
  }, 5000);
}

function stopAuto() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}

function resetAuto() {
  stopAuto();
  autoInterval = setInterval(function () {
    current = (current + 1) % total;
    renderGallery();
  }, 5000);
}

// --- Navegação ---
function go(id) {
  document.getElementById('home').style.display = 'none';
  document.querySelectorAll('.section').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'historia') {
    setTimeout(function () {
      document.querySelectorAll('.timeline-item').forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('visible');
        }, i * 300);
      });
    }, 200);
    startAuto();
  }
}

function bk() {
  document.querySelectorAll('.section').forEach(function (s) {
    s.classList.remove('active');
  });
  document.getElementById('home').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  stopAuto();
}
