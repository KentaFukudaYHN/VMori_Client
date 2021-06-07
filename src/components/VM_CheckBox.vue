<style lang="scss" scoped>
</style>

<template>
    <div class="checkbox-container">
        <div v-for="item in list" :key="item.val" class="checkbox-item">           
            <input :id="item.id" type="checkbox" :name="name" :value="item.val" @change="onChange">
            <label :for="item.id">{{item.text}}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from 'vue'
import CheckBoxItem from '@/commons/form/CheckBoxItem'

type Props = {
    list: CheckBoxItem[],
    name: string
}

const selectedData = [] as string[]
export default defineComponent({
    props:{
        list:{
            type: Object as PropType<CheckBoxItem[]>
        },
        name: {
            type: String,
        }
    },
    emits:['emit-change'],
    setup(props: Props, context: SetupContext) {
        return{
            list: props.list,
            name: props.name,
            onChange: (e) => {
                const target = e.target as HTMLInputElement
                if(target.checked){
                    selectedData.push(target.value)
                }else{
                    const targetIndex = selectedData.indexOf(target.value)
                    selectedData.splice(targetIndex, 1)
                }
                context.emit('emit-change', selectedData)
            }
        }
    },
})
</script>
