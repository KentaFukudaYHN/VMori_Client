<style lang="scss" scoped>
.form-file{
    & label{
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        border:solid 1px $form-border-color;
        padding:5px 15px;
        border-radius: 5px;
        box-shadow: inset 0 1px 1px  rgba(0, 0, 0, 0.1);

    }
    & input{
        display: none;
    }
}
</style>

<template>
    <div class="form-file">
        <label @click="onClickLabel">{{text}}</label>
        <input ref="file" 
            type="file"
            :accept="accept"
            @click="onClickFile" 
            @change="onChangeFile"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue'

type Props = {
    accept: string
    text: string
}

export default defineComponent({
    props:{
        accept:{
            type: String
        },
        text:{
            type:String,
            default: '選択'
        }
    },
    emits:['emit-change'],
    setup(props: Props, context: SetupContext) {
        /**
        * 初期化処理
         */
         const file = ref<HTMLInputElement>()

        /**
        * onFunction
         */
        const onClickLabel = () =>{
            file.value.click()
        }
        const onClickFile = (e: Event) =>{
            (<HTMLInputElement>e.target).value = ""
        }
        const onChangeFile = (e: Event) => {
            context.emit('emit-change', e.target as HTMLInputElement)
        }

        return{
            //onFunction
            onClickLabel,
            onClickFile,
            onChangeFile,
            //ref
            file,
            //property
            accept: props.accept,
            text: props.text
        }
    },
})
</script>
