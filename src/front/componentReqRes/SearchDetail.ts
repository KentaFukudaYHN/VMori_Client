import { SearchVideoTranslationKinds, VideoLanguageKinds } from "@/core/enum";

/**
 * 詳細検索
 */
export type SearchDetail = {
    //話している言語
    langs: VideoLanguageKinds[],
    //翻訳の有無
    translation: SearchVideoTranslationKinds,
    //翻訳している言語
    translationLangs: VideoLanguageKinds[]
}