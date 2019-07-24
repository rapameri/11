//window.alert('数字を一つ思い浮かべてください');
document.addEventListener('DOMContentLoaded',function(){
  window.addEventListener('scroll',function(){
    const scrollElem = document.scrollingElement || document.documentElement || document.body;
    const s = scrollElem.scrollTop;
    document.title = s;
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