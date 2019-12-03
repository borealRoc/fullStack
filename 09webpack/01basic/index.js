import moduleA from "./modules/moduleA";
import moduleB from "./modules/moduleB";
import axios from "axios";
moduleA();
moduleB();
function index() {
    console.log("welcome to webpack");
}
index();

import pic from './images/1.png'
// import './css/index.css'
import './css/index.scss'
console.log('pic', pic)
var img = new Image();
img.src = pic;
img.classList.add("pic");
var root = document.querySelector("#root");
root.append(img);

axios.get("/api/info").then(res => {
    console.log(res);
});

