import VMoriRepository from "@/repository/VMoriRepository";
import { State } from "@/store/store";
import { Store, useStore } from "vuex";

export class AccountService {

    _store: Store<State>
    _repository: VMoriRepository

    //アカウントアイコンを取得
    getAcoccountIcon(){
        const icon = this._store.state.account.icon
        if(icon == '' || icon == null){
            return 'assets/icon_default.png'
        }

        return icon
    }

    //コンストラクタ
    constructor(store: Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}