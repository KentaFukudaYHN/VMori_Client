// import SelectListItem from '@/commons/form/SelectListItem'
// export class AccountService{
//     createBirthdaySelectData(){
//         //年のselect用データの生成
//         const yearItems = Array<SelectListItem>();
//         const currentyYear = new Date().getFullYear()
//         yearItems.push({ Value: '', Text: '' })
//         for(let i=0;i<130;i++){
//             yearItems.push({
//                 Value: currentyYear - i,
//                 Text: String(currentyYear -i)
//             })
//         }

//         //月のselect用データの生成
//         const monthItems = Array<SelectListItem>();
//         monthItems.push({ Value: '', Text: '' })
//         for(let i=1;i<=12;i++){
//             let val = ''
//             if(i<10){
//                 val = '0' + String(i)
//             }else{
//                 val = String(i)
//             }
//             monthItems.push({Value: i, Text: val})
//         }

//         //日にちのselect用データの生成
//         const dayItems = Array<SelectListItem>();
//         dayItems.push({ Value: '', Text: '' });
//         for(let i=1;i<=31;i++){
//             let val = ''
//             if(i<10){
//                 val = '0' + String(i)
//             }else{
//                 val = String(i)
//             }
//             dayItems.push({Value: i, Text: val})
//         }

//         return { yearItems, monthItems, dayItems }
//     }
// }