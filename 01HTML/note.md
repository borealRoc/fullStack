# 一、HTML5
1. 兼容性[IE9]
    - 解决方法
    ```html
        <!--[if lt IE 9]>
        <script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
        <![endif]-->
        <style>
        article,aside,dialog,footer,header,section,nav,figure,menu{display:block}
        </style>
    ```
2. 表单类型：number,search,tel,email,url,range,date...
3. 表单属性
    - form/input属性：autocomplete[on/off]
    - input属性
        - autofocus[true/false], required[true/false], placeholder, step/min/max, width/height
        - pattern: 正则表达式用于验证input元素的值
        - multiple: 规定input元素可选择多个值，适用于以下类型的input标签：email 和 file
4. 新的DOM语法
    - 获取多个：`document.querySelectorAll('p')`
    - 获取一个：`document.querySelector('p')`
    - 增加类名：`document.querySelector('p').classList.add('test')`
    - 移除类名：`document.querySelector('p').classList.remove('test')`
    - 切换类名：`document.querySelector('p').classList.toggle('test')`
    - 是否包含类名：`document.querySelector('p').classList.contains('test')`
    - 获取属性：`document.querySelector('p').dateset.name`
    - 设置属性：`document.querySelector('p').dateset.name = ‘xu’`

    



            
