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
    <div class="input-container">
        <input 
            class="form-input"
            v-bind:class="{'valid-input': errorMessage != undefind && errorMessage.value != ''}"
            :name="name"
            :type="type"
            :value="value"
            @input="emitInput"
            @blur="handleChange"
        />
        <img v-if="showIcon && showPasswordIcon" @click="clickShowPasswordIcon" class="show-password-icon" src="assets/show-password.png"/>
        <img v-if="showIcon && hidePasswordIcon" @click="clickHidePasswordIcon" class="show-password-icon" src="assets/hide-password.png"/>
    </div>

    <span class="valid-msg" >{{errorMessage}}</span>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue'
import { useField } from 'vee-validate';
import { boolean } from 'yup/lib/locale';

type Props = {
  rule: () => boolean,
  name: string,
  value: string,
  type: string
};

export default defineComponent({
    name: 'vm_input',
    props: {
        rule:{
            type: () => boolean,
        },
        name:{
            type: String
        },
        value:{
            type: String
        },
        type:{
            type:String
        }
    },
    setup(props: Props, context: SetupContext) {
        const { errorMessage, value, handleChange } = useField(props.name, props.rule)
        value.value = props.value;

        let type = ref(props.type)
        let isTypePassword = false;
        let showIcon = ref(false);
        let showPasswordIcon = ref(false);
        let hidePasswordIcon = ref(false);
        
        const emitInput = (event) =>{
            if(isTypePassword && event.target.value != ''){
                showIcon.value = true;
            }else{
                showIcon.value = false;
            }
            value.value = event.target.value;
            context.emit('emit-input', event.target.value)
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

        return {
            emitInput,
            errorMessage,
            value,
            name: props.name,
            type,
            handleChange,
            showPasswordIcon,
            hidePasswordIcon,
            showIcon,
            clickShowPasswordIcon,
            clickHidePasswordIcon
        }
    },
})
</script>
