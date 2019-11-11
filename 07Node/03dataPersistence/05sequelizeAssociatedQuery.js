const Sequelize = require('sequelize')

// 建立连接
const sequelize = new Sequelize("20191107", "root", "QSXdr1991", {
    host: "localhost",
    dialect: "mysql", // mysql/postgre/sql server/sql lite
    operatorsAliases: false
})

// 1:N关系
const Player = sequelize.define('player', { name: Sequelize.STRING }, { timestamps: false, })
const Team = sequelize.define('team', { name: Sequelize.STRING }, { timestamps: false, })

// 会添加teamId到Player表作为外键 
Player.belongsTo(Team); // 1端建立关系 
Team.hasMany(Player); // N端建立关系


// 多对多关系
const Fruit = sequelize.define("fruit", { name: Sequelize.STRING }, { timestamps: false, })
const Category = sequelize.define("category", { name: Sequelize.STRING }, { timestamps: false, })
Fruit.FruitCategory = Fruit.belongsToMany(Category, {
    through: "FruitCategory"
})

// 1对多 && 多对1
sequelize.sync({ force: true })
    .then(
        async () => {
            await Team.bulkCreate([{ name: '火箭' }, {name: '勇士'}])
            await Player.bulkCreate([{ name: '哈登', teamId: 1 }, { name: '保罗', teamId: 1 }, { name: '库里', teamId: 2 }])
            // 1端关联查询
            const players = await Player.findAll({ include: [Team] })
            console.log('players', JSON.stringify(players, null, '\t'))
            // N端关联查询
            const team = await Team.findAll({include: [Player] })
            console.log('team', JSON.stringify(team, null, '\t'));

            // 多对多测试数据
            await Fruit.create(
                {
                    name: "香蕉",
                    categories: [{ id: 1, name: "热带" }, { id: 2, name: "温带" }]
                }, {
                include: [Fruit.FruitCategory]
            })
            const fruit = await Fruit.findOne({
                where: { name: "香蕉" }, // 通过through指定条件、字段等
                include: [{ model: Category, through: { attributes: ['id', 'name'] } }]
            })
            console.log('fruit', fruit.get())
        })

