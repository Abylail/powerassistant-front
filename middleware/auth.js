import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";
import {useAuthStore} from "~/store/auth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const authStore = useAuthStore();
    if (!authStore.isAuth) {
        await Promise.all([authStore.loginToken(), authStore.fetchBusiness()]);
        if (!authStore.isAuth) return navigateTo({path: "/control/login"})
    }
})