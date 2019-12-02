import moduleA from "./modules/moduleA";
import moduleB from "./modules/moduleB";
moduleA();
moduleB();
function index () {
  console.log("welcome to webpack");
}
index();

import pic from './images/1.png'
console.log('pic', pic)
var img = new Image();
img.src = pic;
var root = document.querySelector("#root");
root.append(img);