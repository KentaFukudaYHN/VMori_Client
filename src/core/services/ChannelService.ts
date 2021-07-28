import { State } from "@/dataAccess/store/store";
import { Store } from "vuex";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { ChannelSortKinds } from "../enum";
import { ChannelListRes } from "../apiReqRes/Channel";

/**
 * チャンネルService
 */
export class ChannelService{
    private _store: Store<State>
    private _repository: VMoriRepository

    /**
     * チャンネル情報取得
     * @param page 
     * @param displayNum 
     * @param sortKinds 
     * @param isDesc 
     * @returns 
     */
    async getChannels(page: number, displayNum: number, sortKinds: ChannelSortKinds, isDesc: boolean){
        const res = await this._repository.get<ChannelListRes>('channel/getlist', {
            params:{
                Page: page,
                DisplayNum: displayNum,
                SortKinds: sortKinds,
                IsDesc: isDesc
            }
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    /**
     * コンストラクタ
     * @param store 
     * @param repository 
     */
    constructor(store: Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}