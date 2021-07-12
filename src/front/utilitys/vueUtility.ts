import { Ref } from "vue"

/**
 * vueに必要な特殊操作の為のUtility
 */
class VueUtility  {
    /**
     * バインドするように配列を更新
     * @param newTargets 新しいデータ
     * @param oldTargets 元のデータ
     */
    updateArray(newTargets:[], oldTargets: Ref<[]>){
        /*
          *配列はそのまま値を代入するとバインディングされない
          *なのでspliceでいったん全削除
          *それから要素を追加しなおす
        */
        oldTargets.value.splice(0, oldTargets.value.length)
        newTargets.forEach(x => oldTargets.value.push(x))
    }
}

export const vueUtility = new VueUtility()