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
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>