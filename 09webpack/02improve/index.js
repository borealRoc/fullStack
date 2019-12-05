import moduleA from "./modules/moduleA";
import moduleB from "./modules/moduleB";
// import "@babel/polyfill";

moduleA();
moduleB();

let ES6Var = 'es6变量测试'
const arr = [new Promise(() => { }), new Promise(() => { })];
arr.map(item => {
    console.log(item);
});