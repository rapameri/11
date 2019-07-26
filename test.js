let playcount = Number(localStorage.getItem('satori11pc')) || 0;
let scrollmarkhidden = true;
let playing = false;
let rebuke = false;
function wait(msec){
  return new Promise(resolve=>{
    setTimeout(()=>{resolve()},msec);
  });
}
function hideAshowB(A,B,ms){
  (()=>{
    if (A) {
      A.classList.remove('outspeak');
      A.classList.add('inmind');
      return wait(500);
    } else return new Promise(r=>{r()});
  })().then(()=>{
    if (A) {
      A.classList.add('introhidden');
    }
    return wait(ms);
  }).then(()=>{
    if (B) {
      B.classList.remove('introhidden');
      B.classList.add('inmind');
      return wait(500);
    } else return new Promise(r=>{r()});
  }).then(()=>{
    if (B) {
      B.classList.remove('inmind');
      B.classList.add('outspeak');
    }
  });
};
function introgame(){
  playing = true;
  const intro = document.getElementById('intro');
  const parts = intro.querySelectorAll('.introparts');
  parts[2].classList.add('introhidden');
  parts[3].classList.add('introhidden');
  const reslp = parts[2].querySelectorAll('p');
  reslp[0].classList.add('introhidden');
  reslp[1].classList.add('introhidden');
  (()=>{
    return wait(500);
  })().then(()=>{
    window.alert('数字を一つ思い浮かべてください');
    //intro.classList.remove('inmind');
    //intro.classList.add('outspeak');
    hideAshowB(null,parts[0],0);
    parts[0].innerHTML = parts[0].innerHTML.replace(/\./g,'');
    (function(n){
      n--;
      parts[0].innerHTML += '.';
      if (n > 0) setTimeout(arguments.callee,614,n);
    })(11);
    return wait(3100);
  }).then(()=>{
    hideAshowB(parts[0],parts[1],0);
    return wait(500);
  });
}
function innext(result){
  playing = false;
  const intro = document.getElementById('intro');
  const parts = intro.querySelectorAll('.introparts');
  hideAshowB(parts[1],parts[2],0);
  setTimeout(()=>{
    parts[3].classList.remove('introhidden');
    scrollmarkhidden = false;
  },2000);
  const reslp = parts[2].querySelector(result);
  reslp.classList.remove('introhidden');
  localStorage.setItem('satori11pc',++playcount);
}

document.addEventListener('DOMContentLoaded',function(){
  (()=>{
    return wait(310);
  })().then(()=>{
    const intro = document.getElementById('intro');
    intro.classList.remove('inmind');
    intro.classList.add('outspeak');
  });
  if (!playcount) {
    introgame();
  } else {
    const parts = intro.querySelectorAll('.introparts');
    parts[2].classList.remove('introhidden');
    parts[3].classList.remove('introhidden');
    scrollmarkhidden = false;
  }
  window.addEventListener('scroll',function(){
    const scrollElem = document.scrollingElement || document.documentElement || document.body;
    if (!scrollmarkhidden && scrollElem.scrollTop > scrollElem.clientHeight / 4) {
      document.getElementById('scrollmark').classList.add('introhidden');      
      scrollmarkhidden = true;
    }
    if (playing && !rebuke && scrollElem.scrollTop > scrollElem.clientHeight / 4) {
      document.getElementById('rebuke').classList.remove('introhidden');
      rebuke = true;
    } else if (!playing && rebuke) {
      document.getElementById('rebuke').classList.add('introhidden');
      rebuke = false;
    }
  });
});

