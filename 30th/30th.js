// JavaScript Document
//名称栏的检验
window.onload=function(){
	var inputTd_01=document.getElementById("td01");
	var d01=document.getElementById("d01");
	
	var inputTd_02=document.getElementById("td02");
	var d02=document.getElementById("d02");
	
	var inputTd_03=document.getElementById("td03");
	var d03=document.getElementById("d03");

	var inputTd_04=document.getElementById("td04");
	var d04=document.getElementById("d04");

	var inputTd_05=document.getElementById("td05");
	var d05=document.getElementById("d05");
	
	var check=document.getElementById("check");
	
	var num=0;

//正则部分
	var trimReg = /^\s+|\s+$/g;  // 去除首尾空格
	var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
	var lenReg = /^.{4,16}$/;    // 长度验证
	var mailReg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
	var phoneReg =/^[1][0-9]{10}$/; 
		


//第一栏 名称
function validate_01(){
	var inputVal_01=inputTd_01.value ;
	var inputStr_01=inputVal_01.replace( chineseReg ,"--").replace(trimReg,"");
			
	if(inputStr_01.length==0){
		d01.innerHTML = "姓名不能为空";
		d01.style.color="red";
		inputTd_01.style.border="2px solid red";
	}else if(!lenReg.test(inputStr_01)){
		d01.innerHTML = "请输入长度为4~16位字符";
		d01.style.color="red";
		inputTd_01.style.border="2px solid red"; 
	}else{
		d01.innerHTML = "名称格式正确";
		d01.style.color="green";
		inputTd_01.style.border="2px solid green"; 
		num+1;
	}
}
//第一栏 名称 焦点函数
inputTd_01.addEventListener("focus", function (){
	d01.innerHTML = "必填，长度为4~16位字符";
	d01.style.color="#ccc";
	inputTd_01.style.border="2px solid #ccc";
})
//第一栏 名称 失焦函数
inputTd_01.addEventListener("blur", function (){
	validate_01();
})

//第二栏 密码
function validate_02(){
	var inputVal_02=inputTd_02.value ;
	var inputStr_02=inputVal_02.replace(trimReg,"");
			
	if(inputStr_02.length==0){
		d02.innerHTML = "密码不能为空";
		d02.style.color="red";
		inputTd_02.style.border="2px solid red";
	}else if(!lenReg.test(inputStr_02)){
		d02.innerHTML = "请输入长度为4~16位字符";
		d02.style.color="red";
		inputTd_02.style.border="2px solid red"; 
	}else{
		d02.innerHTML = "密码格式正确";
		d02.style.color="green";
		inputTd_02.style.border="2px solid green"; 
		num+1;
	}
}
//第二栏 密码 焦点函数
inputTd_02.addEventListener("focus", function (){
	d02.innerHTML = "必填，长度为4~16位字符，数字或字母";
	d02.style.color="#ccc";
	inputTd_02.style.border="2px solid #ccc";
})
//第二栏 密码 失焦函数
inputTd_02.addEventListener("blur", function (){
	validate_02();
})

//第三栏 重复密码
function validate_03(){
	var inputVal_03=inputTd_03.value ;
			
	if(inputVal_03!=inputTd_02.value){
		d03.innerHTML = "密码输入不一致";
		d03.style.color="red";
		inputTd_03.style.border="2px solid red";
	}else{
		d03.innerHTML = "密码输入一致";
		d03.style.color="green";
		inputTd_03.style.border="2px solid green";
		num+1;
	}
}
//第三栏 重复密码 焦点函数
inputTd_03.addEventListener("focus", function (){
	d03.innerHTML = "再次输入相同密码";
	d03.style.color="#ccc";
	inputTd_03.style.border="2px solid #ccc";
})
//第三栏 重复密码 失焦函数
inputTd_03.addEventListener("blur", function (){
	validate_03();
})
//第四栏 邮箱
function validate_04(){
	var inputVal_04=inputTd_04.value ;
	var inputStr_04=inputVal_04.replace(trimReg,"");
			
	if(inputStr_04.length==0){
		d04.innerHTML = "邮箱不能为空";
		d04.style.color="red";
		inputTd_04.style.border="2px solid red";
	}else if(!mailReg.test(inputStr_04)){
		d04.innerHTML = "邮箱格式错误";
		d04.style.color="red";
		inputTd_04.style.border="2px solid red";
	}else{
		d04.innerHTML = "邮箱格式正确";
		d04.style.color="green";
		inputTd_04.style.border="2px solid green"; 
		num+1;
	}
}

inputTd_04.addEventListener("focus", function (){
	d04.innerHTML = "必填，一个或多个字符@一个多个字符.一个或者多个字符";
	d04.style.color="#ccc";
	inputTd_04.style.border="2px solid #ccc";
})

inputTd_04.addEventListener("blur", function (){
	validate_04();
})
//第五栏 手机号
function validate_05(){
	var inputVal_05=inputTd_05.value ;
	var inputStr_05=inputVal_05.replace(trimReg,"");
			
	if(inputStr_05.length==0){
		d05.innerHTML = "手机号不能为空";
		d05.style.color="red";
		inputTd_05.style.border="2px solid red";
	}else if(!lenReg.test(inputStr_05)){
		d05.innerHTML = "手机格式错误";
		d05.style.color="red";
		inputTd_05.style.border="2px solid red";
	}else{
		d05.innerHTML = "手机格式正确";
		d05.style.color="green";
		inputTd_05.style.border="2px solid green"; 
		num+1;
	}
}
//第五栏 手机号
inputTd_05.addEventListener("focus", function (){
	d05.innerHTML = "必填，长度为11位数字";
	d05.style.color="#ccc";
	inputTd_05.style.border="2px solid #ccc";
})
//第五栏 手机号
inputTd_05.addEventListener("blur", function (){
	validate_05();
})

// 验证函数
function judge(){
	if(num==5){
		alert('验证成功');
	}else{
		alert('验证失败');
	}
}

check.addEventListener("click", function (){
	validate_01();
	validate_02();
	validate_03();
	validate_04();
	validate_05();
	judge();
})

}


		
