module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
               app.get('/api/goods', function(req,res){
                    res.json({
                        code:0,
                        list: [
                            {id: 1, name: 'Web全栈课程' , price: 1000},
                            {id: 2, name: 'Python高级工程师' , price: 2000},
                            {id: 3, name: 'Java高级工程师' , price: 3000}
                        ]
                    })
               }) 
            }
        }
    }
}