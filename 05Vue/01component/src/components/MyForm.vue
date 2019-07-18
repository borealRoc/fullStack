<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'MyForm',
        provide() {
            return {
                // 将表单实例传递给后代
                form: this,
            }
        },
        props: {
            // 数据模型
            mymodel: {
                type: Object,
                required: true
            },
            // 校验规则
            myrules: {
                type: Object,
            }
        },
        created () {
            // 缓存需要校验的表单项
            this.fileds = [];
            this.$on('formItemAdd', item => this.fileds.push(item));
            console.log('fileds', this.fileds);
        },
        methods: {
            async formValidate(callback) {
                // 将FormItem数组转换为itemValidate()返回的promise数组
                const tasks = this.fileds.map(item => item.itemValidate());
                console.log('tasks',tasks);
                // 获取所有结果统一处理
                const results = await Promise.all(tasks);
                let finalResult = true;
                results.forEach(result => {
                    // 只要一个失败就失败
                    if (!result) {
                        finalResult = false;
                    }
                })
                callback(finalResult);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>