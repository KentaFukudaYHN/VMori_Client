import { VideoSummaryInfoByGenreApiRes } from "@/core/apiReqRes/RankingVideo"
import { SearchVideoGenreKinds, SortKinds, VideoGenreKinds } from "@/core/enum"
import { SelecterItem } from "@/front/componentReqRes/Selecter"
import VMoriRepository from "@/dataAccess/repository/VMoriRepository"
import { State } from "@/dataAccess/store/store"
import { Store } from "vuex"
export class RankingVideoService{
    private _store: Store<State>
    private _repository: VMoriRepository
    private TOP_GENRE_KINDS_VAL = 99999

    getTopGenreKindsVal(){
        return this.TOP_GENRE_KINDS_VAL
    }

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