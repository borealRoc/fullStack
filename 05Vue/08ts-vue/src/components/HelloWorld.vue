<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <p>{{name}}</p>
    <input type="text" v-model="listMes" @keyup.enter="addList" />
    <ul>
      <li v-for="list in lists" :key="list.id">{{list.name}}</li>
      <li>特性数量：{{listCounts}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
export class Feature {
  constructor(public id: number, public name: string, public version: string) {}
};
interface FeatureInterface {
  id: number;
  name: string;
  version: string;
};
// 泛型：是指在定义函数，接口或类的时候，不预先指定具体的类型， 而在使用的时候再指定类型的一种特性
// 不适用泛型
// interface Result {
//     ok: 0 | 1;
//     data: FeatureInterface[]
// }
// 使用泛型
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}
// 泛型函数
function getData<T>(): Promise<Result<T>> {
  const data: any[] = [
    { id: 1, name: "类型注解", version: "2.0" },
    { id: 2, name: "编译型语言", version: "1.0" }
  ];
  return Promise.resolve({ ok: 1, data } as Result<T>);
}

@Component
export default class HelloWorld extends Vue {
  // prop
  @Prop() private msg!: string; //'!'表示必传
  @Prop({ default: "默认值" }) name?: string; //'?'表示无需必传

  // data
  // 使用类作为数据类型的约束
  // private lists: Feature[] = [
  // 使用接口作为数据类型的约束
  private lists: FeatureInterface[] = [];
  private listMes: string = '给默认值，不然老是报错：Property "listMes" has no initializer and is not definitely assigned in the constructor.';

  // 计算属性
  get listCounts() {
    return this.lists.length;
  }

  // 监听属性变化
  @Watch("msg")
  onRouteChange(val: string, oldVal: any) {
    console.log(val, oldVal);
  }

  // 派发事件
  @Emit()
  private addList(event: any) {
    // 若没有返回值形参将作为事件参数
    const feature = {
      name: event.target.value,
      id: this.listMes.length + 1,
      version: "1.0"
    };
    this.lists.push(feature);
    this.listMes = "";
    return feature; // 返回值作为事件参数
  }
  
  // 生命周期
  async created() {
    const result = await getData<FeatureInterface>();
    this.lists = result.data;
  }
}

// TypeScript基本语法
// 1. 类型注解
// 1.1 基本类型
let str: string = "字符串";
let num: number = 1;
let ifShow: boolean = false;
let typeInfer = "类型推论";
// 1.2 数组类型
// 1.2.1 数组类型的两种写法
let arr1: string[] = ["a", "b"];
let arr2: Array<string> = ["a", "b"];
// 1.2.2 数组类型的多种类型
let arr3: (string | number)[] = ["a", 1];
// 1.2.3 数组类型的任意类型
let arr4: any[] = ["a", 1, true, { name: "xu" }];
// 1.3 函数中的类型注解
// 1.3.1 参数与返回值的类型注解
const greeting = (name: string): string => `hello, ${name}`;
greeting("史诗王爵");
// 1.3.2 无返回值
const warm = (mes: string): void => {
  console.log(mes);
};
warm("void表示无返回值");

// 2. 函数
// 2.1 ts函数中参数如果声明了，就是必选参数[除非参数后面加‘？’]
const sayHello = (name: string, age?: number): string =>
  `My name is ${name}, I'm ${age} years old.`;
sayHello("xu", 17);
// 2.2 函数重载：多个同名函数，通过参数数量或者类型不同或者返回值不同
function sayHi(person: { name: string }): string;
function sayHi(person: string): object;
function sayHi(person: any): any {
  if (typeof person === "object") {
    return person.name;
  } else if (typeof person === "string") {
    return { name: person };
  }
}
console.log(sayHi({ name: "xu" }));
console.log(sayHi("--xu--"));

// 3. 类
// 3.1 面向对象
// 通过extends实现继承
// 使用public等访问修饰符实现封装
// 通过方法覆盖实现多态
class Shape {
  // private 仅当前类可用
  // protected 子类也可以用
  // public  都可以用
  //readonly 只读属性
  readonly foo: string = "foo";
  protected area: number;

  constructor(public color: string, width: number, height: number) {
    this.area = width * height;
  }

  shoutout() {
    return (
      "I'm " + this.color + " with an area of " + this.area + " cm squared."
    );
  }
}
class Square extends Shape {
  constructor(color: string, side: number) {
    super(color, side, side);
    console.log(this.color);
  }
  shoutout() {
    return "我是" + this.color + " 面积是" + this.area + "平方厘米";
  }
}
const square: Square = new Square("blue", 2);
console.log(square.shoutout());
// 3.2 通过get和set暴露私有属性
class Employee {
  private firstName: string = "Mike";
  private lastName: string = "James";

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
  set fullName(newName: string) {
    console.log("您修改了用户名");
    this.firstName = newName.split(" ")[0];
    this.lastName = newName.split(" ")[1];
  }
}
const employee = new Employee();
employee.fullName = "Bob Smith";
console.log(employee.fullName);

// 4. 接口
// 4，1 用来约束数据结构，不做具体方法实现
// 为什么不用类？因为用类来约束数据结构过程比较繁琐[比如要初始化...]
interface Person {
  firstName: string;
  lastName: string;
  sayHello(): string; // 要求有方法
}
const greeting2 = (person: Person) => {
  return person.sayHello();
};
const user2 = {
  firstName: "Xu",
  lastName: "King",
  sayHello: function() {
    return `Hello, ${this.firstName} ${this.lastName}`;
  }
};
console.log("greeting2(user2)", greeting2(user2));
// 4.2 类实现接口
class Greeter implements Person {
  constructor(public firstName = "", public lastName = "") {}
  sayHello() {
    return "Hello, " + this.firstName + " " + this.lastName;
  }
}
const user3 = new Greeter("^_^", "$_$");
console.log("user3.sayHello()", user3.sayHello());
console.log("greeting2(user3)", greeting2(user3));

// 5. 泛型
// 泛型是指在定义函数，接口或类的时候，不预先指定具体的类型， 而在使用的时候再指定类型的一种特性

// 6. 装饰器
// 装饰器实际上是工厂函数，传入一个对象，输出处理后的新对象。
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
