var upurl=document.referrer;//上一级页面
var url = document.location.href;//当前url
var ip=returnCitySN["cip"];
var type=type||'1';
document.write("<script src='/tongji.php?type="+type+"&ip="+ip+"&url="+url+"&upurl="+upurl+"&rand="+Math.random()*1000+"'></script>");

