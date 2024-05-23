import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    info: null,
})

const getters = {
    getInfo: state => state.info,
}

const actions = {
    // Запросить данные бизнеса
    async fetchBusiness(code) {
        if (this.info?.code === code) return;
        else this.info = null;
        const { err, body } = await api.get(`/business/get/${code}`)
        if (!err) this.info = body;
    },
}

export const useBusinessStore = defineStore("business", {
    state,
    getters,
    actions,
})