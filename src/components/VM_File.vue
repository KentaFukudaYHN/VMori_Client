<style lang="scss" scoped>
.form-file{
    width: 100px;
    & label{
        font-size: 13px;
        cursor: pointer;
        text-align: center;
        border:solid 1px $form-border-color;
        padding:5px 15px;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: inset 0 1px 1px  rgba(0, 0, 0, .08);

    }
    & input{
        display: none;
    }
}
</style>

<template>
    <div class="form-file">
        <label @click="onClickLabel">選択</label>
        <input ref="file" 
            type="file"
            :accept="accept"
            @click="onClickFile" 
            @change="onChangeFile"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

type Props = {
    accept: string
}

export default defineComponent({
    props:{
        accept:{
            type: String
        }
    },
    setup(props: Props) {
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
            const target = (<HTMLInputElement>e.target).value
        }

        return{
            //onFunction
            onClickLabel,
            onClickFile,
            onChangeFile,
            //ref
            file,
            //property
            accept: props.accept
        }
    },
})
</script>
