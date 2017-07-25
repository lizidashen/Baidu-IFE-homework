// Hello.
//
// This is JSHint, a tool that helps to detect errors and potential
// problems in your JavaScript code.
//
// To start, simply enter some JavaScript anywhere on this page. Your
// report will appear on the right side.
//
// Additionally, you can toggle specific options in the Configure
// menu.


/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */


var aqiData = {};
var city_input=document.getElementById("city");
var air_input=document.getElementById("air");

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=city_input.value.trim();//注意html文件中city一定要有value属性
	var air=air_input.value.trim();
	//对输入的城市及空气质量指数进行验证
	if (city=="") {
		alert("城市名称不能为空");
		city_input.focus();
		return;
	}else{
		var cityReg= /^[a-zA-Z\u4E00-\u9FA5]+$/;
		if(!cityReg.test(city)){
			alert("城市名称必须是中英文字符！");
			city_input.focus();
			return;
		}
	}
	if (air==""){
		alert("空气质量不能为空");
		air_input.focus();
		return;
	}else{
		var airReg=/^\d+$/;
		if(!airReg.test(air)){
			alert("空气质量指数必须为整数~");
			air_input.focus();
			return;
	}
  }
	//把获得的数据加到数据列表中
	aqiData[city]=air;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var td = '<tr>'+'<th>'+'城市'+'</th>'+'<th>'+'空气质量'+'</th>'+'<th>'+'操作'+'</th>'+'</tr>';
	for(city in aqiData){
		
		td += '<tr><td>'+city+'</td><td>'+aqiData[city]+"</td><td><button type='button' onclick='delBtnHandle(\""+ city + "\")'>删除</button></td></tr>";	
	}
	var aqi_table=document.getElementById("cityAir");
	aqi_table.innerHTML=td;//注意innerHTML不要在for循环里面
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}
function init(){

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add").addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
}
window.onload = function(){
	init();}
// JavaScript Document
