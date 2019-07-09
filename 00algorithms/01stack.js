// 栈：只允许在栈的尾部删除和添加元素，即先进后出，后进先出
// 现实例子：羽毛球筒

// 1、栈的方法
function Stack () {

	var items = []; //存储数据
	// 上面为什么不写this.items = []?
	// 因为如果这么写，items这个属性就会暴露出去，即后面新建的继承Stack的对象可以在外部操作这个属性，不安全。
	// items应该作为Stack类的私有属性

	// 压栈
	this.push = function (item) {
		items.push(item);
	}
	// 出栈
	this.pop = function () {
		return items.pop();
	}
	// 返回栈顶的元素
	this.top = function () {
		return items[items.length - 1];
	}
	// 判断栈是否为空
	this.isEmpty = function () {
		return items.length === 0;
	}
	// 返回栈的大小
	this.size = function () {
		return items.length;
	}
	// 清空栈
	this.clear = function () {
		items = [];
	}
	
}

// 思考：栈的底层实现就是数组，即栈能做的事情，数组也能做，那为什么要创造栈这种数据结构？
// 2、栈的应用

// 应用1: “合法括号”【“(”和“)”成对出现，而且必须是“(”先出现】
function isLegalBracket (string) {
	let stack =  new Stack();
	for (var i = 0; i < string.length; i++) {
		var item = string[i];
		// 遇到左括号，入栈
		if (item === '(') {
			stack.push('(');
		} else if (item === ')') {
			// 遇到右括号，判断栈是否为空
			// 如果为空，说明括号不合法
			if (stack.isEmpty()) {
				return false;
			} else {
			// 如果不为空，出栈
				stack.pop();
			}
		}
	}
	// 最后得到的栈，如果栈为空，说明括号合法
	return stack.isEmpty();
}
console.log(isLegalBracket('(6767(6767)jtug)()'));   // true
console.log(isLegalBracket('(6(767(6767)jtug)()'));  // false

// 应用2: 计算逆波兰表达式
// Que: 什么叫逆波兰表达式【后缀表达式】？
// demo1 —— 
// 中缀表达式：4 + 2
// 后缀表达式：4 2 +
// demo2 —— 
// 中缀表达式：4 + 13/5
// 后缀表达式：['4', '13', '5', '/', '+']
// demo2解析：
// 先是13/5（即第一出现的符号和最左边相邻两个数进行计算）
// 然后是4 + 13/5（即前面的计算结果和再前一个数用第二个出现的符号进行运算）
function calc_exp (exp) {
	var stack = new Stack();
	for (var i = 0; i < exp.length; i++) {
		var item = exp[i];
		if (["+","-","*", "/"].indexOf(item) >= 0) {
			var val1 = stack.pop();
			var val2 = stack.pop();
			// 第一次弹出来的数放在运算符右边，第二次弹出来的数放在运算符左边
			var tempStr = val2 + item + val1;
			// 计算并取整
			var tempInt = parseInt(eval(tempStr));
			// 计算结果压入栈
			stack.push(tempInt.toString());
		} else {
			stack.push(item);
		}
	}
	return stack.pop();
}
console.log(calc_exp(['4', '13', '5', '/', '+']));  //6
console.log(calc_exp(['1','4','5','+','3','+','+','3','-','9','8','+','+']));  //27
console.log(calc_exp(['1','4','5','+','3','+','4','/','3','-','+','6','8','+','3','*','+']));  //43

//应用3: 实现一个有push, pop, min方法的栈
function  MinStack () {
	var data_stack = new Stack();
	var min_stack = new Stack();

	this.push = function (item) {
		data_stack.push(item);
		if (min_stack.isEmpty() || item < min_stack.top()) {
			min_stack.push(item);
		} else {
			// 这里的push，是为了防止后面进行pop操作时，出现错误
			// 这和"用一个栈来存最小值，而不用一个变量来存最小值"同理
			min_stack.push(min_stack.top());
		}
	}
	this.pop = function (item) {
		data_stack.pop();
		min_stack.pop();['1','4','5','+','3','+','+','3','-','9','8','+','+']
	}
	this.min = function () {
		return min_stack.top();
	}

}
var minstack = new MinStack();
minstack.push(3)
minstack.push(5)
minstack.push(8)
console.log(minstack.min())
minstack.push(2)
console.log(minstack.min())

//应用4: 中序表达式转后序表达式
var priority_map = {
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2
};
function fix_exp_2_postfix_exp (exp) {
	var stack = new Stack();  //存放括号和预算符号的栈
	var postfix_list = [];    //存放后序表达式的数组

	for (var i = 0; i < exp.length;i++) {
		var item = exp[i];
		if (!isNaN(item)) {
			// 如果是数字，直接放入数组
			postfix_list.push(item);
		} else if (item === '(') {
			// 如果是左括号，直接入栈
			stack.push(item);
		} else  if (item === ')') {
			// 如果是右括号，把栈顶的运算符放入数组，直到遇到左括号，并把左括号出栈
			while (stack.top() !== "(") {
				postfix_list.push(stack.pop());
			}
			stack.pop();
		} else {
			// 如果是运算符
			// 如果栈不为空，且栈顶
			if (!stack.isEmpty() && ['+','-','*','/'].indexOf(item) !== -1 && priority_map[stack.top()] >= priority_map[item]) {
				postfix_list.push(stack.pop());
			}
			stack.push(item);
		}
	}
	while (!stack.isEmpty()) {
		postfix_list.push(stack.pop());
	}
	return postfix_list;
}
function exp_2_arr (exp) {
	return exp.split("");
}
var exp = "(1+(4+5+3)/4-3)+(6+8)*3";
var exp_result = fix_exp_2_postfix_exp(exp_2_arr(exp));
console.log(exp_result);
console.log(calc_exp(exp_result));
// ['1', '4', '5', '+', '3', '+', '4', '/', '3','-', '+', '6','8', '+', '3','*', '+']
// 43

// Que:什么叫算法的复杂度？





