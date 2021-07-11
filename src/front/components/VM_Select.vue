<style lang="scss" scoped>

</style>

<template>
    <div>
        <select 
            :disabled="disabled"
            v-bind:class="{'valid-input': errorMessage != undefined && errorMessage.value != ''}"
            class="form-select" 
            :name="name" 
            @change="emitChange">

            <option v-for="item in items" :value="item.value" :key="item.value" :selected="item.Selected">
                {{item.Text}}
            </option>

        </select>

        <span v-if="errorMessage != ''" class="valid-msg" >{{errorMessage}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext, watch } from 'vue'
import { useField } from 'vee-validate';
import SelectListItem from '@/front/form/SelectListItem'

type Props = {
    name: string,
    items: SelectListItem[],
    rule: () => true,
    disabled: boolean
};
export default defineComponent({
    props:{
        name:{
            type: String
        },
        items: {
            type: Object as PropType<SelectListItem[]>
        },
        rule:{
            type: [Object, Function] as PropType<Function | any>,
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['emit-change'],
    setup(props: Props, context:SetupContext) {

        let { errorMessage, value, handleChange} = useField(props.name, props.rule)

        //初期値が指定されていれば設定
        let isSelected = false;
        props.items.forEach(item => {
            if(item.Selected){
                value.value = item.Value
                isSelected = true
                context.emit('emit-change', item.Value)
            }
        });

        /**
         *  Emit
         */

        const emitChange = (elm: Event) => {
            const target = elm.target as HTMLSelectElement
            value.value = props.items[target.selectedIndex].Value
            context.emit('emit-change', value.value)
        }

        //初期表示ではchangeイベントが発火されず、親コンポーネントで値が空になるので、emitを発生させて防ぐ
        if(!isSelected){
            context.emit('emit-change', props.items[0].Value)
        }

        return{
            name: props.name,
            items: props.items,
            emitChange,
            value,
            disabled: props.disabled,
            errorMessage,
            handleChange
        }
    },
})
</script>


