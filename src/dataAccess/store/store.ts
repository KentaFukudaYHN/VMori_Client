import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { latestVideoModule, State as LatestVideoState} from '@/dataAccess/store/modules/LatestVideosModule'
import { videoModule, State as videoState} from '@/dataAccess/store/modules/VideoModule'
import { accountModule, State as accountState} from '@/dataAccess/store/modules/AccountModule'
//stateの型定義
export type State = {
    // account: AccountModule,
    // video: VideoModule,
    latestVideo: LatestVideoState,
    video: videoState,
    account: accountState
}

//storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol()

//Store本体
export const store = createStore<State>({
    modules:{
        latestVideo: latestVideoModule,
        video: videoModule,
        account: accountModule
    },
});

//useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () =>{
    return baseUseStore(key)
}