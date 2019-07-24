window.alert('数字を一つ思い浮かべてください');
function wait(msec){
  return new Promise(resolve=>{
    setTimeout(()=>{resolve()},msec);
  });
}
function scrll(b){
  console.log(b ? 'あたり' : 'はずれ');
  const scrollElem = document.scrollingElement || document.documentElement || document.body;
  const y = scrollElem.clientHeight;
  (function(){
    if (Math.abs(scrollElem.scrollTop - y) < 11) {
      scrollTo(scrollElem.scrollLeft,y);
    } else {
      scrollTo(scrollElem.scrollLeft,(scrollElem.scrollTop-y)*2/3 + y);
      setTimeout(arguments.callee,33,y);
    }
  })(y);
}
document.addEventListener('DOMContentLoaded',function(){
  const scrollElem = document.scrollingElement || document.documentElement || document.body;
  let scrollmarkhidden = true;
  const intro = document.getElementById('intro');
  const parts = intro.querySelectorAll('.introhidden');
  const fuki0 = parts[0].classList;
  const fuki1 = parts[1].classList;
  const scrll = parts[2].classList;
  (()=>{
    fuki0.remove('introhidden');
    fuki0.add('inmind');
    return wait(500);
  })().then(()=>{
    intro.classList.remove('inmind');
    intro.classList.add('outspeak');
    //fuki1.remove('introhidden');//debug
    return wait(500);
  }).then(()=>{
    fuki0.remove('inmind');
    fuki0.add('outspeak');
    (function(n){
      n--;
      parts[0].innerHTML += '.';
      if (n > 0) setTimeout(arguments.callee,614,n);
    })(10);
    return wait(3100);
  }).then(()=>{
    fuki0.remove('outspeak');
    fuki0.add('inmind');
    return wait(500);
  }).then(()=>{
    fuki0.add('introhidden');
    fuki1.remove('introhidden');
    fuki1.add('inmind');
    return wait(500);
  }).then(()=>{
    fuki1.remove('inmind');
    fuki1.add('outspeak');
    return wait(3100);/*
  }).then(()=>{
    fuki1.remove('outspeak');
    fuki1.add('inmind');
    return wait(500);
  }).then(()=>{
    fuki1.add('introhidden');
    if (scrollElem.scrollTop < scrollElem.clientHeight / 4) {
      scrll.remove('introhidden');
      scrollmarkhidden = false;
    }*/
  });
  
  //naze?
  window.addEventListener('scroll',function(){
    if (!scrollmarkhidden && scrollElem.scrollTop > scrollElem.clientHeight / 4) {
      scrll.add('introhidden');      
      scrollmarkhidden = true;
    }
  });
  (function(b){
    //document.style.background = 
  })(0);
});
function sample(x){
  const screen = document.getElementById('mediascreen');
  screen.querySelector('img#media-main').setAttribute('src','img/sample'+x+'.png');
  screen.querySelector('#media-caption').innerHTML = '';
  //event.target.parentNode.querySelector('.member-name').innerHTML;
  screen.classList.add('show');
}
function closesample(){
  document.getElementById('mediascreen').classList.remove('show');
}
