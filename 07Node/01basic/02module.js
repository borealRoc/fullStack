// 内建模块
const os = require("os");
// 第三方模块
const cpuStat = require("cpu-stat");

function showStatistics() {
    const mem = (os.freemem() / os.totalmem()) * 100;
    console.log(`内存占用率${mem}%`);

    cpuStat.usagePercent((err, percent) => {
        console.log(`cpu占用率：${percent}`);
    });
}

// setInterval(showStatistics, 1000);
showStatistics();

// 自定义模块
const config = require('./config')
console.log(config);

const { rmbTurn } = require('./rmbToDollar')(8)
console.log(rmbTurn(10))