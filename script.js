/* ===== NAVEGAÇÃO ===== */
function go(id){
  document.getElementById('home').style.display='none';
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  const sec=document.getElementById(id);
  sec.classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='historia') setTimeout(initGallery,100);
}
function bk(){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  document.getElementById('home').style.display='';
  window.scrollTo({top:0,behavior:'smooth'});
  stopGallery();
}

/* ===== GALERIA ===== */
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

function getPerView(){
  return window.innerWidth<=700 ? 2 : 3;
}

function initGallery(){
  const track=document.getElementById('galTrack');
  const dots=document.getElementById('galDots');
  if(!track)return;

  track.innerHTML='';
  galPhotos.forEach((p,i)=>{
    const item=document.createElement('div');
    item.className='gal-item';
    item.setAttribute('data-index',i);
    item.onclick=()=>galGoTo(i);
    item.innerHTML=`
      <img src="${p.src}" alt="${p.caption}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%23e8e8e3%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22>📸</text></svg>'"/>
      <div class="gal-caption">${p.caption}</div>
      <div class="gal-progress"></div>
    `;
    track.appendChild(item);
  });

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
  const wrap=track.parentElement;
  const items=track.querySelectorAll('.gal-item');
  const dots=document.querySelectorAll('.gal-dot');
  const perView=getPerView();
  const gap=12;
  const wrapWidth=wrap.offsetWidth;
  const itemWidth=(wrapWidth - gap*(perView-1))/perView;

  items.forEach((item,i)=>{
    item.style.width=itemWidth+'px';
    item.classList.toggle('active',i===galIdx);

    const bar=item.querySelector('.gal-progress');
    if(bar){
      bar.style.animation='none';
      bar.offsetHeight;
      bar.style.animation='';
    }
  });

  dots.forEach((d,i)=>d.classList.toggle('active',i===galIdx));

  let startIdx=galIdx - Math.floor(perView/2);
  startIdx=Math.max(0, Math.min(startIdx, galPhotos.length - perView));
  const offset=startIdx*(itemWidth+gap);

  track.style.transform=`translateX(-${offset}px)`;
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

document.addEventListener('DOMContentLoaded',()=>{
  const prev=document.getElementById('galPrev');
  const next=document.getElementById('galNext');
  if(prev) prev.onclick=galPrev;
  if(next) next.onclick=galNext;
});

let resizeTimeout;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimeout);
  resizeTimeout=setTimeout(()=>{
    if(document.getElementById('historia')?.classList.contains('on')){
      galUpdate();
    }
  },150);
});
