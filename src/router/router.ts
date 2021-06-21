import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Login from '@/pages/LoginPage.vue'
import SignUp from '@/pages/SignUpPage.vue'
import AppReqMail from '@/pages/AppReqMailPage.vue'
import Account from '@/pages/AccountPage.vue'
import UpVideo from '@/pages/UpVideoPage.vue'
import Home from '@/pages/HomePage.vue'
import Test from '@/pages/Test.vue'
import ResetReqPassword from '@/pages/ResetReqPasswordPage.vue'
import Videopage from '@/pages/VideoPage.vue'

const route = [
    {
        path: '/Home',
        name: 'Home',
        component: Home
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