//アカウント情報レスポンス
export type AccountApiRes = {
    displayID: string,
    name: string,
    mail: string,
    icon: string,
    birthdayYear: string,
    birthdayMonth: string,
    birthdayDate: string,
    appMail: boolean
}

//メールアドレス本人認証レスポンス
export type AppReqMailApiRes = {
    success: boolean;
    errMsg: string;
}

