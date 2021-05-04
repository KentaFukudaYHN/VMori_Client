<template>
    <input 
        class="form-input"
        v-bind:class="{'valid-input': errorMessage != undefind && errorMessage.value != ''}"
        :name="name"
        :type="type"
        :value="value"
        @input="emitInput"
        @blur="handleChange"
    />

    <span class="valid-msg" >{{errorMessage}}</span>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue'
import { useField } from 'vee-validate';
import { boolean } from 'yup/lib/locale';

type Props = {
  rule: () => true,
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

        const emitInput = (event) =>{
            context.emit('emit-input', event.target.value)
        }

        return {
            emitInput,
            errorMessage,
            value,
            name: props.name,
            type: props.type,
            handleChange,
        }
    },
})
</script>
