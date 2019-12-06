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

import React, { Component } from "react";
import ReactDom from "react-dom";
import Child from "./modules/child.jsx";
class App extends Component {
  render() {
    return <div><Child /></div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));