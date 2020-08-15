var vido=document.getElementsByClassName('idx-video')[0]
window.onload=function(){
    vido.play()
}
window.onscroll=function(){
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//   console.log("滚动距离" + scrollTop);

  if(scrollTop>400){
    vido.pause()
    console.log(1)
  }else{
    vido.play()
    console.log(2)
  }
}