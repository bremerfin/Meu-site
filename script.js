/* ===== NAVEGAÇÃO ===== */
function go(id){
  document.getElementById('home').style.display='none';
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  const sec=document.getElementById(id);
  sec.classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});

  // Inicia galeria se entrar em história
  if(id==='historia') initGallery();
}
function bk(){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  document.getElementById('home').style.display='';
  window.scrollTo({top:0,behavior:'smooth'});
  stopGallery();
}

/* ===== GALERIA AVANÇADA ===== */
const galPhotos=[
  {src:'foto1.jpg', caption:'Bastidores de um dia de conteúdo'},
  {src:'foto2.jpg', caption:'Ensinando sobre finanças'},
  {src:'foto3.jpg', caption:'Workshop de planejamento'},
  {src:'foto4.jpg', caption:'Aula ao vivo sobre investimentos'},
  {src:'foto5.jpg', caption:'Nos bastidores da RAIA'},
  {src:'foto6.jpg', caption:'Construindo futuros'},
  {src:'foto7.jpg', caption:'Palestra sobre liberdade financeira'},
];

let galIdx=0;
let galTimer=null;
let galPerView=3;

function getPerView(){
  return window.innerWidth<=700 ? 2 : 3;
}

function initGallery(){
  galPerView=getPerView();
  const track=document.getElementById('galTrack');
  const dots=document.getElementById('galDots');
  if(!track)return;

  // Monta itens
  track.innerHTML='';
  galPhotos.forEach((p,i)=>{
    const item=document.createElement('div');
    item.className='gal-item';
    item.onclick=()=>galGoTo(i);
    item.innerHTML=`
      <img src="${p.src}" alt="${p.caption}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%23e8e8e3%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22>📸</text></svg>'"/>
      <div class="gal-caption">${p.caption}</div>
      <div class="gal-progress"></div>
    `;
    track.appendChild(item);
  });

  // Monta dots
  dots.innerHTML='';
  galPhotos.forEach((_,i)=>{
    const dot=document.createElement('button');
    dot.className='gal-dot';
    dot.onclick=()=>galGoTo(i);
    dots.appendChild(dot);
  });

  galIdx=0;
  galUpdate();
  startGalTimer();
}

function galUpdate(){
  const track=document.getElementById('galTrack');
  const items=track.querySelectorAll('.gal-item');
  const dots=document.querySelectorAll('.gal-dot');
  galPerView=getPerView();

  // Tamanho de cada item
  const gap=12;
  const wrapWidth=track.parentElement.offsetWidth;
  const itemWidth=(wrapWidth - gap*(galPerView-1))/galPerView;

  items.forEach((item,i)=>{
    item.style.width=itemWidth+'px';
    item.classList.toggle('active',i===galIdx);
  });

  dots.forEach((d,i)=>d.classList.toggle('active',i===galIdx));

  // Calcula offset para centralizar o ativo
  const maxOffset=(items.length-galPerView)*(itemWidth+gap);
  let centerIdx=galIdx-Math.floor(galPerView/2);
  centerIdx=Math.max(0,Math.min(centerIdx, galPhotos.length-galPerView));
  const offset=centerIdx*(itemWidth+gap);

  track.style.transform=`translateX(-${Math.min(offset,maxOffset)}px)`;
}

function galGoTo(i){
  galIdx=i;
  galUpdate();
  restartGalTimer();
}

function galNext(){
  galIdx=(galIdx+1)%galPhotos.length;
  galUpdate();
  restartGalTimer();
}

function galPrev(){
  galIdx=(galIdx-1+galPhotos.length)%galPhotos.length;
  galUpdate();
  restartGalTimer();
}

function startGalTimer(){
  stopGallery();
  galTimer=setInterval(()=>{
    galIdx=(galIdx+1)%galPhotos.length;
    galUpdate();
  },5000);
}

function restartGalTimer(){
  startGalTimer();
}

function stopGallery(){
  if(galTimer){clearInterval(galTimer);galTimer=null}
}

// Botões
document.addEventListener('DOMContentLoaded',()=>{
  const prev=document.getElementById('galPrev');
  const next=document.getElementById('galNext');
  if(prev) prev.onclick=galPrev;
  if(next) next.onclick=galNext;
});

// Resize
window.addEventListener('resize',()=>{
  if(document.getElementById('historia')?.classList.contains('on')){
    galUpdate();
  }
});
