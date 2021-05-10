<style scoped>
    .outer{
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
    }
    .inner {
        text-align: center;
        width:80%;
        margin: 0 auto;
        vertical-align: middle;
    }
</style>
<template>
<div class="outer">
    <div class="inner">
        <h1>Vtuberの森</h1>
    </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "../store/store";
import * as ActionTypes from "../store/actionTypes";
import { useRouter } from "../router/router";

export default defineComponent({
  name: "home",
  setup() {
    const store = useStore();
    const recommendVideos = computed(() => store.state.recommendVideoHeader);

    onMounted(async () => {
      await store.dispatch(ActionTypes.INITIALIZE_RECOMMEND_VIDEOS);
    });

    return {
      recommendVideos,
    };
  },
});
</script>
