import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Home from 'pages/HomePage.vue'
import Login from 'pages/LoginPage.vue'
const route = [
    {
        path: '/test',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: route
})

export const useRouter = () =>{
    return BaseRouter()
}