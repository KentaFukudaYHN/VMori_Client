<style lang="scss" scoped>
    .video-header{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 10px 15px 10px;

        @include sp {
            margin-bottom: 10px;
        }

        & &-icon{
            min-width: 100px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            @include sp{
                min-width: none;
            }
        }

        & .icon-title{
            width: 150px;
            margin: 0;
            @include tab{
                width: 100px;
            }
        }
        & .icon-btn{
            cursor: pointer;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border:none;
            background-size: contain;
            @include tab{
                width: 40px;
                height: 40px;
            }
            @include sp{
                margin-right: 0;
                width: 35px;
                height: 35px;
            }
        }

        & .icon-video-up{
            @include tab{
                width:40px;
                height:40px;
                margin-right:5px;
            }
            @include sp{
                display: none;
            }
        }

        & .video-search{
            display: flex;
            width:50%;
            min-width: 120px;
            margin: 0 25px  0 25px ;
            @include tab{
                margin: 0 10px  0 10px ;
            }
            @include sp{
                display: none;
            }
            &-input{
                width:100%;
                max-width: 800px;
                border:solid 1px $form-border-color;
                box-sizing: border-box;
                padding: 7px;
                &:focus {
                    outline: 0;
                    border-color: transparent;
                    box-shadow: 0 0 0 1px $form-border-sel-color;
                }
            }
            &-btn{
                button{
                    margin: 0;
                    height: 100%;
                    width: 50px;
                    border: solid 1px $form-border-color;
                    background-repeat:no-repeat ;
                    background-position: center;
                }
            }
        }

        & .btn-menu-hamburger{
            margin-right: 20px;
            @include tab{
                width:20px;
                height: 20px;
                margin-right: 5px;
            }
            @include sp{
                display: none;
            }
        }

        & .header-title-container{
            display: flex;
        }

        & .icon-search-dark{
            width: 25px;
            height: 25px;
            margin-right: 15px;
            border:none;
            display: none;
            @include sp{
                display: block;
            }
        }

        & .video-search-sp{
            position: absolute;
            width: 100%;
            display: none;
            z-index: 100;
            top:0;
            left:0;

        }
    }
    .video-header-spsearch {
        //スマホ用検索ボックス表示時にほかの要素は非表示
        & .header-title-container, & .video-search, & .video-header-icon{
            @include sp{
                visibility: hidden;
                pointer-events: none;
            }
        }

        //スマホ用検索ボックスの表示
        & .video-search-sp{
            @include sp{
                display: flex;
            }
            & .video-search-closebtn{
                height: 100%;
                font-size: 20px;
                margin: 0 10px 0 5px;
                display: block;
                font-weight: bold;
                color: $gray-font-color;
                opacity: 0.5;
            }          
        }
    }
</style>
<template>
    <header class="video-header" :class="{'video-header-spsearch': showSpSearchBox}">
        <div class="header-title-container">
            <button class="btn-menu-hamburger" @click="clickMenubtn"></button>
            <img class="icon-title" src='assets/title_icon.png' @click="openTop">
        </div>
        <div class="video-search">
            <input class="video-search-input" :value="searchTextVal" @change="onChangeSearchText"/>
            <div class="video-search-btn ">
                <button class="input-searchbtn-icon" aria-label="検索を実行" @click="search"></button>
            </div>
        </div>
        <div class="video-header-icon">
            <button class="icon-search-dark" @click="clickShowSpSearchBtn"></button>
            <button class="icon-video-up" @click="showUpVideoModal"></button>
            <button @click="openAccount" class="icon-btn" ref="refIconBtn" :style="iconBtnStyle" aria-label="アカウント情報を開く"></button>
        </div>
        <div class="video-search-sp">
            <span class="video-search-closebtn" @click="clickCloseSpSearchBtn">x</span>
            <input class="video-search-input" :value="searchTextVal" @change="onChangeSearchText">
            <div class="video-search-btn ">
                <button class="input-searchbtn-icon" aria-label="検索を実行" @click="search"></button>
            </div>
        </div>
    </header>
    <vm-upload-video v-if="uploadVideo.showModal"
                @emit-clickCloseBtn="hideUpVideoModal"></vm-upload-video>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, toRefs, reactive, SetupContext, watchEffect, Ref } from 'vue'
import VM_Input from '@/front/components/VM_Input.vue'
import VM_UploadVideo from '@/front/components/VM_UploadVideo.vue'
import { useStore } from '@/dataAccess/store/store'
import { VideoService } from '@/core/services/VideoService'
import { AccountService } from '@/core/services/AccountService'
import VMoriRepository from '@/dataAccess/repository/VMoriRepository'
import { router, useRouter } from '@/router/router'
import { pageSetting } from '@/dataAccess/entities/PageSetting'

const state = toRefs(reactive({
    uploadVideo:{
        showModal: false
    }
}))

type Props = {
    searchText: string
}

let accountService: AccountService
let searchText: Ref<string>
export default defineComponent({
    components:{
        'vm-input': VM_Input,
        'vm-upload-video': VM_UploadVideo
    },
    props:{
        searchText: {
            type: String
        }
    },
    emits:['emit-clickMenuBtn', 'emit-clickSearchBtn'],
    setup(props:Props, context: SetupContext) {
        const store = useStore()
        searchText = ref(props.searchText)

        watchEffect(() => {
            searchText.value = props.searchText
        })

        //各サービスの初期化
        accountService = new AccountService(store, new VMoriRepository(useRouter()))

        var iconBtnStyle = ref(createIconBtnStyle(accountService.getAcoccountIcon()))
        // watch(store.state.account,(newval, oldval)=>{
        //    iconBtnStyle.value = createIconBtnStyle(newval.icon)
        // })
        watchEffect(() =>{
            iconBtnStyle.value = createIconBtnStyle(accountService.getAcoccountIcon())
        })

        let showSpSearchBox = ref(false)

        return{
            //動画アップロード
            uploadVideo: state.uploadVideo.value,
            showUpVideoModal: () => { state.uploadVideo.value.showModal = true },
            hideUpVideoModal: () => { state.uploadVideo.value.showModal = false },
            iconBtnStyle: iconBtnStyle,
            //検索
            searchTextVal: searchText,
            onChangeSearchText: async (val) => { onChangeSearchText(val)},
            //メニューボタン
            clickMenubtn: () => { context.emit("emit-clickMenuBtn") },
            //スマートフォン用の検索ボックスを表示するかどうか
            showSpSearchBox: showSpSearchBox,
            //スマートフォン用検索ボックスの表示
            clickShowSpSearchBtn: () => { showSpSearchBox.value = true },
            clickCloseSpSearchBtn: () => { showSpSearchBox.value = false },
            search: () => { search(context) },
            openTop: () => {
                debugger
                router.push('/')
            },
            openAccount: () => router.push(pageSetting.Account)
        }
    },
})

function createIconBtnStyle(backgroundImageUrl: string){
    return {
        'background-image':'url(' +  backgroundImageUrl +')',
    }
}

//検索
function search(context: SetupContext){
    context.emit('emit-clickSearchBtn', searchText.value)
}

//検索テキスト変更検知
function onChangeSearchText(event){
    searchText.value = event.target.value
}
</script>
