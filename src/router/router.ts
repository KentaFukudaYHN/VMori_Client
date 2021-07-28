import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Login from '@/front/pages/LoginPage.vue'
import SignUp from '@/front/pages/SignUpPage.vue'
import AppReqMail from '@/front/pages/AppReqMailPage.vue'
import Account from '@/front/pages/AccountPage.vue'
import UpVideo from '@/front/pages/UpVideoPage.vue'
import LatestVideo from '@/front/pages/LatestVideoPage.vue'
import Test from '@/front/pages/Test.vue'
import ResetReqPassword from '@/front/pages/ResetReqPasswordPage.vue'
import Videopage from '@/front/pages/VideoPage.vue'
import VideoRankingPage from '@/front/pages/VideoRankingPage.vue'
import { pageSetting } from '@/dataAccess/entities/PageSetting'
import { AppStateService } from '@/core/services/AppStateService'
import { useStore, store } from '@/dataAccess/store/store'
import ChannelListPage from '@/front/pages/ChannelListPage.vue'

let appStateService: AppStateService = null


const route = [
    {
        path: '/',
        name: 'TOP',
        component: VideoRankingPage
    },
    {
        path: '/LatestVideo',
        name: pageSetting.LatesetVideo,
        component: LatestVideo
    },
    {
        path: '/Login',
        name: pageSetting.Login,
        component: Login
    },
    {
        path: '/SignUp',
        name: pageSetting.SignUp,
        component: SignUp
    },
    {
        path: '/AppReqMail',
        name: pageSetting.AppReqMail,
        component: AppReqMail
    },
    {
        path: '/Account',
        name: pageSetting.Account,
        component: Account
    },
    {
        path: '/ResetReqPassword',
        name: pageSetting.ResetReqPassword,
        component: ResetReqPassword
    },
    {
        path: '/UpVideo',
        name: pageSetting.UpVideo,
        component: UpVideo
    },
    {
        path: '/Video',
        name: pageSetting.Video,
        component: Videopage
    },
    {
        path: '/VideoRanking',
        name: pageSetting.VideoRanking,
        component: VideoRankingPage
    },
    {
        path: '/Test',
        name: 'Test',
        component: Test
    },
    {
        path: '/Channels',
        name: pageSetting.Channels,
        component: ChannelListPage
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: route
})

router.beforeEach((to, from, next) => {
    if(appStateService == null ) { appStateService = new AppStateService(store) }
    let name = to.name.toString()
    if(name == 'TOP') {
         name = pageSetting.VideoRanking
    }
    appStateService.updatePageState(name)
    next()
})

export const useRouter = () =>{
    return BaseRouter()
}