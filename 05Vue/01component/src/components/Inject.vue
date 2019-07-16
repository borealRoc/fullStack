<template>
    <div>
        <p class="inject-txt">{{ancestorVal}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Inject',
        inject: ['ancestorVal']
    }
</script>

<style lang="scss" scoped>
.inject-txt {
    font-size: 20px;
    font-weight: bold;
    color: #e00000;
}
</style>