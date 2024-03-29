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
                tabindex="0"
                :disabled="disabled"
                class="form-input"
                v-bind:class="{'valid-input': isValid}"
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
import { defineComponent, ref, Ref, SetupContext, watch, PropType, computed } from 'vue'
import { useField } from 'vee-validate';

type Props = {
  rule: () => boolean,
  name: string,
  value: string,
  type: string,
  placeholder: string,
  overrideErrMsg: string
  disabled: boolean
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
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['emit-input', 'emit-blur', 'emit-click'],
    setup(props: Props, context: SetupContext) {

        let rule = props.rule
        if(rule == null){
            rule = () => { return true }
        }
        
        const { errorMessage, value, handleChange } = useField(props.name, rule)
        
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
            if(isTypePassword && value.value != undefined){
                value.value = (value.value as string).replace(/[^a-zA-Z0-9 -/:-@\[-~]*$/, '')
            }
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

        let overrideErrMsg = ref(props.overrideErrMsg)
        watch(() => props.overrideErrMsg, (newVal, oldVal) =>{
            overrideErrMsg.value = newVal
        } )

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
            disabled: props.disabled,
            showPasswordIcon,
            hidePasswordIcon,
            showIcon,
            clickShowPasswordIcon,
            clickHidePasswordIcon,
            placeholder: props.placeholder,
            overrideErrMsg,
            isValid: computed(() =>{
                var isErr = errorMessage.value != undefined && errorMessage.value != ''
                var isOverrideErr = overrideErrMsg.value != undefined && overrideErrMsg.value != ''
                return isErr || isOverrideErr
            })
        }
    },
})
</script>
