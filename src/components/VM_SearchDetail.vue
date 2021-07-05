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

            @include sp{
                padding: 4px 10px;
                border: solid 1px $form-border-color;
                color: $gray-font-color;
            }

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
                @include sp{
                    display: none;
                }
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

                @include sp{
                    display: none;
                }
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
                @include tab{
                    margin:0;
                }

                &-transition{
                    @include tab{
                        margin-top:10px
                    }
                }
                &-transitionlang{
                    @include tab{
                        margin-top:10px
                    }
                }
            }
            @include tab{
                display: none;
            }

            &-modal{
                display: none;
                @include tab{
                    display: block;
                }

                & .searchdetail-update{
                    width:100%;
                    margin-top:10px;
                }
            }
        }
        &-itembox {
            display: flex;
            flex-wrap: wrap;
        }
        &-speaklangs{
            @include tab{
                display: block;
                margin-top:10px;
            }  
        }
        &-transition{
            @include tab{
                display: block;
                margin:10px 0 0 0;
            }
        }
        &-transitionlang{
            @include tab{
                display: block;
                margin:10px 0 0 0;
            }
        }
        &-selecter-container{
            margin: 10px 0;
            display: flex;
            align-items: center;
            & .selecter-item-all{
                margin-right: 10px;
                    @include tab{
                    display: inline-block;
                }
            }

            & ::v-deep .selecter-item{            
                @include tab{
                    display: inline-block;
                }
            }

            @include tab{
                display: block;
            }
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
                    <div class="searchdetail-selecter-container" >
                        <span class="selecter-item selecter-item-all" :class="{'selecter-item-select': selectAllLangs}" @click="onChangeLang(selectAllLangsKinds)">全て</span>
                        <vm-selecter @emit-change="onChangeLang" :list="langSelecterItems" :disabled="selectAllLangs"></vm-selecter>
                    </div>
                </div>

                <div class="searchdetail-boxitem searchdetail-boxitem-transition">
                    <span>翻訳</span>
                    <div class="searchdetail-selecter-container">
                        <span class="selecter-item selecter-item-all" :class="{'selecter-item-select': selectAllTranslation}" @click="onChangeTransition(selectAllTranslationKinds)">全て</span>
                        <vm-selecter class="searchdetail-transition" @emit-change="onChangeTransition" :list="transitionSelecterItems" :disabled="selectAllTranslation"></vm-selecter>
                    </div>
                </div>

                <div class="searchdetail-boxitem" v-if="showTransitionLang">
                    <span>翻訳している言葉</span>
                    <div class="searchdetail-selecter-container">
                        <span class="selecter-item selecter-item-all" :class="{'selecter-item-select': selectAllTranslationLang}" @click="onChangeTransitionLang(selectAllLangsKinds)">全て</span>
                        <vm-selecter class="searchdetail-transitionlang" @emit-change="onChangeTransitionLang" :list="transitionLangSelecterItem" :disabled="selectAllTranslationLang"></vm-selecter>
                    </div>
                </div>
            </div>
            <div>
                <button class="searchdetail-update btn-normal-mini" @click="searchVideos">更新</button>
            </div>
        </div>
        <vm-modal class="searchdetail-box-modal" v-if="showSearchBox" :showCloseBtn="true" @emit-clickCloseBtn="closeSearchVideosModal">
            <template v-slot:content>
            <span class="title-success">詳細検索</span>
            <div class="searchdetail-itembox">
                <div class="searchdetail-boxitem">
                    <span>話している言葉</span>
                    <div class="searchdetail-selecter-container" >
                        <span class="selecter-item selecter-item-all" :class="{'selecter-item-select': selectAllLangs}" @click="onChangeLang(selectAllLangsKinds)">全て</span>
                        <vm-selecter class="searchdetail-speaklangs" @emit-change="onChangeLang" :list="langSelecterItems" :disabled="selectAllLangs"></vm-selecter>
                    </div>
                </div>

                <div class="searchdetail-boxitem searchdetail-boxitem-transition">
                    <span>翻訳</span>
                    <div class="searchdetail-selecter-container">
                        <span class="selecter-item selecter-item-all" :class="{'selecter-item-select': selectAllTranslation}" @click="onChangeTransition(selectAllTranslationKinds)">全て</span>
                        <vm-selecter class="searchdetail-transition" @emit-change="onChangeTransition" :list="transitionSelecterItems" :disabled="selectAllTranslation"></vm-selecter>
                    </div>
                </div>

                <div class="searchdetail-boxitem  searchdetail-boxitem-transitionlang" v-if="showTransitionLang">
                    <span>翻訳している言葉</span>
                    <div class="searchdetail-selecter-container">
                        <span class="selecter-item selecter-item-all" :class="{'selecter-item-select': selectAllTranslationLang}" @click="onChangeTransitionLang(selectAllLangsKinds)">全て</span>
                        <vm-selecter class="searchdetail-transitionlang" @emit-change="onChangeTransitionLang" :list="transitionLangSelecterItem" :disabled="selectAllTranslationLang"></vm-selecter>
                    </div>
                </div>

                <div>
                    <button class="searchdetail-update btn-primary-mini" @click="searchVideosByModal">更新</button>
                </div>
            </div>
            </template>
        </vm-modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import VM_RadioBox from '@/components/VM_RadioBox.vue'
import VM_Selecter from '@/components/VM_Selecter.vue'
import { SelecterItem } from '@/componentReqRes/Selecter'
import { SearchVideoLanguageKindsToString, SearchVideoTranslationKinds, SearchVideoTranslationToString, VideoLanguageKinds, VideoLanguageKindsToString } from '@/commons/enum'
import { State } from '@/store/store'
import { Store } from 'vuex'
import { VideoService } from '@/services/VideoService'
import VM_Modal from '@/components/VM_Modal.vue'

const state = toRefs(reactive({
    showSearchBox: false,
    langSelecterItem: [] as SelecterItem[],
    allLangSelect: true,
    transitionSelecterItem: [] as SelecterItem[],
    allTranslation: true,
    transitionLangSelecterItem: [] as SelecterItem[],
    allTranslationLang: true,
    selectTransitionItem: () => state.transitionSelecterItem.value.find(x => x.selected),
}))

let store: Store<State>
let videoService: VideoService
export default defineComponent({
    components:{
        'vm-radiobox': VM_RadioBox,
        'vm-selecter': VM_Selecter,
        'vm-modal': VM_Modal
    },
    setup() {
        videoService = new VideoService()

        //話している言語の設定
        initWatchLang()
        initLang(videoService.getLangs())

        //翻訳の有無設定
        initWatchTranslation()
        initTranslation(videoService.getTranlation())

        //翻訳している言語の設定
        initWatchTranslationLang()
        initTranslationLang(videoService.getTranslationLangs())

        return{
            showSearchBox: computed(() => { return videoService.getDetailAvailavle() }),
            clickOpenbtn : async () =>{ videoService.updateDetailAbailavle(! await videoService.getDetailAvailavle()) },
            langSelecterItems: state.langSelecterItem,
            selectAllLangs: state.allLangSelect,
            selectAllLangsKinds: VideoLanguageKinds.UnKnown,
            onChangeLang: (val) => { onChangeLang(val) },
            transitionSelecterItems: state.transitionSelecterItem,
            selectAllTranslation: state.allTranslation,
            selectAllTranslationKinds: SearchVideoTranslationKinds.All,
            onChangeTransition: (val) => { onChangeTransition(val) },
            transitionLangSelecterItem: state.transitionLangSelecterItem,
            selectAllTranslationLang: state.allTranslationLang,
            onChangeTransitionLang: (val) => { onChangeTransitionLang(val) },
            showTransitionLang: computed(() => { return videoService.getTranlation() == 10 }),
            searchVideos: () => { videoService.searchDetailVideoItem() },
            searchVideosByModal: () => { 
                videoService.searchDetailVideoItem()
                videoService.updateDetailAbailavle(false)
            },
            closeSearchVideosModal: () => { videoService.updateDetailAbailavle(false) }

        }
    },
})

//話している言語の監視
function initWatchLang(){
    watch(videoService.getLangs(),(newval, oldval) =>{
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
                text: SearchVideoLanguageKindsToString(kinds),
                selected: targetIndex >= 0
            })
        }
    })

    if(list.indexOf(VideoLanguageKinds.UnKnown) >= 0){
        state.allLangSelect.value = true
    }else{
        state.allLangSelect.value = false
    }
}

