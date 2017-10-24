//创建下拉列表并将初始值设为当前日期
function selectBox(){
	var $disYear = $("#disYear");
	var $disMonth = $("#disMonth");
	var $myText = $(".my-text");
	for (var i=1950; i<2050; i++){
		//创建文本节点<option>,即下拉菜单
		var $optionYear = $("<option></option>");
		$optionYear.html(i + "年");
		$disYear.append($optionYear);	
	}
	for (var j=1; j<13; j++){
		//创建文本节点<option>，即下拉菜单
		var $optionMonth = $("<option></option>");
		$optionMonth.html(j  + "月");
		$disMonth.append($optionMonth);	
	}
	
	//创建时间变量
	var currentDate = new Date();
	//取现在的时间 年 月
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth();
	currentMonth = (currentMonth<10)?("0"+currentMonth):currentMonth;
	//把现在的时间 年 月 作为text的value值
	$myText.val(currentYear + "年" + currentMonth +"月");
}

//创建日历主体---首行
function buildTable(){
	var $myTable = $("#myTable");
	var $tableHead = $("<thead id='myTableHead'></thead>");
	var $tableTr = $("<tr></tr>");
	var week = ["日", "一", "二", "三", "四", "五", "六"];
	//each函数遍历week数组
	$.each(week, function(index,value) {
		var $tableTh=("<th>"+value+"</th>");
		$tableTr.append($tableTh);
	});
	$tableHead.append($tableTr);
	$myTable.append($tableHead);
	
	//创建日历主体---其他行
	var $tableBody = $("<table id='myTableBody'></table>");
	for (var j=0;j<6;j++) {
		// 因为要写六行，所以六次循环，一共增加到42个位置
		var $tableTr = $("<tr></tr>");
		for(var k = 0; k < 7; k++) {
			var $tableTd = $("<td></td>");
			$tableTr.append($tableTd)
		}
		$tableBody.append($tableTr)
	}
	$myTable.append($tableBody);
}

//setFullYear函数来确定当前年当前月的第一天是星期几
function getWeek(){
	var yearMonth = new Date();
	//此处的1指的是本月1号,设定时间为#disYear年#disMonth-1月 1 号
	yearMonth.setFullYear(parseInt($("#disYear").val()),(parseInt($("#disMonth").val())-1),1);
	//getDay()是确定这一天是星期几
	console.log(yearMonth);
	var selectDay = yearMonth.getDay();
	return selectDay;
	
	
}
//确定一个月有多少天
function getdate(){
	//取出当前年份和月份的value值
	var disYearNum=parseInt($("#disYear").val());
	var naturalMonth=parseInt($("#disMonth").val());
	if(naturalMonth==1||naturalMonth==3||naturalMonth==5||naturalMonth==7||naturalMonth==8||naturalMonth==10||naturalMonth==12){
        return 31;
    } else if (naturalMonth == 4 || naturalMonth == 6 || naturalMonth == 9 || naturalMonth == 11) {
        return 30;
    } else if ((disYearNum % 100 != 0 && disYearNum % 4 == 0) || disYearNum % 400 == 0) {
        return 29;
    } else {
        return 28;
    }
}

//给日历内写入日期
function buildDate(){	
	var weekday = getWeek();//第一天是星期几，即从星期几开始算
	console.log(weekday);
	var dateNum = getdate();//本月有多少天，即循环多少次
	var date=1;
	
	//重写日历 ,令每个td的值重新归零  
	$("td").each(function(){
		$(this).text("");
	});
	// 取得所有<td>
	let tableTds = document.getElementsByTagName("td");
	for (var m = 0; m <dateNum; m++) {
        tableTds[weekday].innerText = date;
        weekday++;
        date++;
    }
	for(i=0;i<42;i++){
			//console.log(tableTds[i]);
	}
}
//选取下拉列表时刷新日历主体与页面头部 "xxxx年xx月" 字样
function refreshTable(){
	$("select").click(function(){
		
		buildDate();
		var $disYear = $("#disYear").val();
		var $disMonth = parseInt($("#disMonth").val());
		 $disMonth = $disMonth < 10 ? "0" + $disMonth : $disMonth;
        $("#myText").val($disYear + $disMonth + "月");
	})
}
//点击日历主体选取日期时刷新页面头部 "xxxx年xx月xx日" 字样
function showDate(){
    $("tr td").click(function() {
    	var $disDay=$(this).text();
    	var $disYear = $("#disYear").val();
		var $disMonth = parseInt($("#disMonth").val());
		 $disMonth = $disMonth < 10 ? "0" + $disMonth : $disMonth;
		$(".my-text").val($disYear + $disMonth + "月" + $disDay + "日");
    })
}  

window.onload = function () {
    selectBox();
    buildTable();
    buildDate();
    refreshTable();
    showDate();
}
