import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    info: null,

    dicts: {},
})

const getters = {
    getInfo: state => state.info,
    getDict: state => dictName => (state.dicts[dictName] || []),
}

const actions = {
    // Запросить данные бизнеса
    async fetchBusiness() {
        const { err, body } = await api.get(`/admin/business/info/get`)
        if (!err) this.info = body;
    },

    // Обновить данные бизнеса
    async updateBusiness(form) {
        const { err, body } = await api.put(`/admin/business/info/update`, form)
        if (!err) this.info = body;
    },

    // Запросить словарь
    async fetchDict(dictName) {
        const { err, body } = await api.get(`/admin/business/dict/${dictName}`)
        if (!err) this.dicts = {...this.dicts, [dictName]: body};
    },
}

export const useBusinessControlStore = defineStore("businessControl", {
    state,
    getters,
    actions,
})