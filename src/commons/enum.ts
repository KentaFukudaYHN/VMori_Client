
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
    //TOP
    TOP = 0,
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
    //MAD
    MAD = 60,
    //ダンス
    Dance = 70,
    //ラジオ
    Radio = 80,
    //動物
    Animal = 90,
    //自然
    Nature = 100,
    //料理
    Cooking = 110,
    //旅行
    Travel = 120,
    //アウトドア
    Outdoor = 130,
    //スポーツ
    Sports = 140,
    //政治・社会・時事
    Politics = 150,
    //技術・工作
    Craft = 160,
    //解説・講座
    Course = 170,
    //MMD
    MMD = 180,
    //その他
    Other = 999
}

export function SearchVideoGenreKindsToString(target: SearchVideoGenreKinds){
    switch(target){
        case SearchVideoGenreKinds.TOP:
            return 'TOP'
        case SearchVideoGenreKinds.SmallTalk:
            return '雑談'
        case SearchVideoGenreKinds.Short:
            return 'ショートムービー'
        case SearchVideoGenreKinds.Entertainment:
            return 'エンターテイメント'
        case SearchVideoGenreKinds.Game:
            return 'ゲーム'
        case SearchVideoGenreKinds.Music:
            return '音楽'
        case SearchVideoGenreKinds.MAD:
            return 'MAD'    
        case SearchVideoGenreKinds.Dance:
            return 'ダンス'
        case SearchVideoGenreKinds.Radio:
            return 'ラジオ'
        case SearchVideoGenreKinds.Animal:
            return 'アニマル'
        case SearchVideoGenreKinds.Nature:
            return '自然'
        case SearchVideoGenreKinds.Travel:
            return '旅行'
        case SearchVideoGenreKinds.Outdoor:
            return 'アウトドア'
        case SearchVideoGenreKinds.Cooking:
            return '料理'
        case SearchVideoGenreKinds.Sports:
            return 'スポーツ'
        case SearchVideoGenreKinds.Politics:
            return '政治・時事・社会'
        case SearchVideoGenreKinds.Craft:
            return '技術・工作'
        case SearchVideoGenreKinds.Course:
            return '解説・講座'
        case SearchVideoGenreKinds.MMD:
            return 'MMD'
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
    //MAD
    MAD = 60,
    //ダンス
    Dance = 70,
    //ラジオ
    Radio = 80,
    //動物
    Animal = 90,
    //自然
    Nature = 100,
    //料理
    Cooking = 110,
    //旅行
    Travel = 120,
    //アウトドア
    Outdoor = 130,
    //スポーツ
    Sports = 140,
    //政治・社会・時事
    Politics = 150,
    //技術・工作
    Craft = 160,
    //解説・講座
    Course = 170,
    //MMD
    MMD = 180,
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
        case VideoGenreKinds.MAD:
            return 'MAD'    
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