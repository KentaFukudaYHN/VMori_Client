<template>
    <Suspense>
        <template #default>
            <router-view/>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'

export default defineComponent({
    name: 'App'
})
</script>