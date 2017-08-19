//创建下拉列表并将初始值设为当前日期
function selectBox(){
	var $disYear = $("#disYear");
	var $disMonth = $("#disMonth");
	var $myText = $(".my-text");
	for (var i=1950; i<2050; i++){
		//创建文本节点<option>
		var $optionYear = $("<option></option>");
		$optionYear.html(i + "年");
		$disYear.append($optionYear);	
	}
	for (var j=0; j<12; j++){
		//创建文本节点<option>
		var $optionMonth = $("<option></option>");
		$optionMonth.html(j + 1 + "月");
		$disMonth.append($optionMonth);	
	}
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth() +1;
	currentMonth = (currentMonth<10)?("0"+currentMonth):currentMonth;
	$myText.val(currentYear + "年" + currentMonth +"月");
}

//创建日历主体---首行
function buildTable(){
	var $myTable = $("#myTable");
	var $tableHead = $("<thead id='myTableHead'></thead>");
	var $tableTr = $("<tr></tr>");
	var week = ["日", "一", "二", "三", "四", "五", "六"];
	$.each(week, function(index,value) {
		var $tableTh=("<th>"+value+"</th>");
		$tableTr.append($tableTh);
	});
	$tableHead.append($tableTr);
	$myTable.append($tableHead);
	
	//创建日历主体---其他行
	var $tableBody = $("<td id='myTableBody'></td>");
	for (var j=0;j<6;j++) {
		var $tableTr = $("<tr></tr>");
		for(var k = 0; k < 7; k++) {
			var $tableTd = $("<td></td>");
			$tableTr.append($tableTd)
		}
		$tableBody.append($tableTr)
	}
	$myTable.append($tableBody);
}
//确定当前年当前月的第一天是星期几
function getWeek(){
	var yearMonth = new Date();
	yearMonth.setFullYear(parseInt($("#disYear").val()),parseInt($("#disMonth").val()),1);//此处的1指的是本月1号
	var selectDay = yearMonth.getDay();//getDay()是星期
	return selectDay;
	
}
//确定一个月有多少天
function getdate(){
	var disYearNum=parseInt($("#disYear").val());
	var naturalMonth=parseInt($("#disMonth").val());
	console.log(naturalMonth)
	if(naturalMonth==1||naturalMonth==3||naturalMonth==5||naturalMonth==7||naturalMonth==8||naturalMonth==10||naturalMonth==112){
        return 31;
    } else if (naturalMonth == 4 || naturalMonth == 6 || naturalMonth == 9 || naturalMonth == 11) {
        return 30;
    } else if ((disYearNum % 100 != 0 && disYearNum % 4 == 0) || disYearNum % 400 == 0) {
        return 29;
    } else {
        return 28;
    }
}
//清空日历



//给日历内写入日期
function buildDate(){
	
	var weekday = getWeek();//第一天是星期几，即从星期几开始算
	var dateNum = getdate();//本月有多少天，即循环多少次
	var date=1;
	var tableTds = document.getElementsByTagName("td");
	//清空日历
	$("tr td").each(function(){
		$(this).html("");
	})
	
    //重写日历
    
    for (var m = 0; m < dateNum; m++) {
        tableTds[weekday].innerHTML=date;
        weekday++;
        date++;
    }
    
}
//选取下拉列表时刷新日历主体与页面头部 "xxxx年xx月xx日" 字样
function refreshTable(){
	$("#selectBox").click(function(){
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
    	console.log(this)
    	var $disYear = $("#disYear").val();
		var $disMonth = parseInt($("#disMonth").val());
		 $disMonth = $disMonth < 10 ? "0" + $disMonth : $disMonth;
		
		$(".my-text").val($disYear + $disMonth + "月" + $disDay + "日");
    })
}  

//点击日历主体选取日期时刷新页面头部 "xxxx年xx月xx日" 字样???


window.onload = function () {
    selectBox();
    buildTable();
    buildDate();
    refreshTable();
    showDate();
}
