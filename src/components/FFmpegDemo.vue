<!--  -->
<script lang='ts'>
import { FFmpeg } from '@ffmpeg/ffmpeg'
import type { LogEvent } from '@ffmpeg/ffmpeg/dist/esm/types'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { defineComponent, ref } from 'vue'
import { nextTick } from 'vue'

const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
// const videoURL = 'https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi'
const videoURL = 'http://localhost:5173/src/video-15s.avi'

export default defineComponent({
  name: 'App',
  setup() {
    const ffmpeg = new FFmpeg()
    const message = ref('Click Start to Transcode')
    let video = ref('')
    const inputElement = ref<HTMLInputElement | null>(null)

    nextTick(() => {
      inputElement.value = document.querySelector('.input-file') as HTMLInputElement
    })

    async function transcode() {

      message.value = 'Loading ffmpeg-core.js'
      ffmpeg.on('log', ({ message: msg }: LogEvent) => {
        message.value = msg
      })
      const ifLoad = await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
      })
      console.log('是否加载'+ifLoad)

      message.value = 'Start transcoding'
      // await ffmpeg.writeFile('test.avi', await fetchFile(videoURL))

      if(inputElement.value?.files?.[0]) {
        console.log("File selected")
        const arrayBuffer = await inputElement.value?.files?.[0].arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)
        await ffmpeg.writeFile('test.avi', uint8Array)

        await ffmpeg.exec(['-i', 'test.avi', 'test.mp4'])
        message.value = 'Complete transcoding'
        const data = await ffmpeg.readFile('test.mp4')
        video.value = URL.createObjectURL(new Blob([(data as Uint8Array).buffer], { type: 'video/mp4' }))
      }
      else {
        message.value = 'No file selected'
      }


    }

    function handleChange(event: Event) {
      console.log("INside");
      
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        video.value = URL.createObjectURL(file)
        
      }
    }

    return {
      video,
      message,
      transcode,
      handleChange
    }
  }
})
</script>

<template>
  <input type="file" class="input-file" @change="handleChange" />
  <br/>
  <video :src="video" controls></video>
  <br/>
  <button @click="transcode">Start</button>
  <p>{{ message }}</p>
</template>

<style lang='scss' scoped>
</style>