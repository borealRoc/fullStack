// 栈的方法
function Stack () {
	
	var items = []; //存储数据
	// 上面为什么不写this.items = []?
	// 因为如果这么写，items这个属性就会暴露出去[items应该作为Stack类的私有属性]，
	// 即后面新建的继承Stack的对象可以篡改这个属性，不安全

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