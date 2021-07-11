import * as yup from 'yup'

export const isRequired = (value) => {
    if(value)
        return true;

    return '入力必須です'
}

export const isRequiredNoMsg = (val) => {
    if(val)
        return true;
    
    return '';
}

export const passwordRule = yup.string().matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d? -/:-@\[-~]{8,100}$/,{ message: '8文字以上で半角英数字大文字を含む必要があります' }).required('入力必須です')

export const mailRule = yup.string().email('メールアドレスの形式にしてください').required('入力必須です')

export const urlRule = yup.string().url('urlの形式にしてください').required('入力必須です')