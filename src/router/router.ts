import { createRouter, createWebHistory, useRouter as BaseRouter } from 'vue-router'
import Home from '../pages/HomePage.vue'
const route = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: route
})

export const useRouter = () =>{
    return BaseRouter()
}