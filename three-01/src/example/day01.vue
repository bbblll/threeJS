<template>
    <div id="scene">

    </div>
</template>
<script setup>
import {
    init,
    render,
    createSky,
    addAxes,
    createPool,
    addIsland,
    addControl,
    addlight
} from "./day01"

import {
    onMounted
} from "vue"

onMounted(() => {
    init();
    render();
    addControl()//添加控制
    addAxes()
    createSky();
    createPool();
    addIsland();
    addlight()

})
</script>
<style scoped>
#scene {
    position: absolute;
    inset: 0px;
}
</style>