function getElementsByClassName(fatherId,tagName,className){
       node = fatherId&&document.getElementById(fatherId) || document;
       tagName = tagName || "*";
       className = className.split(" ");
       var classNameLength = className.length;
       for(var i=0,j=classNameLength;i<j;i++){
        //创建匹配类名的正则
        className[i]= new RegExp("(^|\s)" + className[i].replace(/-/g, "\-") + "(\s|$)");
       }
       var elements = node.getElementsByTagName(tagName);
       var result = [];
       for(var i=0,j=elements.length,k=0;i<j;i++){//缓存length属性
        var element = elements[i];
        while(className[k++].test(element.className)){//优化循环
         if(k === classNameLength){
          result[result.length] = element;
          break;
         } 
        }
        k = 0;
       }
       return result;
}

//  运动框架
function cssStyle(obj,prop,value)
{
  if(arguments.length==2)
  {
    if(obj.currentStyle)
    return parseFloat(obj.currentStyle[prop]);
    else
    return parseFloat(getComputedStyle(obj,false)[prop]);
  }
  else
  obj.style[prop]=value+'px';
  
}

var timer=null;
function sport(obj,json,fn)
{
  clearInterval(obj.timer);
  var val=0;
  var speed=0;
  var flag=true;
  obj.timer=setInterval(function(){
    for(var name in json)
    {
    if(name=='opacity')
    val=Math.round(cssStyle(obj,name)*100);
    else
    val=cssStyle(obj,name);
    
    speed=(json[name]-val)/10;
    speed=speed>0?Math.ceil(speed):Math.floor(speed);
    
    if(val!=json[name])
    {
    flag=false; 
    }
    else
    {
      flag=true;
      }
    
    if(name=='opacity')
    {
      obj.style.opacity=(speed+val)/100;
      obj.style.filter='alpha(opacity:'+(val+speed)+')';
      
    }
    else
    cssStyle(obj,name,val+speed);
    
    }
    
    if(flag)
    {
      clearInterval(obj.timer);
      if(fn)  fn();
    }
    
    
    
    
    
    },20);
  
  
  
  
};





