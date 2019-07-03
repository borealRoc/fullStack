// 栈的方法
function Stack () {

	var items = []; //存储数据
	// 上面为什么不写this.items = []?
	// 因为如果这么写，items这个属性就会暴露出去[items应该作为Stack类的私有属性]，
	// 即后面新建的继承Stack的对象可以在外部操作这个属性，不安全

	// 压栈
	this.push = function (item) {
		items.push(item);
		return items.length;
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
		return items;
	}
	
}

// 思考：栈的底层实现就是数组，即栈能做的事情，数组也能做，那为什么要创造栈这种数据结构？
// 应用1: “合法括号”【“(”成对“)”出现，而且必须是“(”先出现】
function isLegalBracket (string) {
	let stack =  new Stack();
	for (var i = 0; i < string.length; i++) {
		// 遇到左括号，入栈
		if (string[i] === '(') {
			stack.push('(');
		} else if (string[i] === ')') {
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

//应用3: 实现一个有push, pop, min方法的栈
function  MinStack () {
	var data_stack = new Stack();
	var min_stack = new Stack();

	this.push = function (item) {
		data_stack.push(item);
		if (min_stack.isEmpty() || item < min_stack.top()) {
			min_stack.push(item);
		} else {
			min_stack.push(min_stack.top());
		}
	}
	this.pop = function (item) {
		data_stack.pop();
		min_stack.pop();
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

// Que:什么叫算法的复杂度？





