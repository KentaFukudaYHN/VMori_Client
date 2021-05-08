<style lang="scss" scoped>

</style>

<template>
    <div>
        <select 
            v-bind:class="{'valid-input': errorMessage != undefind && errorMessage.value != ''}"
            class="form-select" 
            :name="name" 
            @change="emitChange">

            <option v-for="item in items" :value="item.value" :key="item.value">
                {{item.Text}}
            </option>

        </select>

        <span v-if="errorMessage != ''" class="valid-msg" >{{errorMessage}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, Prop, PropType, SetupContext, ref, computed } from 'vue'
import { useField } from 'vee-validate';
import SelectListItem from '@/commons/form/SelectListItem'

type Props = {
    name: string,
    items: SelectListItem[],
    rule: () => true,
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
            type: () => Object　as Prop<boolean>,
        },
    },
    setup(props: Props, context:SetupContext) {

        let { errorMessage, value, handleChange} = useField(props.name, props.rule)

        /**
         * Computed
         */
        // const error = computed(() =>{
        //     return valid
        // })

        /**
         *  Emit
         */

        const emitChange = (elm: Event) => {
            const target = elm.target as HTMLSelectElement
            value.value = props.items[target.selectedIndex].Value
            context.emit('emit-change', value.value)
        }

        //初期表示ではchangeイベントが発火されず、親コンポーネントで値が空になるので、emitを発生させて防ぐ
        context.emit('emit-change', props.items[0].Value)

        return{
            name: props.name,
            items: props.items,
            emitChange,
            value,
            errorMessage,
            handleChange
        }
    },
})
</script>


