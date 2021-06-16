<style lang="scss" scoped>
    .searchdetail{
        &-openbtncontainer{
            position: relative;
        }

        &-openbtn{
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            font-weight: bold;
            margin-left: 15px;
            cursor: pointer;
            &-close::before{
                content: '';
                position: absolute;
                top:50%;
                left:0;
                transform: translateY(-50%);
                display: inline-block;
                width: 0;
                height: 0;
                border-left: 9px solid black;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
            }
            &-open{
                margin-left:18px;
            }
            &-open::before{
                @extend .searchdetail-openbtn-close;
                position: absolute;
                top:50%;
                left:0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;;
                border-top: 9px solid black;
                margin: 3px 3px 0 0px;  
            }
        }
        &-box{
            display: flex;
            align-items: flex-end;
            flex-wrap: wrap;
            justify-content: space-between;
            &item{
                margin: 0 16px;
                min-width: 220px;
                &:first-child{
                    margin-left: 0;
                }

                &:last-child{
                    margin-right: 0;
                }
            }
        }
        &-itembox {
            display: flex;
            flex-wrap: wrap;
        }
        &-lang{
            margin: 10px 0;
        }
        &-transition{
            margin: 10px 0;
        }
        &-transitionlang{
            margin: 10px 0;
        }
        &-update{
            margin-bottom:4px;
        }
    }
</style>

<template>
    <div class="searchdetail-container">
        <div class="searchdetail-openbtncontainer">
            <span   class="searchdetail-openbtn" 
                    :class="{'searchdetail-openbtn-open': showSearchBox, 'searchdetail-openbtn-close': !showSearchBox }"
                    @click="clickOpenbtn">
                    詳細検索
            </span>
        </div>
        <div class="searchdetail-box" v-if="showSearchBox">
            <div class="searchdetail-itembox">
                <div class="searchdetail-boxitem">
                    <span>話している言葉</span>
                    <vm-selecter class="searchdetail-lang" @emit-change="onChangeLang" :list="langSelecterItems" ></vm-selecter>
                </div>

                <div class="searchdetail-boxitem">
                    <span>翻訳</span>
                    <vm-selecter class="searchdetail-transition" @emit-change="onChangeTransition" :list="transitionSelecterItems" ></vm-selecter>
                </div>

                <div class="searchdetail-boxitem" v-if="showTransitionLang">
                    <span>翻訳している言葉</span>
                    <vm-selecter class="searchdetail-transitionlang" @emit-change="onChangeTransitionLang" :list="transitionLangSelecterItem" ></vm-selecter>
                </div>
            </div>
            <div>
                <button class="searchdetail-update btn-normal-mini">更新</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import VM_RadioBox from '@/components/VM_RadioBox.vue'
import VM_Selecter from '@/components/VM_Selecter.vue'
import { SelecterItem } from '@/componentReqRes/Selecter'
import { SearchVideoTranslationKinds, SearchVideoTranslationToString, VideoLanguageKinds, VideoLanguageKindsToString } from '@/commons/enum'
import { State, useStore } from '@/store/store'
import { Store } from 'vuex'
import { SearchVideoService } from '@/services/SearchVideoService'

const state = toRefs(reactive({
    showSearchBox: false,
    langSelecterItem: [] as SelecterItem[],
    transitionSelecterItem: [] as SelecterItem[],
    transitionLangSelecterItem: [] as SelecterItem[],
    selectTransitionItem: () => state.transitionSelecterItem.value.find(x => x.selected),
}))

