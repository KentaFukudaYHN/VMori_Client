<style lang="scss">

</style>

<template>
    <canvas ref="myChart"></canvas>
</template>

<script lang="ts">
import { VideoService } from '@/services/VideoService'
import { defineComponent, SetupContext, ref, onMounted, PropType, watch } from 'vue'
import { Chart, registerables  } from 'chart.js'
import { ChannelTransition} from '@/componentReqRes/channelTransition'
type Props = {
    list: ChannelTransition[]
}
export default defineComponent({
    props: {
        list: {
            type: Object as PropType<ChannelTransition[]>
        }
    },
    async setup(props: Props, context: SetupContext) {
        const myChart = ref(null)
        Chart.register(...registerables)

        const dateToLabel = (dateString: string) => {
            var date = new Date(dateString)
            return (date.getMonth() + 1) + '/' + date.getDate()
        }
        const labels = []
        const viewCounts = []
        const subscrivers = []
        props.list.forEach(x => {
            viewCounts.push(x.viewCount)
            subscrivers.push(x.subscriverCount)
            labels.push(dateToLabel(x.getDateTime))
        })

        let chart: Chart
        watch(props.list, (newval, oldval)=>{
            viewCounts.splice(0, viewCounts.length)
            subscrivers.splice(0, subscrivers.length)
            labels.splice(0, labels.length)

            newval.forEach(x => {
                viewCounts.push(x.viewCount)
                subscrivers.push(x.subscriverCount)
                labels.push(dateToLabel((x.getDateTime)))
            })

            chart.destroy()
            const context2d = (myChart.value as HTMLCanvasElement).getContext('2d')
            chart = createChart(context2d, labels, viewCounts, subscrivers)
        } )

        onMounted(() => {
            const context2d = (myChart.value as HTMLCanvasElement).getContext('2d')
            debugger
            chart = createChart(context2d, labels, viewCounts, subscrivers)
        })
       
        return{
            myChart: myChart
        }
    },
})

function createChart(context2d: CanvasRenderingContext2D, labels: string[], viewCounts: number[], subscrivers: number[]){
return new Chart(context2d, {
                type: 'line',
                data:{
                    labels:labels,
                    datasets:[{
                            type: 'line',
                            label: '総再生回数',
                            data: viewCounts,
                            backgroundColor: 'rgb(99, 154, 255)',
                            borderColor: 'rgb(99, 154, 255)',
                            yAxisID: 'y'
                        },
                        {
                            type: 'line',
                            label: 'チャンネル登録者数',
                            data: subscrivers,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            yAxisID: 'y1'
                        }]
                },
                options:{
                    animation:false,
                    scales:{
                        y:{
                            position: 'left',
                            ticks:{
                                color: 'rgb(99, 154, 255)',
                                callback: function(value: number, index, values){
                                    if(value < 1000){
                                        return value + '回'
                                    } else if(value< 10000){
                                        return  (Math.floor(value / 1000 * 10) / 10 ) + '千回'
                                    }else if(value < 100000000){
                                        return (Math.floor(value / 10000 * 10) / 10) + '万回'
                                    }else{
                                        return (Math.floor(value / 100000000 * 10) / 10) + '億回'
                                    }
                                }
                            }
                        },
                        y1:{
                            position: 'right',
                            ticks:{
                                color: 'rgb(255, 99, 132)',
                                callback: function(value: number, index, values){
                                    if(value < 1000){
                                        return value + '人'
                                    } else if(value< 10000){
                                        return  (Math.floor(value / 1000 * 10) / 10 ) + '千人'
                                    }else if(value < 100000000){
                                        return (Math.floor(value / 10000 * 10) / 10) + '万人'
                                    }else{
                                        return (Math.floor(value / 100000000 * 10) / 10) + '億人'
                                    }
                                }
                            }
                        }
                    }
                }
            })}
</script>
