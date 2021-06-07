<style lang="scss" scoped>
</style>

<template>
    <div class="radio-container">
        <div v-for="item in list" :key="item.id" class="radio-item">
            <input :id="item.id" type="radio" :name="name" :value="item.val" :checked="{'checked': item.selected}" @change="onChange">
            <label :for="item.id">{{ item.text }}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from 'vue'
import RadioBoxItem from '@/commons/form/RadioBoxItem'

type Props = {
    list: RadioBoxItem[],
    name: string
}

export default defineComponent({
    props:{
        list: {
            type: Object as PropType<RadioBoxItem[]>
        },
        name:{
            type: String
        }
    },
    emits:['emit-change'],
    setup(props: Props, context: SetupContext) {
        return{
            list: props.list,
            name: props.name,
            onChange: (e) => {
                context.emit('emit-change', e.target.value)
            }
        }
    },
})
</script>
