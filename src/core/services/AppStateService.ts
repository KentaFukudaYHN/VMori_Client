import { AppStateModule } from "@/dataAccess/store/actionTypes";
import { State } from "@/dataAccess/store/store";
import { Store } from "vuex";

export class AppStateService {
    private _store: Store<State>

    /**
     * ローディング中の有無取得
     * @returns 
     */
    getIsLoading(){
        return this._store.state.appState.isLoading
    }

    /**
     * ローディングの有無更新
     * @param isLoading 
     */
    async updateIsLoadin(isLoading: boolean){
        await this._store.dispatch(AppStateModule.UPDATE_LOADING, isLoading)
    }

    constructor(store: Store<State>){
        this._store = store
    }
}