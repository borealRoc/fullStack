<template>
    <div>
        <p>This is news page.</p>
    </div>
</template>

<script>
    export default {
        name: 'News',
        data() {
            return {
                test: '在beforeRouteEnter中，我还是被你取到了',
            }
        },
        beforeRouteEnter (to, from, next) {
            console.log('news-from', from);
            console.log('news-to', to);
            next(vm => {
                console.log('news-next', vm.$data.test);
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>