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

const route = [
    {
        path: '/',
        name: 'TOP',
        component: LatestVideo
    },
    {
        path: '/LatestVideo',
        name: 'LatestVideo',
        component: LatestVideo
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/AppReqMail',
        name: 'AppReqMail',
        component: AppReqMail
    },
    {
        path: '/Account',
        name: 'Account',
        component: Account
    },
    {
        path: '/ResetReqPassword',
        name: 'ResetReqPassword',
        component: ResetReqPassword
    },
    {
        path: '/UpVideo',
        name: 'UpVideo',
        component: UpVideo
    },
    {
        path: '/Video',
        name: 'Video',
        component: Videopage
    },
    // {
    //     path: '/VideoRanking',
    //     name: 'VideoRanking',
    //     component: VideoRankingPage
    // },
    {
        path: '/Test',
        name: 'Test',
        component: Test
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: route
})

export const useRouter = () =>{
    return BaseRouter()
}