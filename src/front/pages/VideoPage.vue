
<template>
    <vm-videodetail :key="videoKey" :id="videoKey" @emit-changeVideo="changeVideo"></vm-videodetail>
</template>

<script lang="ts">
import { defineComponent, ref, } from 'vue'
import VM_VideoDetail from '@/front/components/VM_VideoDetail.vue'
import { useRouter } from '@/router/router'
import { Router, onBeforeRouteUpdate, useRoute } from 'vue-router'

let router: Router
export default defineComponent({
    components:{
        'vm-videodetail': VM_VideoDetail
    },
    setup() {

        let videoKey = ref(useRoute().query.v)
        router = useRouter()

        onBeforeRouteUpdate(async (to, from) =>{
            if(to.query.v != videoKey.value){
                videoKey.value = to.query.v as string
            }
        })
        return{
            videoKey: videoKey,
            changeVideo: async (videoId: string) => {
                await router.push({name: 'Video', query: { v:videoId }})
                videoKey.value = videoId
            }
        }
    },
})
</script>
