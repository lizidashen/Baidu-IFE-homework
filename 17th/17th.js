// JavaScript Document/* 数据格式演示
/* 数据格式演示var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

//以下两个函数用于随机模拟生成测试数据
function getDateStr(dat){
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;//月份是从0算起
	m = m < 10 ? '0' + m : m;//为了让个位数也是占据两个位置
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed){
	var returnData ={};//新建一个对象，是粒度构成的
	var dat = new Date("2016-01-01");//创建一个日期对象dat，则函数从dat的值开始计算，如果不写则会从当下时间算起
	var datStr = '';
	for (var i = 1; i<92;i++){
		datStr = getDateStr(dat);//即从i=1算起的每个时间点，模式为"2016-01-01"
		returnData[datStr] = Math.ceil(Math.random()*seed);//粒度为随机数乘以倍数。对每个时间点计算出粒度
		dat.setDate(dat.getDate() +1);//循环处理，直到i取到91，则获取到全部数值，相当于i++
	}
	return returnData;//此时的returnData则构成了基础数据。
}

//生成随机颜色
function randomColor(){
	var colorArray=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	var color='#'
	for(var i = 0; i<6; i++){
		color += colorArray[Math.round(Math.random()*15)];//颜色是1-15的随机数，所以乘以15并四舍五入。
	}
	return color;//这里取16进制，循环6次，分别在#后面加6个16进制的随机数，例如#1235A1，则构成随机颜色
}

var aqiSourceData={
	"北京":randomBuildData(500),
	"上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
//建立每个城市的数据库，seed不同，则随机的范围不同，但是同样的seed，由于都是随机的，所以数据也不一样。至此基础数据构建完毕


//当前选择的日期粒度和城市
var graTimeNow=function(){
	var graTimeForm=document.getElementsByName("form-gra-time");
	
	for (var i=1;i<graTimeForm.length;i++){
		if(graTimeForm[i].checked){
			return graTimeForm[i].value;
		}
	}
}
var selectCityNow=function(){
	document.getElementById("city-select").value;
}

//用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    }

//渲染图表
function renderChart(){
	var str="";
	for(var i in chartDada){
		var colorNow=randomColor();
		
		str +='<div class="box" style='
		
	}
	
}

//日、周、月的radio事件点击时的处理函数
function graTimeChange(){
//确定是否选项发生了变化
	
//设置对应的数据
	
//调用图标渲染函数
}

//selsect发生变化时的处理函数
function citySelectChange(){
// 确定是否选项发生了变化 

// 设置对应数据

// 调用图表渲染函数
}

//初始化日、周、月的raido时间，当点击时，调用函数graTimeChange
function initGraTimeFrom(){
	
}
//初始化城市selsect下拉选择框中的选项
function initCitySelector(){
	//读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选择
	
	//给select设置事件，当选项发生变化时调用函数citySelectChange
}


//初始化图表所需要的数据格式
function initAqiChartData(){
	//将原始的源数据处理成图表需要的数据格式
	//处理好的数据存储到chartData中
}

//初始化函数
function init(){
	initGraTimeFrom();
	initCitySelector();
	initAqiChartData();
}

init();




















































































































