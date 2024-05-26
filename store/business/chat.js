import {defineStore} from "pinia";
import api from "~/composables/api";

const state = () => ({
    chatId: null,

    businessCode: null,

    // Сообщения в диалоге
    messages: [],//{type: <user|assistant|widget>, text}

    // Виджет для вызова
    widgetToCall: null
})

const getters = {
    getChatId: state => state.chatId,
    getMessages: state => state.messages,
    getWidgetToCall: state => state.widgetToCall,
}

const actions = {
    // Сообщение
    async sendMessage(code, message) {
        this.businessCode = code;
        this.messages.push({type: "user", text: message})
        const { err, body } = await api.post(`/business/chat/${code}`, {
            chat_id: this.chatId,
            message
        });
        this.chatId = body.chatId;
        if (body.message) this.messages.push({type: "assistant", text: body.message})
        else if (body.widget) this.widgetToCall = body.widget;
        return body;
    },

    // Сообщение
    async submitWidget(form) {
        const { err, body } = await api.post(`/business/chat/${this.businessCode}/submitWidget`, {
            chat_id: this.chatId,
            form
        });
        this.chatId = body.chatId;
        this.messages.push({type: "assistant", text: body.message})
        return body;
    },

    // Закрыть виджет
    async widgetClose(form = null) {
        this.widgetToCall = null;
        this.submitWidget(form);
    },
}

export const useBusinessChatStore = defineStore("businessChat", {
    state,
    getters,
    actions,
})