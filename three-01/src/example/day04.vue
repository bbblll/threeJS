<template>
    <div id="scene">

    </div>
</template>
<script setup>
import {
    init
} from "./day"
import {
    onMounted
} from "vue"

onMounted(() => {
    init()
})
</script>
<style scoped>
#scene {
    position: absolute;
    inset: 0;
}
</style>