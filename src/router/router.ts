import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import Login from '@/pages/LoginPage.vue'
import SignUp from '@/pages/SignUp.vue'
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
        path: '/',
        name: 'SignUp',
        component: SignUp
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: route
})

export const useRouter = () =>{
    return BaseRouter()
}