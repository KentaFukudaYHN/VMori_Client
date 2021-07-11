import { SearchVideoTranslationKinds, VideoLanguageKinds } from "../enum";

/**
 * 詳細検索更新リクエスト
 */
export type SearchDetailUpdateReq = {
    //話している言語
    langs: VideoLanguageKinds[],
    //翻訳の有無
    translation: SearchVideoTranslationKinds,
    //翻訳している言語
    translationLangs: VideoLanguageKinds[]
}