import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import Login from '@/pages/LoginPage.vue'
import SignUp from '@/pages/SignUp.vue'
import AppReqMail from '@/pages/AppReqMail.vue'
import Test from '@/pages/Test.vue'

const route = [
    {
        path: '/test',
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