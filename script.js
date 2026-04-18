/* ===== NAVEGAÇÃO ===== */
function go(id){
  document.getElementById('home').style.display='none';
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});

  if(id==='historia') galInit();
}
function back(){
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('on'));
  document.getElementById('home').style.display='';
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ===== GALERIA MOMENTOS ===== */
const galPhotos=[
  {src:'foto1.jpg', caption:'Minha primeira palestra'},
  {src:'foto2.jpg', caption:'Primeira rodada de negócios'},
  {src:'foto3.jpg', caption:'Participação no maior evento de finanças do Brasil'},
  {src:'foto4.jpg', caption:'Palestra sobre: "Como cuidar do nosso dinheiro e dos nossos sonhos"'},
  {src:'foto5.jpg', caption:'Participação como mentora financeira de empresários'},
];

let galIdx=0, galTimer=null, galItemW=0;

function galInit(){
  const track=document.getElementById('galTrack');
  const dots=document.getElementById('galDots');
  track.innerHTML='';dots.innerHTML='';

  galPhotos.forEach((p,i)=>{
    // item
    const d=document.createElement('div');
    d.className='gal-item'+(i===0?' active':'');
    d.onclick=()=>galGo(i);
    d.innerHTML=`<img src="${p.src}" alt="${p.caption}"><div class="gal-caption">${p.caption}</div><div class="gal-progress"></div>`;
    track.appendChild(d);

    // dot
    const dot=document.createElement('button');
    dot.className='gal-dot'+(i===0?' active':'');
    dot.onclick=()=>galGo(i);
    dots.appendChild(dot);
  });

  setTimeout(()=>{
    const first=track.querySelector('.gal-item');
    if(first) galItemW=first.offsetWidth+12;
    galGo(0);
  },100);

  galAuto();
}

function galGo(i){
  galIdx=i;
  const track=document.getElementById('galTrack');
  const items=track.querySelectorAll('.gal-item');
  const dots=document.getElementById('galDots').querySelectorAll('.gal-dot');
  const wrap=document.querySelector('.gal-track-wrap');

  if(!items.length)return;
  galItemW=items[0].offsetWidth+12;

  const wrapW=wrap.offsetWidth;
  const offset=galIdx*galItemW - (wrapW/2 - items[0].offsetWidth/2);
  const maxOff=track.scrollWidth - wrapW;
  const clamp=Math.max(0,Math.min(offset,maxOff));

  track.style.transform=`translateX(-${clamp}px)`;

  items.forEach((el,j)=>el.classList.toggle('active',j===i));
  dots.forEach((el,j)=>el.classList.toggle('active',j===i));

  galAuto();
}

function galMove(dir){
  let n=galIdx+dir;
  if(n<0)n=galPhotos.length-1;
  if(n>=galPhotos.length)n=0;
  galGo(n);
}

function galAuto(){
  clearInterval(galTimer);
  galTimer=setInterval(()=>{
    galMove(1);
  },5000);
}
