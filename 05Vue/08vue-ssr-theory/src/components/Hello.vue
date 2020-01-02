<template>
    <div>
        <h1>{{name}}, I'm {{$store.state.count}} years old.</h1>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:'Hello'
        }
    }
}
</script>
