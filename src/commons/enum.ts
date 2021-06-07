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

//#region 動画のジャンル種類
//動画のジャンル種類
export enum VideoGenreKinds{
    //未設定
    UnKnown = 0,
    //雑談
    SmallTalk = 10,
    //ショートムービー
    Short = 20,
    //エンターテイメント
    Entertainment = 30,
    //game
    Game = 40,
    //音楽
    Music = 50,
    //ダンス
    Dance = 60,
    //ラジオ
    Radio = 70,
    //動物
    Animal = 80,
    //自然
    Nature = 90,
    //料理
    Cooking = 100,
    //旅行
    Travel = 110,
    //アウトドア
    Outdoor = 120,
    //スポーツ
    Sports = 120,
    //政治・社会・時事
    Politics = 130,
    //技術・工作
    Craft = 140,
    //解説・講座
    Course = 150,
    //MMD
    MMD = 160,
    //その他
    Other = 999
}
export function VideoGenreKindsToString(target: VideoGenreKinds){
    switch(target){
        case VideoGenreKinds.UnKnown:
            return '未設定'
        case VideoGenreKinds.SmallTalk:
            return '雑談'
        case VideoGenreKinds.Short:
            return 'ショートムービー'
        case VideoGenreKinds.Entertainment:
            return 'エンターテイメント'
        case VideoGenreKinds.Game:
            return 'ゲーム'
        case VideoGenreKinds.Music:
            return '音楽'
        case VideoGenreKinds.Dance:
            return 'ダンス'
        case VideoGenreKinds.Radio:
            return 'ラジオ'
        case VideoGenreKinds.Animal:
            return 'アニマル'
        case VideoGenreKinds.Nature:
            return '自然'
        case VideoGenreKinds.Travel:
            return '旅行'
        case VideoGenreKinds.Outdoor:
            return 'アウトドア'
        case VideoGenreKinds.Cooking:
            return '料理'
        case VideoGenreKinds.Sports:
            return 'スポーツ'
        case VideoGenreKinds.Politics:
            return '政治・時事・社会'
        case VideoGenreKinds.Craft:
            return '技術・工作'
        case VideoGenreKinds.Course:
            return '解説・講座'
        case VideoGenreKinds.MMD:
            return 'MMD'
        case VideoGenreKinds.Other:
            return 'その他'
        default:
            throw new Error('定義されていないVideoGenreKindsです: ' + target)
    }
}
//#endregion