//获取元素
var input_left=document.getElementById("input_left");
var input_right=document.getElementById("input_right");
var output_left=document.getElementById("output_left");
var output_right=document.getElementById("output_right");
var inputText=document.getElementById("inputText");//取出输入的值
var p=document.getElementById("number");

function add_input(){
	
	if(inputText.value==""){
		alert("数据不能为空");
		inputText.value="";
		return;
	}else{
		var addReg=/^\d+$/;
		if(!addReg.test(inputText.value)){
		alert("请输入一个数字！");
		inputText.value="";
		return;}
		  }
}
//初始化数据数组

var data = [];

//渲染列表
function renderData(){
    var a = "";
	var len=data.length;
	for(var i=0; i<len; i++){
		if(data[i]!=""){
			a += "<a class='number'>"+data[i]+"</a>";
	}
}
	var p=document.getElementById("number");
	p.innerHTML=a;
	console.log(p);
	return;
}

//左侧入
input_left.addEventListener('click',function(){
	add_input();
	data.unshift(inputText.value);
	renderData();
});
//右侧入
input_right.addEventListener('click',function(){
	add_input();
	data.push(inputText.value);
	renderData();
});
//左侧出
output_left.addEventListener('click',function(){
	alert("删除的元素的值为："+data[0]);
	data.shift();
	renderData();
	
});
//右侧出
output_right.addEventListener('click',function(){
	alert("删除的元素的值为："+data[data.length-1]);
	data.pop();
	renderData();
});

//点击任何一个元素，则该元素会被删除



	
	


