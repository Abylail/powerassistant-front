import {defineStore} from "pinia";
import api, {useApi} from "~/composables/api";
import cookie from "~/composables/cookie";

const state = () => ({
    userInfo: null,
    businessInfo: null,
})

const getters = {
    isAuth: state => !!state.userInfo,
}

const actions = {
    // Авторизация по токену
    async loginToken() {
        const { err, body } = await api.get("/admin/user/login/token")
        if (!err) {
            this.userInfo = body;
        }
        else this.logout();
    },

    // Авторизоваться
    async login({ phone, password }) {
        const { err, body } = await api.post("/admin/user/login", { phone, password })
        if (!err) {
            this.userInfo = body;
            cookie.userToken.set(body.token);
            await new Promise(resolve => setTimeout(resolve, 0));
            await this.fetchBusiness();
        }
        return !err;
    },

    // Выход
    logout() {
        if (process.client) cookie.userToken.remove();
        this.userInfo = null;
        this.businessInfo = null;
    },

    // Запросить данные бизнеса
    async fetchBusiness() {
        const { err, body } = await api.get("/admin/business/info/get")
        if (!err) this.businessInfo = body;
    },

    // Зарегестирован ли пользователь
    async isRegistered(phone) {
        const { err, body } = await api.get("/admin/user/registered", {query: {phone}})
        return !!body?.registered;
    },

    // Отправить смс код
    async sendOtp(phone) {// /admin/user/otp/send
        await api.post("/admin/user/otp/send", {phone})
    },

    // Отправить смс код
    async checkOtp({phone, otp}) {
        const { err, body } = await api.post("/admin/user/otp/check", {phone, otp})
        return !err;
    },

    // Сменить пароль
    async resetPass({phone, password, otp}) {
        const { err, body } = await api.post("/admin/user/reset", {phone, password, otp})
        return !err;
    },

    // Регистрация (/admin/user/registration)
    async registration(form) {
        const { err, body } = await api.post("/admin/user/registration", form);
        if (!err) {
            cookie.userToken.set(body.token);
            this.userInfo = body;
            await new Promise(resolve => setTimeout(resolve, 100));
            await this.fetchBusiness();
        }
        return !err;
    },
}

export const useAuthStore = defineStore("auth", {
    state,
    getters,
    actions,
})