import VMoriRepository from "@/repository/VMoriRepository";
import { State } from "@/store/store";
import { Store } from "vuex";

export class AuthService{

    _store: Store<State>
    _repository: VMoriRepository

    //ログイン中かどうか確認
    async getIsLogginByApi(){
        const res = await this._repository.get('auth/islogging')
        if(res.isOk() && res.data == true){
            return true
        }else{
            return false
        }
    }

    createAppReqMsg(mail: string): string{
        const now = new Date();
        const date = new Date();
        date.setHours(now.getHours() + 1);
        return "メールアドレスが本人のものであることを確認するために、" + mail + "に確認のメールを送信しました！ \r\n\r\n" +
            date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "時" + date.getMinutes() + "分"+ "までにメールに添付されているリンクにアクセスして確認をお願いします  \r\n\r\n" 
            // "※いつでもアカウント情報画面で認証メールを送ることができます。";
    }

    constructor(store: Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}
