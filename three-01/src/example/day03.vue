<template>
    <div id="scene">
    </div>
</template>

<style scoped>
#scene {
    position: absolute;
    inset: 0;
}
</style>

<script setup>
import {
    init,
} from "./day03"
import {
    onMounted
} from "vue"

onMounted(() => {
    init()
})
</script>