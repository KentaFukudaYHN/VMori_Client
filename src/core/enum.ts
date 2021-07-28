
export enum MediaTypeKinds{
    pc = 1024,
    tab = 748,
    sp = 480
}

//通知種類
export enum  ConfirmKinds {
    Normal = 0,
    Error = 10,
    Success = 20
}

//動画プラットフォームの種類
export enum VideoPlatFormKinds{
    UnKnown = 0,
    Youtube = 10,
    NikoNiko = 20,
    Twitch = 30,
    TwitchCasting = 40,
}

//動画の言語種類
export enum VideoLanguageKinds{
    UnKnown = 0,
    JP = 10,
    English = 20,
    Other = 30
}

//検索用はなしてる言葉Kinds文字列変換
export function SearchVideoLanguageKindsToString(target: VideoLanguageKinds){
    if(target == VideoLanguageKinds.UnKnown){
        return '全て'
    }

    return VideoLanguageKindsToString(target)
}

export function VideoLanguageKindsToString(target: VideoLanguageKinds){
    switch(target){
        case VideoLanguageKinds.UnKnown:
            return '未設定'
        case VideoLanguageKinds.JP:
            return '日本語'
        case VideoLanguageKinds.English:
            return '英語'
        case VideoLanguageKinds.Other:
            return 'その他'
        default:
            throw new Error('設定されていないKindsです: ' + target)
    }
}

//検索用動画の翻訳種類
export enum SearchVideoTranslationKinds{
    //翻訳なしもありも含む
    All = 0,
    //翻訳あり
    Yes = 10,
    //翻訳なし
    None = 20,


}

export function SearchVideoTranslationToString(kinds: SearchVideoTranslationKinds){
    switch(kinds){
        case SearchVideoTranslationKinds.All:
            return '全て'
        case SearchVideoTranslationKinds.None:
            return 'なし'
        case SearchVideoTranslationKinds.Yes:
            return 'あり'
        default:
            throw new Error('定義されていないSearchVideoTranslationKindsです: ' + kinds)
    }
}

//#region 検索用動画の翻訳種類
export enum SearchVideoGenreKinds{
    All = 0,
    //雑談
    SmallTalk = 10,
    //エンターテイメント
    Entertainment = 20,
    //歌枠
    Song = 30,
    //音楽
    Music = 40,
    //ショートムービー
    Short = 50,
    //ゲーム
    Game = 60,
    //お絵描き
    Drawing = 70,
    //ASMR
    Asmr = 80,
    //ニュース
    News = 90,
    //技術・工作
    Craft = 100,
    //解説・講座
    Course = 110,
    //ドッキリ
    Shock = 120,
    //アウトドア
    Outdoor = 130,
    //自然・環境
    Nature = 140,
    //センシティブ
    Sensitive = 150,
    //その他
    Other = 999,
}

export function SearchVideoGenreKindsToString(target: SearchVideoGenreKinds){
    switch(target){
        case SearchVideoGenreKinds.All:
            return '全て'
        case SearchVideoGenreKinds.SmallTalk:
            return '雑談'
        case SearchVideoGenreKinds.Entertainment:
            return 'エンターテイメント'
        case SearchVideoGenreKinds.Song:
            return '歌枠'
        case SearchVideoGenreKinds.Music:
            return '音楽'
        case SearchVideoGenreKinds.Short:
            return 'ショートムービー'
        case SearchVideoGenreKinds.Game:
            return 'ゲーム'
        case SearchVideoGenreKinds.Drawing:
            return 'お絵描き'
        case SearchVideoGenreKinds.Asmr:
            return 'ASMR'
        case SearchVideoGenreKinds.News:
            return 'ニュース'
        case SearchVideoGenreKinds.Craft:
            return '技術・工作'
        case SearchVideoGenreKinds.Course:
            return '解説・講座'
        case SearchVideoGenreKinds.Shock:
            return 'ドッキリ'
        case SearchVideoGenreKinds.Outdoor:
            return 'アウトドア'
        case SearchVideoGenreKinds.Nature:
            return '自然・環境'
        case SearchVideoGenreKinds.Sensitive:
            return 'センシティブ'
        case SearchVideoGenreKinds.Other:
            return 'その他'
        default:
            throw new Error('定義されていないSearchSearchVideoGenreKindsです: ' + target)
    }
}

