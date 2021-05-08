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