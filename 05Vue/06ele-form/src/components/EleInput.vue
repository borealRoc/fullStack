<template>
    <div>
        <input :type="type" :value="value" @input="inputHandler"/>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String
            },
        },
        methods: {
            inputHandler(e) {
                let inputVal = e.target.value
                this.$emit('input', inputVal)
                this.$parent.$emit('validata', inputVal)
            }
        },
    }
</script>

<style scoped>

</style>