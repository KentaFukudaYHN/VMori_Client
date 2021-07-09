import { VideoSummaryInfoByGenreApiRes } from "@/apiReqRes/RankingVideo"
import { SearchVideoGenreKinds, SortKinds, VideoGenreKinds } from "@/commons/enum"
import VMoriRepository from "@/repository/VMoriRepository"
import { State } from "@/store/store"
import { Store } from "vuex"
import { number } from "yup/lib/locale"
export class RankingVideoService{
    private _store: Store<State>
    private _repository: VMoriRepository

    //ジャンルごとの動画ランキングを取得
    async getTopVideos(){
        const res = await this._repository.post<VideoSummaryInfoByGenreApiRes>('video/GetListByGenre',{
            searchReq:{
                page: 1,
                displayNum: 30,
                sortKinds: SortKinds.ViewCount                
            },
            genres:[SearchVideoGenreKinds.All, SearchVideoGenreKinds.SmallTalk,
                SearchVideoGenreKinds.Entertainment, SearchVideoGenreKinds.Game,
                SearchVideoGenreKinds.Song]
        })
        console.log(res.data)
        if(res.isOk()){
            return res.data
        }
    }

    constructor(store:Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}