
<template>
    <div class="selecter-container">
        <span v-for="item in list" :key="item.val" 
            class="selecter-item" :class="{ 'selecter-item-select': item.selected, 'selecter-item-disabled':disabled }"
            @click="selectItem(item.val)">
            
            {{ item.text }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, ref, Ref, watch, watchEffect } from 'vue'
import { SelecterItem } from '@/front/componentReqRes/Selecter'

type Props = {
    list: SelecterItem[],
    disabled: boolean
}
export default defineComponent({
    props:{
        list:{
            type: Object as PropType<SelecterItem[]>
        },
        disabled:{
            type: Boolean,
            default: false
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

        let disabled = ref(props.disabled)

        watchEffect(() =>{
            disabled.value = props.disabled
        })

        return {
            list: list,
            selectItem: (val) => { selectItem(val, context, disabled.value) },
            disabled: disabled
        }
    },
})

//アイテムを選択
function selectItem(val: string | number, context: SetupContext, disabled: boolean){
    context.emit('emit-change', val)
}
</script>
