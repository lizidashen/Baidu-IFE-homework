
//function g(el) { return getElementsByClassName(el); }
//设置变量
var btn = document.getElementsByTagName("input"),
	preBtn = btn[0],
	inBtn = btn[1],
	postBtn = btn[2],
	treeRoot = document.getElementsByClassName("root")[0],
	divList = [],
	timer = null;
	

//前序遍历
function preOrder(node) {
	if (!(node == null)) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序遍历
function inOrder(node) {
	if (!(node == null)) {
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}

//后序遍历
function postOrder(node) {
	if (!(node == null)) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		divList.push(node);
	}
}

//颜色变化函数
function changeColor() {
	var i = 0;
	// 将当前遍历到的元素的颜色变为红色
	divList[i].style.backgroundColor = "#0C4E7C";
	// setInterval() 方法每500毫秒调用函数或计算表达式。
	timer = setInterval(function (argument) {
		i++;
		// 将当前遍历到的元素的颜色变为蓝色，并且将上一个遍历的元素的颜色设为白色
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = "#fff";
			divList[i].style.backgroundColor = "#0C4E7C";
		} else {
			// 即当i 等于 divlist.length，即遍历完全之后，清空timer，把当前的元素设为白色。由于length从1算，所以-1
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = "#fff";
		}
	},500)
}

//初始化样式
function reset() {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = "#fff";
	}
}

window.onload = function (){
	preBtn.onclick = function () {
		reset();
		preOrder(treeRoot);
		changeColor();
	}
	inBtn.onclick = function () {
		reset();
		inOrder(treeRoot);
		changeColor(); 	
	}
	postBtn.onclick = function () {
		reset();
		postOrder(treeRoot);
		changeColor();
	}
}
