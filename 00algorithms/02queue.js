// 队列：只允许在队列的头部删除元素，在队列的尾部添加新元素，即先进先出，后进后出
// 现实列子：排队

// 1、队列的方法
function Queue() {
    var items = [];

    // enqueue:在队列尾部添加元素
    this.enqueue = function (item) {
        items.push(item);
    };
    // dequeue:删除队列头部元素
    this.dequeue = function () {
        return items.shift();
    };
    // 返回队列头部元素
    this.head = function () {
        return items[0];
    };
    // 返回队列尾部元素
    this.tail = function () {
        return items[items.length - 1]
    };
    // 判断队列是否为空
    this.isEmpty = function () {
        return items.length === 0;
    };
    // 返回队列大小
    this.size = function () {
        return items.length;
    };
    // 清空队列
    this.clear = function () {
        items = [];
    };
}

// 2、队列的应用

// 2.1、约瑟夫环（easy）
// 有一个数组a[100]存放0-99，每个两个数删掉一个数，到末尾时循环至开头继续进行，求最后剩下的数
function del_ring(arr_list) {
    // 把数组里的每一个元素放入队列
    var queue = new Queue();
    for (var i = 0; i < arr_list.length; i++) {
        queue.enqueue(arr_list[i]);
    }
    // 对数据队列进行循环，如果最后队列只剩下一个元素，说明这就是最后被删剩下的数
    var index = 0;
    while (queue.size() !== 1) {
        var item = queue.dequeue();
        index += 1;
        if (index % 3 !== 0) {
            queue.enqueue(item)
        }
    }
    return queue.head();
}

var arr_list = [];
for (var i = 0; i < 100; i++) {
    arr_list.push(i);
}
console.log(del_ring(arr_list));

// 2.2、斐波那契数列:f(n) = f(n-1) + f(n-2)
// 假设 n > 2
function fibonacci(n) {
    let queue = new Queue();
    // 队列先放入两个1
    queue.enqueue(1);
    queue.enqueue(1);

    var index = 0;
    while (index < n - 2) {
        var del_item = queue.dequeue();
        var head_item = queue.head();
        var next_item = del_item + head_item;
        queue.enqueue(next_item);
        index += 1;
    }
    queue.dequeue();
    return queue.head();
}

console.log(fibonacci(16));

// 2.3、用栈实现队列，实现队列的push/pop/和top方法(hard)
function QueueStack() {
    var queue_1 = new Queue();
    var queue_2 = new Queue();
    var data_queue = null;  //存放有数据的队列
    var empty_queue = null; //存放没有数据的队列

    // 把data_queue指向有数据的队列
    // 把empty_queue指向没有数据的队列
    function init_queue() {
        if (queue_1.isEmpty()) {
            data_queue = queue_2;
            empty_queue = queue_1;
        } else {
            data_queue = queue_1;
            empty_queue = queue_2;
        }
    }

    // push方法
    this.push = function (item) {
        init_queue();
        data_queue.enqueue(item);
        // return data_queue.size();
    }

    // top方法
    this.top = function (item) {
        init_queue();
        return data_queue.tail();
    }

    // pop方法
    this.pop = function () {
        init_queue();
        // 把有数据的队列的所有元素移入空队列，直到只剩下一个元素，这个元素就是之前有数据队列的最后一个元素
        while (data_queue.size() > 1) {
            empty_queue.enqueue(data_queue.dequeue());
        }
        // 将这最后一个元素弹出
        return data_queue.dequeue();
    }
}

var queue_stack = new QueueStack()
queue_stack.push(1);
queue_stack.push(2);
queue_stack.push('hello world');
console.log(queue_stack.pop());
console.log(queue_stack.top());

//2.4、打印杨辉三角
// i代表行数，j代表第几个数
// f[i][j] = f[i-1][j-1] + f[i-1][j],如果j=0或j=i，则f[i][j]=1

// 1
// 1 1
// 1 2 1
// 1 3 3 1
// 1 4 6 4 1

function print_yanghui(n) {
    var queue = new Queue();
    // 往队列的第一行压入"1"
    queue.enqueue(1);

    // 定义两个循环
    // 第一个循环遍历层数
    for (var i = 1; i <= n; i++) {
        var line = '';  //存储每一层的数据
        var prev = 0;   //在遍历每一层时，假设第一个数前面有个数字0
        // 第二个循环遍历每一层数字的个数
        for (var j = 0; j < i; j++) {
            var item = queue.dequeue();
            
            var value = item + prev;
            prev = item;
            queue.enqueue(value)
        }
        queue.enqueue(1);


    }

}


