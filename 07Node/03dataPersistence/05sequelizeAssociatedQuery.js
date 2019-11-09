const Sequelize = require('sequelize')

// 建立连接
const sequelize = new Sequelize("20191107", "root", "QSXdr1991", {
    host: "localhost",
    dialect: "mysql", // mysql/postgre/sql server/sql lite
    operatorsAliases: false
})

// 1:N关系
const Player = sequelize.define('player', { name: Sequelize.STRING }, {timestamps: false,})
const Team = sequelize.define('team', { name: Sequelize.STRING }, {timestamps: false,})

// 会添加teamId到Player表作为外键 
Player.belongsTo(Team); // 1端建立关系 
Team.hasMany(Player); // N端建立关系

// 1对多 && 多对1
sequelize.sync({ force: true })
    .then(
        async () => {
            await Team.create({ name: '火箭' })
            await Player.bulkCreate([{ name: '哈登', teamId: 1 }, { name: '保罗', teamId: 1 }])
            // 1端关联查询
            const players = await Player.findAll({ include: [Team] })
            console.log('players', JSON.stringify(players, null, '\t'))
            // N端关联查询
            const team = await Team.findOne({ where: { name: '火箭' }, include: [Player] })
            console.log('team',JSON.stringify(team, null, '\t'));
        })

