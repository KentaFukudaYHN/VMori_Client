<style lang="scss" scoped>
    .selecter{
        &-item{
            padding: 5px 15px;
            cursor: pointer;
            user-select: none; /* CSS3 */
            -moz-user-select: none; /* Firefox */
            -webkit-user-select: none; /* Safari、Chromeなど */
            -ms-user-select: none; /* IE10かららしい */

            border: solid 1px $form-border-color;
            margin: 0 5px;
            border-radius: 3px;

            &:first-child{
                margin: 0 5px 0 0;
            }

            &:last-child{
                margin: 0 0 0 5px;
            }

            &-select{
                background-color: $form-border-sel-color;
                color: #fff;
            }
        }
    }
</style>

<template>
    <div class="selecter-container">
        <span v-for="item in list" :key="item.val" 
            class="selecter-item" :class="{ 'selecter-item-select': item.selected }"
            @click="selectItem(item.val)">
            
            {{ item.text }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, ref, Ref, watch } from 'vue'
import { SelecterItem } from '@/componentReqRes/Selecter'

type Props = {
    list: SelecterItem[],
    only: boolean
}
export default defineComponent({
    props:{
        list:{
            type: Object as PropType<SelecterItem[]>
        }
    },
    emits:['emit-change'],
    setup(props: Props, context: SetupContext) {

        //値渡しでコピーする ※watchで配列を削除する際にpropsに指定されてる先のデータまで消えてしまうので
        const list = ref(props.list.slice(0, props.list.length))

        watch(props.list, (newval, oldval) =>{
            list.value.splice(0, list.value.length)
            newval.forEach(x => {
                list.value.push(x)
            })
        })

        return {
            list: list,
            selectItem: (val) => { selectItem(val, context) }
        }
    },
})

//アイテムを選択
function selectItem(val: string | number, context: SetupContext){
    context.emit('emit-change', val)
}
</script>
