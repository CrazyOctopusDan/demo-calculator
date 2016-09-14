function calc(x,y,f) {
	var x = parseFloat(calcform.num1.value);
	var y = parseFloat(calcform.num2.value);
	var f = document.all('char').value;
	var r = document.getElementById('result');
	// if(f=="+")
	// {
	// 	document.getElementById('result').value = x+y;
	// }
	// else if (f=="-") 
	// {
	// 	document.getElementById('result').value = x-y;
	// }
	// else if (f=="*") 
	// {
	// 	document.getElementById('result').value = x*y;
	// }
	// else if (f=="/") 
	// {
	// 	document.getElementById('result').value = x/y;
	// }
	// document.getElementById('result').value = x+y;
		if (!calcform.num1.value||!calcform.num2.value) {
			alert("请输入数字~");
			// 提前结束让结尾不会显示输出
			return;
		}
		switch(f){
		case "+":
		r.value = x+y;
		break;
		case "-":
		r.value = x-y;
		break;
		case "*":
		// 保留八位小数修正bug
		r.value = parseFloat((x*y).toFixed(8));
		break;
		case "/":
		if (y==0) {
			alert('除数不能为零请重新输入！');
			// 提前结束让结尾不会显示输出
			return;
		}
		r.value = x/y;
		break;
		default:
		alert("请输入正确的数字呀！");
	}
		
}