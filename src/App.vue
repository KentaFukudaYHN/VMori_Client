<style>
    .loading{
        pointer-events: none;
    }
</style>
<template>
    <Suspense>
        <template #default>
            <div :class="{'loading': loading}">
                <div v-if="loading" class="loader-wrap">
                    <div class="loader"></div>
                </div>
                <router-view/>
            </div>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from './dataAccess/store/store'
import { AppStateService } from '@/core/services/AppStateService'

export default defineComponent({
    name: 'App',
    setup(){
        const store = useStore()
        const appStateService = new AppStateService(store)
        return {
            loading: computed(() => appStateService.getIsLoading())
        }
    }
})
</script>