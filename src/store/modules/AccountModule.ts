//アカウントモジュール
export type AccountModule = {
    //ログインの有無
    isLogin: boolean,
    //表示ID
    displayID: string,
    //名前
    name: string,
    //メールアドレス
    mail: string,
    //アイコン
    icon: string,
    //生年月日 年
    birthdayYear: string,
    //生年月日 月
    birthdayMonth: string,
    //生年月日 日
    birthdayDate: string,
    //メールアドレス認証の有無
    appMail: boolean
} 
