import { AccountApiRes } from "@/core/apiReqRes/Account";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { State } from "@/dataAccess/store/store";
import { Store, useStore } from "vuex";
import { AccountModule as Action_AccountModule } from "@/dataAccess/store/actionTypes";
import { Account } from "@/dataAccess/entities/Account";

export class AccountService {

    _store: Store<State>
    _repository: VMoriRepository

    //APIからアカウント情報を取得してStoreに保存
    async getAndStoreSaveByApi(){
        let res = await this._repository.get<AccountApiRes>("account/get")
        if(res.isOk() && res.data != null){
            var module = {
                isLogin: true,
                displayID: res.data.displayID,
                name: res.data.name,
                mail: res.data.mail,
                icon: res.data.icon,
                birthdayYear: res.data.birthdayYear,
                birthdayMonth: res.data.birthdayMonth,
                birthdayDate: res.data.birthdayDate,
                appMail: res.data.appMail
            } as Account

            this._store.dispatch(Action_AccountModule.INITIALIZE_ACCOUNT, module)
        }

    }

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