let store: Store<State>
let searchVideoService: SearchVideoService
export default defineComponent({
    components:{
        'vm-radiobox': VM_RadioBox,
        'vm-selecter': VM_Selecter,
    },
    setup() {
        store = useStore()
        searchVideoService = new SearchVideoService(store)

        //話している言語の設定
        initWatchLang()
        initLang(searchVideoService.getLangs())

        //翻訳の有無設定
        initWatchTranslation()
        initTranslation(searchVideoService.getTranlation())

        //翻訳している言語の設定
        initWatchTranslationLang()
        initTranslationLang(searchVideoService.getTranslationLangs())

        return{
            showSearchBox: state.showSearchBox,
            clickOpenbtn : () =>{ state.showSearchBox.value = !state.showSearchBox.value },
            langSelecterItems: state.langSelecterItem,
            onChangeLang: (val) => { onChangeLang(val) },
            transitionSelecterItems: state.transitionSelecterItem,
            onChangeTransition: (val) => { onChangeTransition(val) },
            transitionLangSelecterItem: state.transitionLangSelecterItem,
            onChangeTransitionLang: (val) => { onChangeTransitionLang(val) },
            showTransitionLang: computed(() => { return store.state.searchCriteriaVideo.detail.translation == 10 })

        }
    },
})

//話している言語の監視
function initWatchLang(){
    watch(searchVideoService.getLangs(),(newval, oldval) =>{
        initLang(newval)
    })
}

//話している言語を設定
function initLang(list: VideoLanguageKinds[]){
    state.langSelecterItem.value.splice(0, state.langSelecterItem.value.length)

    Object.entries(VideoLanguageKinds).forEach(([key, val]) =>{
        const kindsNum = Number(key)
        const kinds = kindsNum as VideoLanguageKinds
        if(isNaN(kindsNum) == false && kinds != VideoLanguageKinds.UnKnown){
            const targetIndex = list.indexOf(kinds)
            state.langSelecterItem.value.push({
                val: kinds as number,
                text: VideoLanguageKindsToString(kinds),
                selected: targetIndex >= 0
            })
        }
    })
}

//話している言語を変更
function onChangeLang(val: number){
    //changeSelecterItem(state.langSelecterItem.value, val)    
    searchVideoService.updateLang(val)
}

//翻訳の有無を監視
function initWatchTranslation(){
    watch(searchVideoService.getDetail(),(newval, oldval) =>{
        initTranslation(newval.translation )
    })
}

//翻訳の有無を設定
function initTranslation(target: SearchVideoTranslationKinds){
    //初期化
    state.transitionSelecterItem.value.splice(0, state.transitionSelecterItem.value.length)

    Object.entries(SearchVideoTranslationKinds).forEach(([key, val]) =>{
        const kindsNum = Number(key)
        const kinds = kindsNum as SearchVideoTranslationKinds
        if(isNaN(kindsNum) == false){
            state.transitionSelecterItem.value.push({
                val: kinds as number,
                text: SearchVideoTranslationToString(kinds),
                selected: kinds == target
            })
        }
    })
}

//翻訳の有無を変更
function onChangeTransition(val: number){
    searchVideoService.updateTranslation(val)
}

//翻訳している言語の監視
function initWatchTranslationLang(){
    watch(searchVideoService.getTranslationLangs(),(newval, oldval) =>{
        initTranslationLang(newval)
    })
}

//翻訳している言語の設定
function initTranslationLang(list: VideoLanguageKinds[]){
    state.transitionLangSelecterItem.value.splice(0, state.transitionLangSelecterItem.value.length)

    Object.entries(VideoLanguageKinds).forEach(([key, val]) =>{
        const kindsNum = Number(key)
        const kinds = kindsNum as VideoLanguageKinds
        if(isNaN(kindsNum) == false && kinds != VideoLanguageKinds.UnKnown){
            const targetIndex = list.indexOf(kinds)
            state.transitionLangSelecterItem.value.push({
                val: kinds as number,
                text: VideoLanguageKindsToString(kinds),
                selected: targetIndex >= 0
            })
        }
    })}

//翻訳している言葉の変更
function onChangeTransitionLang(val: number){
    searchVideoService.updateTranslationLang(val)
    //changeSelecterItem(state.transitionLangSelecterItem.value, val)    
}

//SlecterItemの変更 ※複数選択用
function changeSelecterItem(list: Array<any>, val:number){
    const targetIndex = list.findIndex(x => x.val == val)

    const before = list.splice(0, list.length)
    before.forEach((x, index) => {
        if(targetIndex == index){
            //反転させる
            before[index].selected = !before[index].selected
        }
        list.push(before[index])
    })

}
</script>
