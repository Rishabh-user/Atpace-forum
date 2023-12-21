<template>
    <div class="center">
        <h1>404</h1>
        <h3>Page Not Found</h3>
    </div>
</template>

<script>

export default {
    name: 'PageNotFound',
    mounted() {
        console.log("Page Not Found")
    },
    
}
</script>

<style scoped>
.center {
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
/* border: 5px solid #735cdf; */
padding: 10px;
}

.center h1{
    font-size:80px;
    color: #735cdf;
    margin-bottom:40px;
}
.center h3{
    font-size:30px;
    color: #735cdf;
}
</style>

