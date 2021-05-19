<style lang="scss" scoped>
    .input-container{
        position: relative;
        cursor: pointer;
        .show-password-icon{
            position: absolute;
            top:35%;
            right:10px;
            width:20px;
        }
    }

</style>
<template>
    <div>
        <div class="input-container">
            <input 
                class="form-input"
                v-bind:class="{'valid-input': errorMessage != undefined && errorMessage.value != ''}"
                :name="name"
                :type="type"
                :value="value"
                :placeholder="placeholder"
                @keyup="onKeyup"
                @input="emitInput"
                @blur="emitBlur"
                @click="emitClick"
            />
            <img v-if="showIcon && showPasswordIcon" @click="clickShowPasswordIcon" class="show-password-icon" src="assets/show-password.png"/>
            <img v-if="showIcon && hidePasswordIcon" @click="clickHidePasswordIcon" class="show-password-icon" src="assets/hide-password.png"/>
        </div>

        <span v-if="!overrideErrMsg" class="valid-msg" >{{errorMessage}}</span>
        <span class="valid-msg" >{{overrideErrMsg}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, watch, PropType } from 'vue'
import { useField, ErrorMessage, ValidationResult} from 'vee-validate';

type Props = {
  rule: () => boolean,
  name: string,
  value: string,
  type: string,
  placeholder: string,
  overrideErrMsg: string
};

export default defineComponent({
    name: 'vm_input',
    props: {
        rule:{
            type: [Object, Function] as PropType<Function | any>,
        },
        name:{
            type: String,
            default: '',
        },
        value:{
            type: String,
            default: '',
        },
        type:{
            type:String,
            default: '',
        },
        placeholder:{
            type:String,
            default: '',
        },
        overrideErrMsg:{
            type: String,
            default: '',
        }
    },
    emits: ['emit-input', 'emit-blur', 'emit-click'],
    setup(props: Props, context: SetupContext) {

        let rule = props.rule
        if(rule == null){
            rule = () => { return true }
        }
        
        const { errorMessage, value, handleChange, resetField, errors } = useField(props.name, rule)
        
        if(props.value != null && props.value != ''){
            value.value = props.value;
        }
        
        let type = ref(props.type)
        let isTypePassword = false;
        let showIcon = ref(false);
        let showPasswordIcon = ref(false);
        let hidePasswordIcon = ref(false);
        
        const onKeyup = (event) => {
            //パスワードの場合は全角禁止
            value.value = (value.value as string).replace(/[^a-zA-Z0-9 -/:-@\[-~]*$/, '')
        }

        const emitInput = (event) =>{
            if(isTypePassword && event.target.value != ''){
                showIcon.value = true;
            }else{
                showIcon.value = false;
            }
            value.value = event.target.value;
            context.emit('emit-input', event.target.value)
        }

        const emitBlur = (event) =>{
            handleChange(event)
            context.emit('emit-blur', event.target.value)
        }

        const emitClick = (event) => {
            context.emit('emit-click')
        }

        if(props.type == 'password'){
            isTypePassword = true;
            showPasswordIcon.value = true;
        }

        const clickShowPasswordIcon = () =>{
            showPasswordIcon.value = false;
            hidePasswordIcon.value = true;
            type.value = 'text'
        }

        const clickHidePasswordIcon = () =>{
            hidePasswordIcon.value = false;
            showPasswordIcon.value = true;
            type.value = 'password'
        }

        watch(() => props.value, (newVal, oldVal) => {
            value.value = newVal
        })

        return {
            emitInput,
            emitBlur,
            emitClick,
            onKeyup,
            errorMessage,
            handleChange,
            value,
            name: props.name,
            type,
            showPasswordIcon,
            hidePasswordIcon,
            showIcon,
            clickShowPasswordIcon,
            clickHidePasswordIcon,
            placeholder: props.placeholder,
            overrideErrMsg: props.overrideErrMsg
        }
    },
})
</script>