//話している言語を変更
function onChangeLang(val: number){
    //changeSelecterItem(state.langSelecterItem.value, val)    
    videoService.updateLang(val)

    if(val != VideoLanguageKinds.UnKnown && state.allLangSelect.value == true){
        videoService.updateLang(VideoLanguageKinds.UnKnown)
    }
}

//翻訳の有無を監視
function initWatchTranslation(){
    watch(videoService.getDetail(),(newval, oldval) =>{
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
        if(isNaN(kindsNum) == false && kinds != SearchVideoTranslationKinds.All){
            state.transitionSelecterItem.value.push({
                val: kinds as number,
                text: SearchVideoTranslationToString(kinds),
                selected: kinds == target
            })
        }
    })

    state.allTranslation.value = target == SearchVideoTranslationKinds.All
}

//翻訳の有無を変更
function onChangeTransition(val: number){
    videoService.updateTranslation(val)
}

//翻訳している言語の監視
function initWatchTranslationLang(){
    watch(videoService.getTranslationLangs(),(newval, oldval) =>{
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
                text: SearchVideoLanguageKindsToString(kinds),
                selected: targetIndex >= 0
            })
        }
    })

if(list.indexOf(VideoLanguageKinds.UnKnown) >= 0){
        state.allTranslationLang.value = true
    }else{
        state.allTranslationLang.value = false
    }
}

//翻訳している言葉の変更
function onChangeTransitionLang(val: number){
    videoService.updateTranslationLang(val)

    if(val != VideoLanguageKinds.UnKnown && state.allTranslationLang.value == true){
        videoService.updateTranslationLang(VideoLanguageKinds.UnKnown)
    }

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
