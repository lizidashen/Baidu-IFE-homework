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
// 跨浏览器事件绑定 addEventHandler 方法
function addEventHandler(ele,event,hanlder){
	if(ele.addEventListener){
		//支持DOM标准的浏览器的元素添加事件的处理方法
		ele.addEventListener(event,hanlder,false);
	}else if(ele.attachEvent){
		// ie支持attachEvent
		ele.attachEvent("on"+event,hanlder);
	}else{
		//为一般的浏览器的事件处理方法属性赋值
		ele["on"+event]=hanlder;
	}
}

//---------------------------------------------------------------------------------------------------------------------
//以下两个函数用于随机模拟生成测试数据
function getDateStr(dat){
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;//月份是从0算起
	m = m < 10 ? '0' + m : m;//为了让个位数也占据两个位置
	var d = dat.getDate(); //获得当前日期
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




//用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

//------------------------------

// 首先取得页面的元素
var formGraTime= document.getElementById("form-gra-time");
var citySelect= document.getElementById("city-select");
var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];

//渲染图表
/* 对比两种随即颜色的取得
 function randomColor(){
	var colorArray=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	var color='#'
	for(var i = 0; i<6; i++){
		color += colorArray[Math.round(Math.random()*15)];//颜色是1-15的随机数，所以乘以15并四舍五入。
	}
	return color;//这里取16进制，循环6次，分别在#后面加6个16进制的随机数，例如#1235A1，则构成随机颜色
}
*/


function renderChart(){
	var color = "";
	var text = "";
	for(var item in chartData){
		// 获得16进制的6位数
		color = '#' + Math.floor(Math.random()* 0xffffff).toString(16);
		// 渲染数据，制成柱状图表
		text +='<div title="'+item+":"+chartData[item]+'" style="height:'+chartData[item]+'px; background-color:'+color+'"><span class="num">'+ chartData[item] +'</span></div>';
	}
	//<div title="2016-01-01:210" style="height:210px; background-color:#11d73d"></div>
	aqiChartWrap.innerHTML = text;	
}

//日、周、月的radio事件点击时的处理函数
function graTimeChange(){
//确定是否选项发生了变化，即当前页面的表单选项是否与选项的值相等
	if(pageState.nowGraTime == this.value){
		return;
	}else{
		// 若不等，则此时的nowGraTime数据得到更新
		pageState.nowGraTime=this.value;
	}
// 确定了新的nowGraTime后，设置对应的数据
	initAqiChartData();
//调用图标渲染函数
	renderChart();
}

//selsect发生变化时的处理函数，方法同上
function citySelectChange(){
// 确定是否选项发生了变化 
	if(pageState.nowSelectCity == this.value){
		return;
	}else{
		pageState.nowSelectCity=this.value;
	}
	console.log(pageState.nowSelectCity);
// 设置对应数据 
	initAqiChartData();
// 调用图表渲染函数
	renderChart();
}
	
//初始化日、周、月的raido时间，当点击时，调用函数graTimeChange
function initGraTimeFrom(){
	var pageRadio= document.getElementsByTagName("input");
	
	for (var i=0; i<pageRadio.length; i++){
		addEventHandler(pageRadio[i],"click", graTimeChange);
		
	}
}
//初始化城市selsect下拉选择框中的选项
function initCitySelector(){
	//读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选择
	var cityList="";
	for(var i in aqiSourceData){
		// 这里注意要用 += 才能都加载上
		cityList+="<option>" + i +"</option>";
		
	}
	citySelect.innerHTML = cityList;
	//给select设置事件绑定函数addEventHandler，当选项发生变化时调用函数citySelectChange
	addEventHandler(citySelect,"change", citySelectChange);
}


//初始化图表所需要的数据格式
function initAqiChartData(){
	
	//将原始的源数据处理成图表需要的数据格式,现在的数据存储在aqiSourceData中
	var nowCityData = aqiSourceData[pageState.nowSelectCity];
		
	// nowCityData 是确定了当前选项的三个月的降水数值的数组。
	// nowCityData[key]是降水量的数值，key是日期
	
	//处理好的数据存储到chartData中
	
	// 当选择的时间为“日”时
	if(pageState.nowGraTime == "day"){
		chartData=nowCityData;
	}
	// 当选择的时间为“周”时
	if(pageState.nowGraTime=="week"){
		// 初始化chartData的数据，并计算周的数据
		chartData={};
		var countSum=0;
		var daySum=0;
		var week=0;
		for(var item in nowCityData){
			
			countSum += nowCityData[item];
			daySum ++;
			// 当前日期的getDay为6，即为周六的时候，计入下一周
			if((new Date(item)).getDay()==6){
				week ++;
				// 此时新的chartData的数据，即每一周，和对应的总数目除以天数得到周平均值。
				chartData["第"+ week+ "周"] = Math.floor(countSum/daySum);
				//初始化countSum和daySum,重新计算。需要注意的是，item迭代不停
				countSum=0;
				daySum=0;
			}
		}
		// 当daySum无法初始化，说明无法算入一周，此时仍旧计算平均值
		if(daySum!=0){
		week++;
		chartData["第"+ week+ "周"] = Math.floor(countSum/daySum);
		}
	}
	// 当选择的时间为“月”时
	if(pageState.nowGraTime=="month"){
		// 初始化chartData的数据，并计算周的数据
		chartData={};
		var countSum=0;
		var daySum=0;
		var month=0;
		for(var item in nowCityData){
			
			countSum += nowCityData[item];
			daySum ++;
			// 当前日期的getMonth为当月日期，小于最大日期时，getMonth和month相等。
			if((new Date(item)).getMonth() !== month){
				month ++;
				// 此时新的chartData的数据，即每一月，和对应的总数目除以天数得到月平均值。
				chartData["第"+ month+ "月"] = Math.floor(countSum/daySum);
				//初始化countSum和daySum,重新计算。需要注意的是，item迭代不停
				countSum=0;
				daySum=0;
			}
		}
		// 当daySum无法初始化，说明无法算入一周，此时仍旧计算平均值
		if(daySum!=0){
		month++;
		chartData["第"+ month+ "周"] = Math.floor(countSum/daySum);
		}
	}
}
	


//初始化函数
function init(){
	initGraTimeFrom();
	initCitySelector();
	initAqiChartData();
	renderChart();
}

window.onload = init();




















































































































