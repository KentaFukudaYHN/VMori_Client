<style lang="scss" scoped>
    .guide{
        display: flex;
        height: 100%;
        &-container{
            width:200px;
            height: 100%;
        }

        &-content{
            width: 100%;
        }
    }
</style>

<template>
    <vm_header @emit-clickMenuBtn="onClickMenuBtn"/>
    <div class="guide">
        <div v-if="menu.show" class="guide-container">
            <nav>
                <ul>
                    <li>
                        ホーム
                    </li>
                    <li>
                        ライブラリ
                    </li>
                </ul>
            </nav>
        </div>
        <div class="guide-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import VM_Header from '@/components/VM_VideoHeader.vue'
import { defineComponent, reactive, toRefs } from 'vue'

const state = toRefs(reactive({
    menu:{
        show: false
    }
}))

export default defineComponent({
    components:{
        'vm_header': VM_Header
    },
    setup() {
        //メニュー
        return{
            menu: state.menu.value,
            onClickMenuBtn
        }
    },
})

//メニューボタンクリック
function onClickMenuBtn(){
    state.menu.value.show = !state.menu.value.show
}
</script>