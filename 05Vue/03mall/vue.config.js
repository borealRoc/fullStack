/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
	css: {
		loaderOptions: {
			stylus: {
				'resolve url': true,
				'import': []
			}
		}
	},
	pluginOptions: {
		'cube-ui': {
			postCompile: false,
			theme: false
		}
	},
	configureWebpack: {
		devServer: {
			before(app) {
				// 中间件
				app.use(function (req, res, next) {
					// 检查token
                    if (/^\/api/.test(req.path)) { // 只校验/api开头的请求
						if (req.path == '/api/login' || req.headers.token) {
							next();
						} else {
							res.sendStatus(401); // 错误状态提示用户需要登录
						}
					} else {
						next()
					}
				})

				app.get("/api/goods", function (req, res) {
					res.json({
						code: 0,
						slider: [{
								id: 21,
								img: "/img/1.jpg"
							},
							{
								id: 22,
								img: "/img/2.jpg"
							},
							{
								id: 23,
								img: "/img/3.jpg"
							},
							{
								id: 24,
								img: "/img/4.jpg"
							}
						],
						data: {
							'fe': {
								name: 'fe',
								cName: '前端全栈开发',
								bg: 'url("/img/c_bar_1.png")',
								course: [{
										id: 1,
										title: "专为程序员设计的统计课:Spring Boot仿抖音短视频小程序开发 全栈式实战项目",
										price: "100",
										img: "/img/c1.jpg",
										count: 100
									},
									{
										id: 2,
										title: "阿里新零售数据库设计与实战 ",
										price: "120",
										img: "/img/c2.jpg",
										count: 100
									},
									{
										id: 3,
										title: "前端要学的测试课 从Jest入门到 TDD/BDD双实战",
										price: "80",
										img: "/img/c3.jpg",
										count: 100
									},
									{
										id: 4,
										title: "专为程序员设计的统计课 彻底学会统计分析",
										price: "110",
										img: "/img/c4.jpg",
										count: 100
									},
									{
										id: 5,
										title: "零基础入门 全角度解读企业主流数据库MySQL8.0",
										price: "200",
										img: "/img/c5.jpg",
										count: 100
									},
									{
										id: 6,
										title: "Flutter从入门到进阶 实战携程网App",
										price: "30",
										img: "/img/c6.jpg",
										count: 100
									}
								]
							},
							'python': {
								name: 'python',
								cName: 'Python高级开发',
								bg: 'url("/img/c_bar_2.png")',
								course: [{
										id: 7,
										title: "Python基础语法",
										price: "120",
										img: "/img/c7.jpg",
										count: 101
									},
									{
										id: 8,
										title: "Flask实战",
										price: "80",
										img: "/img/c8.jpg",
										count: 100
									},
									{
										id: 9,
										title: "Django实战",
										price: "110",
										img: "/img/c9.jpg",
										count: 100
									},
									{
										id: 10,
										title: "Python语法进阶",
										price: "200",
										img: "/img/c10.jpg",
										count: 100
									}
								]
							},
							'java': {
								name: 'java',
								cName: 'Java高级开发',
								bg: 'url("/img/c_bar_3.png")',
								course: [
									{
										id: 11,
										title: "java入门实战",
										price: "80",
										img: "/img/c11.jpg",
										count: 100
									},
									{
										id: 12,
										title: "spring boot实战",
										price: "110",
										img: "/img/c12.jpg",
										count: 100
									},
									{
										id: 13,
										title: "Java高并发",
										price: "30",
										img: "/img/c13.jpg",
										count: 100
									}

								]
							},
							'bigdata': {
								name: 'bigdata',
								cName: '大数据开发',
								bg: 'url("/img/c_bar_4.png")',
								course: [{
										id: 14,
										title: "大数据实战",
										price: "200",
										img: "/img/c14.jpg",
										count: 100
									},
									{
										id: 15,
										title: "Hadoop实战",
										price: "120",
										img: "/img/c15.jpg",
										count: 100
									},
									{
										id: 16,
										title: "Kafka平台",
										price: "80",
										img: "/img/c16.jpg",
										count: 100
									}

								]
							},
							'ai': {
								name: 'ai',
								cName: '人工智能',
								bg: 'url("/img/c_bar_5.png")',
								course: [{
										id: 17,
										title: "算法实战",
										price: "100",
										img: "/img/c17.jpg",
										count: 100
									},
									{
										id: 18,
										title: "个性化推荐",
										price: "120",
										img: "/img/c18.jpg",
										count: 100
									},
									{
										id: 19,
										title: "机器学习",
										price: "80",
										img: "/img/c19.jpg",
										count: 100
									},
									{
										id: 20,
										title: "AI实战",
										price: "110",
										img: "/img/c20.jpg",
										count: 100
									}

								]
							}
						},
						keys: ["fe", "python", "java", "bigdata", "ai"]
					});
				});

				app.get("/api/login", function (req, res) {
					const {
						user,
						pass
					} = req.query;
					if (user && pass === "123456") {
						res.json({
							code: 0,
							token: "opensesame"
						});
					} else {
						res.json({
							code: 1,
							message: "用户名或密码错误"
						});
					}
				});

				app.get('/api/logout', function (req, res) {
					res.json({
						code: -1,
						token: ""
					});
				})
			}
		}
	}
}