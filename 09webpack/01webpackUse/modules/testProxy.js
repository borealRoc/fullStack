const axios = require('axios')

module.exports = function getInfo() {
    axios.get('/api/info').then(res => {
        const _root = document.querySelector('#root')
        _root.innerHTML = `My name is ${res.data.name}, I am ${res.data.age} years old.`
    })
}