import { State } from "@/store/store";
import { Store } from "vuex";
import VMoriRepository from "@/repository/VMoriRepository";
import { VideoSummaryInfoApiRes}  from '@/apiReqRes/Video'
import { Video } from '@/store/actionTypes'


export class VideoService {
    private _store: Store<State>
    private _repository: VMoriRepository

    //動画リストの更新
    public async initVideoItems(){
        const res = await this._repository.get<VideoSummaryInfoApiRes>('video/getlist', {
            params:{
                page: 1,
                displayNum: 30
            }
        })

        console.log(res)

        await this._store.dispatch(Video.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    //コンストラクタ
    constructor(store: Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}