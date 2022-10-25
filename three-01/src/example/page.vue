<template>
    <div class="my-container">
        <div id="scene">
        </div>
        <div class="page">
            <h1>ray射线投影</h1>
            <h2>旋转</h2>
        </div>
        <div class="page">
            <h1>炫酷三角形</h1>
            <h2>旋转</h2>
        </div>
        <div class="page">
            <h1>弹跳小球</h1>
            <h2>旋转</h2>
        </div>
    </div>
</template>
<script setup>
import {
    init
} from "./page"
import {
    onMounted
} from "vue"

onMounted(() => {
    init()
})
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
}

.my-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: auto;
    background-color: rgb(58, 83, 129);
}

#scene {
    position: fixed;
    inset: 0;
}

.page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
}
</style>