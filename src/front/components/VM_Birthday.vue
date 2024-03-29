<style lang="scss" scoped>
.birthday 
{
    margin: 0;
    &-container{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    &-year {
        @extend .birthday;
        min-width: 85px;
        margin-right: 5px;
        @include tab{
            margin:0;
        }
    }
    &-month{
        @extend .birthday;
        min-width: 70px;
        margin: 0 5px;
        @include sp{
            margin:0;
        }
    }
    &-day{
        @extend .birthday;
        min-width: 70px;
        margin: 0 5px;
        @include sp{
            margin:0;
        }
    }
}

</style>

<template>
    <div class="birthday-container">
        <vm-select :disabled="disabled" class="birthday-year" :name="nameYear" @emit-change="changeYear" :items="yearItems" :rule="isRequiredNoMsg"/>
        <span>年</span>
        <vm-select :disabled="disabled" class="birthday-month" :name="nameMonth" @emit-change="changeMonth" :items="monthItems" :rule="isRequiredNoMsg"/>
        <span>月</span>
        <vm-select :disabled="disabled" class="birthday-day" :name="nameDate" @emit-change="changeDay" :items="dayItems" :rule="isRequiredNoMsg"/>
        <span>日</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch, ref } from 'vue'
import VM_Select from '@/front/components/VM_Select.vue'
import { isRequiredNoMsg } from '@/front/valid/valid-rules'
import SelectListItem from '@/front/form/SelectListItem'

type Props = {
    selectedYear: string,
    selectedMonth: string,
    selectedDay: string
    nameYear: string,
    nameMonth: string,
    nameDate: string,
    disabled: boolean,
}

export default defineComponent({
    components:{
        'vm-select': VM_Select
    },
    emits: ['emit-change-year', 'emit-change-month', 'emit-change-date'],
    props:{
        selectedYear: {
            type: String,
        },
        selectedMonth: {
            type: String,
        },
        selectedDay: {
            type: String,
        },
        nameYear: {
            type: String,
            default: 'birthday-year'
        },
        nameMonth: {
            type: String,
            default: 'birthday-month'
        },
        nameDate: {
            type: String,
            default: 'birthday-date'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props: Props, context: SetupContext) {
        /**
         * 初期化処理
         */

        //年のselect用データの生成
        let yearItems = ref(CreateYearItems(props.selectedYear))

        //月のselect用データの生成
        let monthItems = ref(CreateMonthItems(props.selectedMonth));

        //日にちのselect用データの生成
        let dayItems = ref(CreateDateItems(props.selectedDay));

        /**
         * Watch
         */

        watch(() => props.selectedYear, (newVal, oldVal) => {
            yearItems.value.splice(0, yearItems.value.length)
            const newItems = CreateYearItems(newVal)
            for(let i=0;i<newItems.length;i++){
                yearItems.value.push(newItems[i])
            }
        })

        watch(() => props.selectedMonth, (newVal, oldVal) => {
            monthItems.value.splice(0, monthItems.value.length)
            const newItems = CreateMonthItems(newVal)
            for(let i=0;i<newItems.length;i++){
                monthItems.value.push(newItems[i])
            }
        })

        watch(() => props.selectedDay, (newval, oldval) => {
            dayItems.value.splice(0, dayItems.value.length)
            const newItems = CreateDateItems(newval)
            for(let i=0;i<newItems.length;i++){
                dayItems.value.push(newItems[i])
            }
        })

        /**
         * emit関数
         */

        const changeYear = (val) => {
            context.emit('emit-change-year', val)
        }

        const changeMonth = (val) => {
            context.emit('emit-change-month', val)
        }
        
        const changeDay = (val) => {
            context.emit('emit-change-date', val)
        }

        return{
            //selectの選択肢データ
            yearItems,
            monthItems,
            dayItems,
            //selectのname属性
            nameYear: props.nameYear,
            nameMonth: props.nameMonth,
            nameDate: props.nameDate,
            //emit関数
            changeYear,
            changeMonth,
            changeDay,
            //バリデーション
            isRequiredNoMsg,
            //disabled
            disabled: props.disabled
        }
    },
})

function CreateYearItems(selectedYear){
    const yearItems = Array<SelectListItem>();
    const currentyYear = new Date().getFullYear()
    yearItems.push({ Value: '', Text: '', Selected: false })
    for(let i=0;i<130;i++){
        const value = currentyYear - i
        yearItems.push({
            Value: value,
            Text: String(currentyYear -i),
            Selected: value == Number(selectedYear)
        })
    }

    return yearItems
}

function CreateMonthItems(selectedMonth){
    const monthItems = Array<SelectListItem>();
    monthItems.push({ Value: '', Text: '', Selected: false  })
    for(let i=1;i<=12;i++){
        let val = ''
        if(i<10){
            val = '0' + String(i)
        }else{
            val = String(i)
        }
        monthItems.push({Value: i, Text: val, Selected: Number(selectedMonth) == i })
    }

    return monthItems
}

function CreateDateItems(selectedDate){
    const dayItems = Array<SelectListItem>();
    dayItems.push({ Value: '', Text: '', Selected: false  });
    for(let i=1;i<=31;i++){
        let val = ''
        if(i<10){
            val = '0' + String(i)
        }else{
            val = String(i)
        }
        dayItems.push({Value: i, Text: val, Selected: Number(selectedDate) == i })
    }

    return dayItems
}
</script>
