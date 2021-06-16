<style lang="scss" scoped>
.home{
    &-searchcontainer{
        width: 80%;
        max-width: 1020px;
        margin: 0 auto;
    }

    &-searchdetail{
        margin: 5px 10px;
    }
}

</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div class="home-searchcontainer">
                <vm-search-genre></vm-search-genre>
                <vm-search-detail class="home-searchdetail"></vm-search-detail>
            </div>
                
            <vm-videolist></vm-videolist>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VM_Guide from '@/components/VM_GuideMenu.vue'
import VM_VideoList from '@/components/VM_VideoList.vue'
import VM_SearchGenre from '@/components/VM_SearchGenre.vue'
import VM_SearchDetail from '@/components/VM_SearchDetail.vue'

export default defineComponent({
    components:{
        'vm-videolist': VM_VideoList,
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail
    },
    setup() {
        
    },
})
</script>
