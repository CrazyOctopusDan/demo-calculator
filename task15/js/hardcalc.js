var num = 0,
    result = 0,
    numshow = "0";
var char = 0; //判断是否为符号或者三角函数的标志 ，0为数字，1为符号
var calcstate = 0; //判断计算状态的标志+-*/... 
var stop = 0; //防止重复按键的标志 

function command(num) {
    var str = String(document.calculator.numScreen.value); //获得当前显示数据 
    str = (str != "0") ? ((char == 0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值; 
    str = str + String(num); //给当前值追加字符 
    document.calculator.numScreen.value = str; //刷新显示 
    char = 0; //重置输入状态为数字 
    stop = 0; //重置防止重复按键的标志 
}

function dzero() {
    var str = String(document.calculator.numScreen.value);
    str = (str != "0") ? ((char == 0) ? str + "00" : "0") : "0"; //如果当前值不是"0"，且为数字（状态为0），则返回当str+"00"，否则返回"0"; 
    document.calculator.numScreen.value = str;
    char = 0;
}

function dot() {
    var str = String(document.calculator.numScreen.value);
    str = (str != "0") ? ((char == 0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"; 
    for (i = 0; i <= str.length; i++) { //判断是否已经有一个点号 
        if (str.substr(i, 1) == ".") return false; //如果有则不再插入 
    }
    str = str + ".";
    // 组合一个 “.”
    document.calculator.numScreen.value = str;
    char = 0;
    // 它为数字的一部分，状态为0
}

function del() { //退格 
    var str = String(document.calculator.numScreen.value);
    str = (str != "0") ? str : "";
    // 判断1.字符串不是0，返回字符串；2.如果是0，返回空，以便跳过下面这步
    str = str.substr(0, str.length - 1);
    // 返回字符串从开始数到最后前一位，相当于删除了最后一位
    str = (str != "") ? str : "0";
    // 还原0
    document.calculator.numScreen.value = str;
}

function clearscreen() { //清除数据 
    num = 0;
    result = 0;
    numshow = "0";
    document.calculator.numScreen.value = "0";
}

function plus() { //加法 
    calculate(); //调用计算函数 
    char = 1; //更改输入状态 
    calcstate = 1; //更改计算状态为加 
}

function minus() { //减法 
    calculate();
    char = 1;
    calcstate = 2;
}

function times() { //乘法 
    calculate();
    char = 1;
    calcstate = 3;
}

function divide() { //除法 
    calculate();
    char = 1;
    calcstate = 4;
}

function persent() { //求余 
    calculate();
    char = 1;
    calcstate = 5;
}

function equal() {
    calculate(); //等于 
    char = 1;
    num = 0;
    result = 0;
    numshow = "0";
    console.log(num);
    console.log(numshow);
}

function mysin() {
    char = 1;
    num = 1;
    stop = 0;
    calcstate = 6;
    calculate();//求sin
}

function mycos() {    
    char = 1;
    num = 1;
    stop = 0;
    calcstate = 7;
    calculate();//求cos

}

function mytan() {
    char = 1;
    num = 1;
    stop = 0;
    calcstate = 8;
    calculate();//求tan

}

function mysqrt() {
    num = 1;
    stop = 0;
    char = 1;
    calcstate = 9;
    calculate();//求平方根
    
}

function mypow() {
    calculate();//求幂
    char = 1;
    calcstate = 10;
}
// 
function calculate() {
    numshow = Number(document.calculator.numScreen.value);
    console.log(num);console.log(stop);console.log(numshow);
    if (num != 0 && stop != 1) { //判断前一个运算数是否为零以及防重复按键的状态 
        switch (calcstate) { //判断要输入状态 
            case 1:
                result = parseFloat((num + numshow).toFixed(8));
                console.log(num);
                console.log(numshow);
                break; //计算"+" 
            case 2:
                result = num - numshow;
                console.log(num);
                console.log(numshow);
                break; //计算"-" 
            case 3:
                // var temp = (num * numshow).toFixed(8);
                // var stemp = String(temp);
                // if(stemp.substr(stemp.length-1,1)==0){
                //  stemp=stemp.substr(0,stemp.length-2);
                // }
                // stemp.substr(stemp.length-1,1)==0?stemp=stemp.substr(0,stemp.length-2):stemp;
                // 用于清除多余的0
                // result = Number(stemp);
                result = parseFloat((num * numshow).toFixed(8));
                // 此处发现了，原来parseFloat有自动选择后面小数为0消失的功能，我还傻傻地写了一段消除末尾为0的代码~~科科~~
                break; //计算乘并且防止出现bug 
            case 4:
                if (numshow == 0) { 
                    document.getElementById("note").innerHTML = "除数不能为零！";
                    setTimeout(clearnote, 5000)
                }//计算÷

                result = num / numshow; 
                break;
            case 5:
                result = num % numshow;//取余
                break;
            case 6:
                result = parseFloat((Math.sin(numshow * Math.PI / 180)).toFixed(8));//求sin
                console.log(num);console.log(numshow);console.log(result);
                num = result;
                console.log(num);
                break;
            case 7:
                result = parseFloat((Math.cos(numshow * Math.PI / 180)).toFixed(8));//求cos
                break;
            case 8:
                if (num % 90 != 0) {
                    result = parseFloat((Math.tan(numshow * Math.PI / 180)).toFixed(8));
                } else {
                    document.getElementById('note').innerHTML = "度数不可以是90°的倍数";
                    setTimeout(clearnote, 5000)
                }//求tan

                break;
            case 9:
                result = Math.sqrt(numshow);
                break;//求平方根
            case 10:
                result = Math.pow(num, numshow);
                break;//求幂
        }

        stop = 1; //避免重复按键 
    } else {
        result = numshow;
        console.log(numshow);
    }
    numshow = String(result);
    console.log(numshow);
    document.calculator.numScreen.value = numshow;
    num = result; //存储当前值 
    console.log(num);
}

function clearnote() { //清空提示 
    document.getElementById("note").innerHTML = "";
}
