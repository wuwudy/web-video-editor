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

</script>

<template>
  <input type="file" class="input-file" @change="handleChange">
</template>

<style lang='scss' scoped>
</style>