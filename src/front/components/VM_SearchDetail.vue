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
            cursor: pointer;
            padding-left: 1em;
            @include pc{
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
                @include pc{
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

                @include pc{
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
                @include pc{
                    margin:0;
                }

                &-transition{
                    @include pc{
                        margin-top:10px
                    }
                }
                &-transitionlang{
                    @include pc{
                        margin-top:10px
                    }
                }
            }
            @include pc{
                display: none;
            }

            &-modal{
                display: none;
                @include pc{
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
            @include pc{
                display: block;
                margin-top:10px;
            }  
        }
        &-transition{
            @include pc{
                display: block;
                margin:10px 0 0 0;
            }
        }
        &-transitionlang{
            @include pc{
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
                    @include pc{
                    display: inline-block;
                }
            }

            & ::v-deep .selecter-item{            
                @include pc{
                    display: inline-block;
                }
            }

            @include pc{
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
import { computed, defineComponent, PropType, reactive, ref, SetupContext, toRefs, watch, watchEffect } from 'vue'
import VM_RadioBox from '@/front/components/VM_RadioBox.vue'
import VM_Selecter from '@/front/components/VM_Selecter.vue'
import { SelecterItem } from '@/front/componentReqRes/Selecter'
import VM_Modal from '@/front/components/VM_Modal.vue'
import { SearchVideoLanguageKindsToString, SearchVideoTranslationKinds, SearchVideoTranslationToString, VideoLanguageKinds } from '@/core/enum'
import { SearchDetail } from '../componentReqRes/SearchDetail'

const state = toRefs(reactive({
    //詳細検索表示有無
    showSearchBox: false,
    //選択している『話している言葉』のkindsのリスト
    selectedLangs: [] as VideoLanguageKinds[],
    //話している言葉の選択肢リスト
    langSelecterItem: [] as SelecterItem[],
    //選択している『翻訳の有無』のkinds
    selectedTransration: SearchVideoTranslationKinds.All,
    //翻訳の有無の選択肢リスト
    transitionSelecterItem: [] as SelecterItem[],
    //選択している『翻訳している言語』のkindsのリスト
    selectedTranslationLangs: [] as VideoLanguageKinds[],
    //翻訳している言語の選択肢リスト
    transitionLangSelecterItem: [] as SelecterItem[],
}))

type Props = {
    //話している言語
    langs: VideoLanguageKinds[],
    //翻訳の種類
    translationKind: SearchVideoTranslationKinds
    //翻訳している言語
    translationLangs: VideoLanguageKinds[]
    //詳細検索の有無
    detailAvailable: boolean
}

export default defineComponent({
    components:{
        'vm-radiobox': VM_RadioBox,
        'vm-selecter': VM_Selecter,
        'vm-modal': VM_Modal
    },
    props:{
        //話している言語
        langs:{
            type: Object as PropType<VideoLanguageKinds[]>,
            default: [VideoLanguageKinds.UnKnown]
        },
        //翻訳の有無種類
        translationKind:{
            type: Object as PropType<SearchVideoTranslationKinds>,
            default: SearchVideoTranslationKinds.All
        },
        //翻訳している言語
        translationLangs: {
            type: Object as PropType<VideoLanguageKinds[]>,
            default: [VideoLanguageKinds.UnKnown]
        },
        //詳細検索の有無
        detailAvailable:{
            type: Boolean,
            default: false
        }
    },
    emits:['emit-clickSearchBtn'],
    setup(props: Props, context: SetupContext) {

        //選択中の話している言語を保持
        state.selectedLangs = ref(props.langs)
        //話している言語の選択肢作成
        initLangSelecterItems(props.langs)

        //翻訳の有無の選択肢作成
        state.selectedTransration.value = props.translationKind
        initTranslationSelecterItem(props.translationKind)

        //翻訳している言語を保持
        state.selectedTranslationLangs = ref(props.translationLangs)
        //翻訳している言語の設定
        initTranslationLangSelecterItems(props.translationLangs)

        state.showSearchBox.value = props.detailAvailable

        return{
            //詳細検索の表示有無
            showSearchBox: state.showSearchBox,
            //詳細検索表示非表示ボタンのクリック
            clickOpenbtn : () =>{ state.showSearchBox.value = !state.showSearchBox.value },
            //話している言語の選択肢リスト
            langSelecterItems: state.langSelecterItem,
            //話している言語で『全て』を選択しているかどうか
            selectAllLangs: computed(() => state.selectedLangs.value.indexOf(VideoLanguageKinds.UnKnown) > -1),
            //話している言語の『全て』のkinds
            selectAllLangsKinds: VideoLanguageKinds.UnKnown,
            //話している言語の変更
            onChangeLang: (val) => { onChangeLang(val) },
            //翻訳の有無の選択肢リスト
            transitionSelecterItems: state.transitionSelecterItem,
            //翻訳の有無で『全て』を選択しているかどうか
            selectAllTranslation: computed(() => state.selectedTransration.value == SearchVideoTranslationKinds.All),
            //翻訳の有無の『全て』のKinds
            selectAllTranslationKinds: SearchVideoTranslationKinds.All,
            //翻訳の有無の更新
            onChangeTransition: (val) => { onChangeTransition(val) },
            //翻訳している言語の選択肢リスト
            transitionLangSelecterItem: state.transitionLangSelecterItem,
            //翻訳している言語の『全て』を選択しているかどうか
            selectAllTranslationLang: computed(() => state.selectedTranslationLangs.value.indexOf(VideoLanguageKinds.UnKnown) > -1),
            //翻訳している言語の更新
            onChangeTransitionLang: (val) => { onChangeTransitionLang(val) },
            //翻訳している言語の選択表示有無
            showTransitionLang: computed(() => state.selectedTransration.value == 10),
            //検索ボタンクリック
            searchVideos: () => { clickSerarchBtn(context)},
            searchVideosByModal: () => { clickSearchBtnByModal(context) },
            closeSearchVideosModal: () => { state.showSearchBox.value = false }

        }
    },
})

/**
 * 検索クリック
 */
function clickSerarchBtn(context: SetupContext){
    context.emit('emit-clickSearchBtn', createSearchDetailRes())
}

/**
 * 検索クリック ※モーダル
 */
function clickSearchBtnByModal(context: SetupContext){
    //詳細モーダルを閉じる
    state.showSearchBox.value = false
    context.emit('emit-clickSearchBtn', createSearchDetailRes())
}

function createSearchDetailRes(){
    return {
        langs: state.selectedLangs.value,
        translation: state.selectedTransration.value,
        translationLangs: state.selectedTranslationLangs.value
    } as SearchDetail
}

/**
 * 話している言語を設定
 */
function initLangSelecterItems(list: VideoLanguageKinds[]){
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
}

/**
*話している言語を変更
*/
function onChangeLang(val: number){
    //選択された言語が『全て』でなければ削除
    if(val != VideoLanguageKinds.UnKnown){
        const allKindsIndex = state.selectedLangs.value.indexOf(VideoLanguageKinds.UnKnown)
        if(allKindsIndex > -1){
            state.selectedLangs.value.splice(allKindsIndex, 1)
        }
    }

    //選択された言語が、選択リストの中にあれば削除、無ければ追加
    const tartgetIndex = state.selectedLangs.value.indexOf(val)
    if(tartgetIndex < 0){
        state.selectedLangs.value.push(val)
    }else{
        state.selectedLangs.value.splice(tartgetIndex, 1)
    }

    

    //選択リストの更新
    initLangSelecterItems(state.selectedLangs.value)
}

/**
 * 翻訳の有無を設定
 */
function initTranslationSelecterItem(target: SearchVideoTranslationKinds){
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
}

/**
 * 翻訳の有無を変更
 */
function onChangeTransition(val: number){
    //選択中の翻訳有無の更新
    state.selectedTransration.value = val

    //翻訳の有無の選択肢リストの更新
    initTranslationSelecterItem(val)
}

/**
 * 翻訳している言語の設定
 */
function initTranslationLangSelecterItems(list: VideoLanguageKinds[]){
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
}

/**
 * 翻訳している言葉の変更
 */
function onChangeTransitionLang(val: number){
    //選択された言語が『全て』でなければ削除
    const allKindsIndex = state.selectedTranslationLangs.value.indexOf(VideoLanguageKinds.UnKnown)
    if(allKindsIndex > -1){
        state.selectedTranslationLangs.value.splice(allKindsIndex, 1)
    }


    //選択された言語が、選択リストの中にあれば削除、無ければ追加
    const targetIndex = state.selectedTranslationLangs.value.indexOf(val)
    if(targetIndex < 0){
        state.selectedTranslationLangs.value.push(val)
    }else{
        state.selectedTranslationLangs.value.splice(targetIndex, 1)
    }

    //選択リストの更新
    initTranslationLangSelecterItems(state.selectedTranslationLangs.value)
}

</script>
