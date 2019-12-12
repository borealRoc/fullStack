// import testWebpack from './modules/testWebpack'
// testWebpack()
// import pic from './modules/testFileLoader'
// import pic2 from './modules/testUrlLoaderLimit'
// import './modules/testCss.scss'

// import getInfo from './modules/testProxy'
// getInfo()
// // JS模块手动HMR
// if (module.hot) {
//     console.log('module.hot')
//     module.hot.accept('./modules/testProxy', () => {
//         console.log('module.hot.accept')
//         document.body.removeChild(document.getElementById('root'))
//         getInfo()
//     })
// }

// 179kb：没引入@babel/polyfill
// 889kb：引入@babel/polyfill
// 289kb：按需引入@babel/polyfill
// 226kb: 使用"@babel/plugin-transform-runtime"
// import "@babel/polyfill"   
import es6Bable from './modules/es6'
import reactBabel from './modules/reactBabel'

// import {myAdd} from './modules/testTreeShaking'
// myAdd(1,2)

// 1.39Mb: 没使用代码分割index.js大小
// 32.7kb： 
import testCodeSplitting from './modules/testCodeSplitting'

import asyncClick from './modules/async'