//sample viewer
function sample(x){
  const screen = document.getElementById('mediascreen');
  screen.querySelector('img#media-main').setAttribute('src','img/sample'+x+'.png');
  screen.querySelector('#media-caption').innerHTML = '';
  //event.target.parentNode.querySelector('.member-name').innerHTML;
  screen.dataset.x = x;
  screen.classList.add('show');
}
function closesample(){
  document.getElementById('mediascreen').classList.remove('show');
}
function stageshut(){
  const screen = document.getElementById('mediascreen');
  (function(){
    const ny = parseInt(screen.style.top,10) || 0;
    if (Math.abs(ny) < window.innerHeight) {
      screen.style.top = (ny + Math.sign(ny) * 100 + 1) + 'px';
      setTimeout(arguments.callee,16);
    } else {
      screen.style.top = '';
      closesample();
    }
  })();
}
function medialeaf(sign){
  const screen = document.getElementById('mediascreen');
  (function(){
    const nx = parseInt(screen.style.left,10) || 0;
    if (Math.abs(nx) < window.innerWidth) {
      screen.style.left = nx + sign * (window.innerWidth / 10) + 'px';
      setTimeout(arguments.callee,16);
    } else {
      screen.style.left = '';
      closesample();
      let x = Number(screen.dataset.x) + sign;
      x = (x >= 12) ? (x - 12) : (x < 0) ? (x + 12) : x;
      setTimeout(sample,16,x);
    }
  })();
}
document.addEventListener('DOMContentLoaded',function(){
  //control by left&right key
  document.addEventListener('keyup', function(e){
    const mediascreen = document.getElementById('mediascreen');
    const kc = e.keyCode;
    const showing = mediascreen.classList.contains('show');
    if (showing) {
      if (kc==37 || kc==39) { //left:37,right:39
        medialeaf(38 - kc);
      }
    }
  });
  //swipe
  let touchStartX,touchStartY,touchMoveX,touchMoveY;
  window.addEventListener('touchstart',function(e){
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
    touchMoveX = touchStartX;
    touchMoveY = touchStartY;
  });
  window.addEventListener('touchmove',function(e){
    const mediascreen = document.getElementById('mediascreen');
    touchMoveX = e.changedTouches[0].pageX;
    touchMoveY = e.changedTouches[0].pageY;
    if (mediascreen.classList.contains('show')) {
      const screen = document.getElementById('mediascreen');
      if (Math.abs(touchMoveX-touchStartX)>51 && Math.abs(touchMoveY-touchStartY)<51) {
        const a = window.innerWidth / 2;
        screen.style.left = a * Math.atan((touchMoveX - touchStartX) / a) + 'px';
      } else if (Math.abs(touchMoveY-touchStartY)>51 && Math.abs(touchMoveX-touchStartX)<51) {
        const b = window.innerHeight / 2;
        screen.style.top = b * Math.atan((touchMoveY - touchStartY) / b) + 'px';
      } else {
        screen.style.left = '';
        screen.style.top = '';
      }
      e.preventDefault();
      return false;
    }
  },{passive:false});
  window.addEventListener('touchend',function(e){
    const mediascreen = document.getElementById('mediascreen');
    if (mediascreen.classList.contains('show')) {
      const screen = document.getElementById('mediascreen');
      const divX = touchMoveX - touchStartX;
      const divY = touchMoveY - touchStartY;
      if (Math.abs(divX) > Math.min(window.innerWidth/3,110) && Math.abs(touchMoveY-touchStartY)<110) {
        medialeaf(divX > 0 ? 1 : -1);
      } else if (Math.abs(divY) > Math.min(window.innerHeight/3,110) && Math.abs(touchMoveX-touchStartX)<110) {
        stageshut();
      } else {
        screen.style.left = '';
        screen.style.top = '';
      }
    }
  },{passive:false});
  //preventDefaults
  document.addEventListener('keydown',function(e){
    const kc = e.keyCode;
    const mediascreen = document.getElementById('mediascreen');
    if (mediascreen.classList.contains('show') && (kc==38 || kc==40)) e.preventDefault();
  });
  document.addEventListener('mousewheel',function(e){
    const mediascreen = document.getElementById('mediascreen');
    if (mediascreen.classList.contains('show')) e.preventDefault();
  },{passive:false});
});