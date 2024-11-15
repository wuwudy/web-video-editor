<!--  -->
<script lang='ts' setup>
import { nextTick } from 'vue';

const myWorker = new Worker("worker.js", { name: "myWorker" });

nextTick(() => {
  console.log(myWorker.name)
})

</script>

<template>
  <div>WEBCODECS Demo</div>
</template>

<style lang='scss' scoped>
</style>