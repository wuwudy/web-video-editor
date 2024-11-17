<!--  -->
<script lang='ts' setup>
import {ref} from 'vue'

const inputElement = ref<HTMLInputElement | null>(null)

inputElement.value = document.querySelector('.input-file') as HTMLInputElement

function handleChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    console.log(file)
  }
}

function handleClick() {
  //发fetch请求
  fetch('https://api.apiopen.top/searchMusic?name=好久不见', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    document.querySelector('div')!.innerHTML = JSON.stringify(data)
  })
}

</script>

<template>
  <button @click="handleClick">测试</button>
  <div></div>
  <input type="file" class="input-file" @change="handleChange">
</template>

<style lang='scss' scoped>
</style>