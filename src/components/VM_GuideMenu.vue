<style lang="scss" scoped>
    .guide{
        display: flex;
        &-container{
            width:200px;
            height: 100%;
        }

        &-content{
            width: 100%;
        }
    }
    .guide-sp{
        display: none;
        @include sp{
            display: flex;
            align-items: center;
            justify-content: space-around;
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #fff;
            padding: 10px 0 10px 0;
                        
        }
        & .guidesp{

            &-menu{
                width: 30px;
                height: 30px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
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
    <div class="guide-sp">
        <div class="guidesp-menu icon-menusp-search"></div>
        <div class="guidesp-menu icon-menusp-like"></div>
        <div class="guidesp-menu icon-menusp-up"></div>
        <div class="guidesp-menu icon-menusp-history"></div>
        <div class="guidesp-menu icon-menusp-channels"></div>
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