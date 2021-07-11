<style lang="scss" scoped>
.tag{
    &-input-container{
        display: flex;
    }
    &-btn-add{
        padding: 0 5px;
        border:solid 1px $form-border-color;
    }
    &-add-item{
        cursor: pointer;
        padding: 5px;
        border: solid 1px #B2B2B2;
        display: inline-block;
        margin: 5px;
    }
    &-item-batsu{
        font-weight: bold;
        color: $form-border-color;
        margin-left: 5px;
    }
    &-add-container{
        width: 100%;
        min-height: 40px;
        margin-top:5px;
        border:solid 1px $form-border-color;
        border-radius: 3px;
    }
}
</style>

<template>
    <div class="tag-container">
        <div class="tag-input-container">
            <vm-input placeholder="タグは５つまで/20文字以内" :value="inputText" @emit-input="onInputText" class="tag-input" name="upvideo-tag"></vm-input>
            <button class="tag-btn-add" @click="addTag">追加</button>
        </div>
        <div class="tag-add-container">
            <div v-for="tag in tagList" :key="tag" class="tag-add-item" @click="deleteTag(tag)">
                 <span>{{tag}}</span>
                 <span class="tag-item-batsu">×</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, SetupContext, watch } from 'vue'
import VM_Input from '@/front/components/VM_Input.vue'

const tagList = ref(new Array() as string[])
const inputText = ref('')
export default defineComponent({
    components:{
        'vm-input': VM_Input
    },
    emits:['emit-add', 'emit-delete'],
    props:{
        inputText:{
            type: String,
            default: ''
        },
        list:{
            type: Object as PropType<string[]>,
            default: new Array() as string[]
        }
    },
    setup(props, context: SetupContext) {
        
        inputText.value = props.inputText
        if(props.list != null){
            if(tagList.value.length > 0){
                tagList.value.splice(0,tagList.value.length)
            }
            props.list.forEach(x => {
                tagList.value.push(x)
            })
        }

        watch(() => props.inputText, (newVal, oldVal) => {
            inputText.value = newVal
        })

        watch(() => props.list, (newVal, oldVal) => {
            if(tagList.value.length > 0){
                tagList.value.splice(0, tagList.value.length)
            }
            if(newVal != null && newVal.length > 0){
                newVal.forEach(x =>{
                    tagList.value.push(x)
                })
            }
        })

        return{
            //入力テキスト
            inputText,
            //追加されタグのリスト
            tagList,
            //入力の取得
            onInputText: (val) => { inputText.value = val },
            //タグの追加
            addTag: () => { addTag(context) },
            //タグの削除
            deleteTag: (val: string) => { deleteTag(val, context) },
        }
    },
})

function addTag(context: SetupContext){
    context.emit('emit-add', inputText.value)
    inputText.value = ''
}
function deleteTag(tag: string, context: SetupContext){
    context.emit('emit-delete', tag)
}
</script>
