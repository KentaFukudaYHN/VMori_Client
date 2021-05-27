import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Login from '@/pages/LoginPage.vue'
import SignUp from '@/pages/SignUpPage.vue'
import AppReqMail from '@/pages/AppReqMailPage.vue'
import Account from '@/pages/Account.vue'
import Test from '@/pages/Test.vue'
import ResetPassword from '@/pages/ResetPasswordPage.vue'
import ResetReqPassword from '@/pages/ResetReqPasswordPage.vue'

const route = [
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
        path: '/ResetPassword',
        name: 'ResetPassword',
        component: ResetPassword

    },
    {
        path: '/ResetReqPassword',
        name: 'ResetReqPassword',
        component: ResetReqPassword
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