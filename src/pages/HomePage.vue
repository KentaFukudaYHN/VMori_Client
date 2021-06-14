<template>
    <vm-guide>
        <template v-slot:content>
                <vm-videolist></vm-videolist>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VM_Guide from '@/components/VM_GuideMenu.vue'
import VM_VideoList from '@/components/VM_VideoList.vue'

export default defineComponent({
    components:{
        'vm-videolist': VM_VideoList,
        'vm-guide': VM_Guide
    },
    setup() {
        
    },
})
</script>
