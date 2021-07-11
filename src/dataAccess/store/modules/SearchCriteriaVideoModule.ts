import { SearchVideoTranslationKinds, SearchVideoGenreKinds, VideoLanguageKinds } from "@/core/enum";

//動画検索条件モジュール
export type SearchCriteriaVideoModule = {
    //検索テキスト
    text: string,
    //ジャンル
    genle: SearchVideoGenreKinds,
    //詳細検索の有効有無
    isActiveDetail: boolean,
    //詳細検索条件
    detail: DetailSearchCriteria,

}

//動画検索詳細条件
export type DetailSearchCriteria = {
    //話している言語
    langs: Array<VideoLanguageKinds>,
    //翻訳の種類
    translation: SearchVideoTranslationKinds,
    //翻訳している言葉の種類
    translationLangs: Array<VideoLanguageKinds>
}