// --- Galeria ---
var images = [
  'foto1.jpg','foto2.jpg','foto3.jpg','foto4.jpg','foto5.jpg'
];
var current = 0;
var total = images.length;
var autoInterval = null;

function renderGallery() {
  var gg = document.getElementById('gg');
  if (!gg) return;
  var html = '';
  for (var i = 0; i < total; i++) {
    html += '<div class="gi" style="transform:translateX(-' + (current * 292) + 'px)">';
    html += '<img src="' + images[i] + '" alt="Foto ' + (i + 1) + '"/>';
    html += '</div>';
  }
  gg.innerHTML = html;
  var cnt = document.getElementById('cnt');
  if (cnt) cnt.textContent = ('0' + (current + 1)).slice(-2) + ' / ' + ('0' + total).slice(-2);
}

function mv(dir) {
  current = (current + dir + total) % total;
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
  var secs = document.querySelectorAll('.sec');
  for (var i = 0; i < secs.length; i++) {
    secs[i].classList.remove('on');
  }
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('on');
    window.scrollTo(0, 0);
  }
  if (id === 'historia') {
    startAuto();
  }
}

function bk() {
  stopAuto();
  var secs = document.querySelectorAll('.sec');
  for (var i = 0; i < secs.length; i++) {
    secs[i].classList.remove('on');
  }
  document.getElementById('home').style.display = '';
  window.scrollTo(0, 0);
}

// --- Init ---
renderGallery();
