const Sequelize = require('sequelize')

// 建立连接
const sequelize = new Sequelize("20191107", "root", "QSXdr1991", {
    host: "localhost",
    dialect: "mysql", // mysql/postgre/sql server/sql lite
    operatorsAliases: false
})
// 定义模型
const Fruit = sequelize.define("Fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        // get() {
        //     const price = this.getDataValue("price")
        //     return `￥${price}`
        // },
        // 校验
        validate: {
            isFloat: { msg: "价格字段请输入数字" },
            min: { args: [0], msg: "价格字段必须大于0" }
        }
    },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
}, {
    timestamps: false, //避免自动生成时间戳字段
    freezTableName: true, //表名冻结
    // Getters & Setters:可用于定义伪属性或映射到数据库字段的保护属性
    getterMethods: {
        amount() {
            return this.getDataValue('stock') + 'kg'
        }
    },
    setterMethods: {
        amount(val) {
            const idx = val.indexOf('kg')
            const v = val.slice(0, idx)
            this.setDataValue('stock', v)
        }
    }
})
// 模型扩展
// 实例方法
Fruit.prototype.totalPrice = function (count) {
    return this.price * count
};

// 同步
// force: true,强制同步:创建表之前先删除已存在的表
Fruit.sync({ force: true })
    .then(
        // 增
        () => Fruit.create(
            { name: '苹果', price: 6.66, },
        )
    )
    .then(
        // Promise写法
        // () => {
        //     Fruit.findAll().then(res => {
        //         // 改
        //         res[0].amount = '100kg'
        //         res[0].save()
        //         // 使用扩展方法
        //         console.log('商品总价', res[0].totalPrice(20))

        //         // 查
        //         // 根据ID查询
        //         Fruit.findByPk(1).then(fruit => console.log('ID查询', fruit.get()))
        //         // 条件查询
        //         Fruit.findOne({ where: { name: "苹果" } }).then(fruit => console.log('条件查询', fruit.get()))
        //         // 模糊查询: 查找单价在5块以下的水果
        //         // const Op = Sequelize.Op
        //         // Fruit.findAll({ wherer: {[Op.or]:[{price: { [Op.lt]:5 }}]}})
        //         //     .then(fruits => { fruits.forEach(item => console.log('单价在5块以下的水果', item)) })
                
        //         // 改的另一种方式
        //         Fruit.update({ price: 8.88 }, { where: { id: 1 } })
        //         // 删
        //         // Fruit.findOne({ where: { id: 1 } }).then(r => r.destroy())
        //     }, err => console.log(err.message))
        // }
        
        // async + await写法
        async () => {
            let fruits = await Fruit.findAll()
            fruits[0].amount = '200kg'
            fruits[0].save()
            console.log('商品总价', fruits[0].totalPrice(20))

            let fruitID_1 = await Fruit.findByPk(1)
            console.log('ID查询', fruitID_1.get())
            let fruitApple = await Fruit.findOne({ where: { name: "苹果" } })
            console.log('条件查询', fruitApple.get())

            await Fruit.update({ price: 8.88 }, { where: { id: 1 } })
            await Fruit.findOne({ where: { id: 1 } }).then(r => r.destroy())
        }
    )

