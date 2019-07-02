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
// 应用一：“合法括号”【“(”成对“)”出现，而且必须是“(”先出现】
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
