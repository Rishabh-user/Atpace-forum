<template>
    <div></div>
</template>

<script>

export default {
    name: 'LogoutUser',
    mounted() {
        this.$store.dispatch('logoutUser')
    },
    
}
</script>

