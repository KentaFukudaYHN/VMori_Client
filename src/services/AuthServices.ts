export class AuthService{
    CreateAppReqMsg(mail: string): string{
        const now = new Date();
        const date = new Date();
        date.setDate(now.getDate() + 1);
        return "メールアドレスが本人のものであることを確認するために、" + mail + "に確認のメールを送信しました！ \r\n\r\n" +
            date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "時" + date.getMinutes() + "分"+ "までにメールに添付されているurlにアクセスして確認をお願いします \r\n\r\n" 
            // "※いつでもアカウント情報画面で認証メールを送ることができます。";
    }
}
