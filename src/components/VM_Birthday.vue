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
        width: 30%;
        select{
            width: 100%;
        }
    }
    &-month{
        @extend .birthday;
    }
    &-day{
        @extend .birthday;
    }
}

</style>

<template>
    <div class="birthday-container">
        <vm-select class="birthday-year" name="year" @emit-change="changeYear" :items="yearItems" :rule="isRequiredNoMsg"/>
        <span>年</span>
        <vm-select class="birthday-month" name="month" @emit-change="changeMonth" :items="monthItems" :rule="isRequiredNoMsg"/>
        月
        <vm-select class="birthday-day" name="day" @emit-change="changeDay" :items="dayItems" :rule="isRequiredNoMsg"/>
        日
    </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import VM_Select from '@/components/VM_Select.vue'
import { isRequiredNoMsg } from '@/commons/valid/valid-rules'
import SelectListItem from '@/commons/form/SelectListItem'

type Props = {
    selectedYear: string,
    selectedMonth: string,
    selectedDay: string
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
        }
    },
    setup(props: Props, context: SetupContext) {
        /**
         * 初期化処理
         */

        //年のselect用データの生成
        const yearItems = Array<SelectListItem>();
        const currentyYear = new Date().getFullYear()
        yearItems.push({ Value: '', Text: '', Selected: false })
        for(let i=0;i<130;i++){
            const value = currentyYear - i
            yearItems.push({
                Value: value,
                Text: String(currentyYear -i),
                Selected: value == Number(props.selectedYear)
            })
        }

        //月のselect用データの生成
        const monthItems = Array<SelectListItem>();
        monthItems.push({ Value: '', Text: '', Selected: false  })
        for(let i=1;i<=12;i++){
            let val = ''
            if(i<10){
                val = '0' + String(i)
            }else{
                val = String(i)
            }
            monthItems.push({Value: i, Text: val, Selected: Number(props.selectedMonth) == i })
        }

        //日にちのselect用データの生成
        const dayItems = Array<SelectListItem>();
        dayItems.push({ Value: '', Text: '', Selected: false  });
        for(let i=1;i<=31;i++){
            let val = ''
            if(i<10){
                val = '0' + String(i)
            }else{
                val = String(i)
            }
            dayItems.push({Value: i, Text: val, Selected: Number(props.selectedDay) == i })
        }

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
            //emit関数
            changeYear,
            changeMonth,
            changeDay,
            //バリデーション
            isRequiredNoMsg
        }
    },
})
</script>
