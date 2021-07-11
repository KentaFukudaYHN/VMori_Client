<style>
</style>
<template>
    <div>
        <img ref="refImage" src="assets/test.png"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Cropper from 'cropperjs'

export default defineComponent({
    setup() {
        let refImage = ref(null)

        onMounted(() =>{
            // new Cropper(refImage.value,{
            //     aspectRatio: 1
            // })
        })

        return {
            refImage
        }
    },
})
</script>