//#endregion

//#region 動画のジャンル種類
//動画のジャンル種類
export enum VideoGenreKinds{
    All = 0,
    //雑談
    SmallTalk = 10,
    //エンターテイメント
    Entertainment = 20,
    //歌枠
    Song = 30,
    //音楽
    Music = 40,
    //ショートムービー
    Short = 50,
    //ゲーム
    Game = 60,
    //お絵描き
    Drawing = 70,
    //ASMR
    Asmr = 80,
    //ニュース
    News = 90,
    //技術・工作
    Craft = 100,
    //解説・講座
    Course = 110,
    //ドッキリ
    Shock = 120,
    //アウトドア
    Outdoor = 130,
    //自然・環境
    Nature = 140,
    //センシティブ
    Sensitive = 150,
    //その他
    Other = 999,
}
export function VideoGenreKindsToString(target: VideoGenreKinds){
    switch(target){
        case VideoGenreKinds.All:
            return '全て'
        case VideoGenreKinds.SmallTalk:
            return '雑談'
        case VideoGenreKinds.Entertainment:
            return 'エンターテイメント'
        case VideoGenreKinds.Song:
            return '歌枠'
        case VideoGenreKinds.Music:
            return '音楽'
        case VideoGenreKinds.Short:
            return 'ショートムービー'
        case VideoGenreKinds.Game:
            return 'ゲーム'
        case VideoGenreKinds.Drawing:
            return 'お絵描き'
        case VideoGenreKinds.Asmr:
            return 'ASMR'
        case VideoGenreKinds.News:
            return 'ニュース'
        case VideoGenreKinds.Craft:
            return '技術・工作'
        case VideoGenreKinds.Course:
            return '解説・講座'
        case VideoGenreKinds.Shock:
            return 'ドッキリ'
        case VideoGenreKinds.Outdoor:
            return 'アウトドア'
        case VideoGenreKinds.Nature:
            return '自然・環境'
        case VideoGenreKinds.Sensitive:
            return 'センシティブ'
        case VideoGenreKinds.Other:
            return 'その他'
        default:
            throw new Error('定義されていないVideoGenreKindsです: ' + target)
    }
}
//#endregion

//動画並び替え順
export enum SortKinds{
    //登録日時順
    RegistDateTime = 0,
    //再生回数順
    ViewCount = 10,
    //いいね数順
    LikeCount = 20,
    //コメント順
    CommentCount = 30,
    //VMori再生回数
    VMoriViewCount = 40,
    //Youtube登録日時
    PublishDateTime = 50,
}

/**
 * チャンネル並び替え順種類
 */
export enum ChannelSortKinds{
    //チャンネル情報取得日時
    GetRegistDateTime = 0,
    //チャンネル登録者数
    SubscriverCount = 10,
    //チャンネルの再生回数
    ViewCount = 20,
}

/**
 * 期間種類
 */
export enum PeriodKinds{
    /**
     * 今日
     */
    ToDay = 10,
    /**
     * 今週
     */
    Week = 20,
    /**
     * 今月
     */
    Month = 30,
    /**
     * 全て
     */
    All = 1000

}

/**
 * ページ種類
 */
export enum PageKinds{
    Login = 10,
    SignUp = 20,
    AppReqMail = 30,
    Account = 40,
    ResetReqPassword = 50,
    UpVideo = 60,
    Video = 70,
    VideoRanking = 80,
    LatestVideo = 90
}