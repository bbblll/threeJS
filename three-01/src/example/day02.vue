<template>
    <div id="scene">
    </div>
</template>
<script setup>
import {
    initScene
} from "./day02"
import { onMounted } from "vue"
onMounted(() => {
    initScene()
})


</script>


<style scoped>
#scene {
    position: absolute;
    inset: 10px;
    background-color: rgb(74, 211, 211);
}
</style>