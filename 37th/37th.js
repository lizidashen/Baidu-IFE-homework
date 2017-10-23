
function g(el) { return document.getElementById(el); }

//点击页面头部登录按钮,显示浮出层
function coverIn(){
	g("loginPanel").style.display="block";
	g("cover").style.display="block";
}  
//点击半透明遮罩或浮出层顶部关闭按钮,关闭浮出层
function coverOut(){
	g("loginPanel").style.display="none";
	g("cover").style.display="none";
} 
//浮出层输入栏的焦点效果


//拖拽浮出层顶部,可使其移动
function drag(){
	var oTitle=g("login_logo");
	oTitle.onmousedown = fnDown;
	// 释放鼠标，清除文档鼠标按下起来后的事件执行
	oTitle.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
}
//拖拽浮出层顶部,可使其移动
function fnDown(event){
		var oDrag=g("loginPanel"),
	    // 光标按下时光标到视口的距离减去浮动层到视口的距离
	    disX=event.clientX-oDrag.offsetLeft,
	    disY=event.clientY-oDrag.offsetTop;
		// 移动，即文档鼠标移动的事件执行
		document.onmousemove=function(event){
		    fnMove(event,disX,disY);
		}	
	}

function fnMove(e,posX,posY){
    var oDrag=g("loginPanel"),
    	// 
        l=e.clientX-posX,
        t=e.clientY-posY,
        winW=document.documentElement.clientWidth,
        winH=document.documentElement.clientHeight,
        maxW=winW-oDrag.offsetWidth,
        maxH=winH-oDrag.offsetHeight;
    if(l<0){
      l=0;
    }else if(l>maxW){
      l=maxW;
    }
    if(t<0){
      t=0;
    }else if(t>maxH){
      t=maxH;
    }

    oDrag.style.left=l+'px';
    oDrag.style.top=t+'px';
    
}
window.onload = drag;