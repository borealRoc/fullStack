1. 基础语法
    - 1.1  router vs route
        - router: 路由器。this.$router访问路由器 
        - route: 路由。this.$route访问当前路由
    - 1.2 动态路由匹配
        - 路径参数：/user/:username/post/:post_id + /user/evan/post/123 => $route.params {username: 'evan', post_id: 123}     
        - 查询参数：/foo?user=1 => $route.query {user: 1}
        - 路劲参数 vs 查询参数
    - 1.3 路由跳转的方式  
name | 价格 |  数量  
-|-|-
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |
2. hash模式 vs HTML5 History 模式  
<img src="../knowledgePic/11.png"/>