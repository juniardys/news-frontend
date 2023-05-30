import { api } from "@/app/axios/axiosConfigs"
import { defineCancelApiObject } from "@/app/axios/axiosUtils"

export const authAPI = {
    login: async function (params, cancel = false) {
        try {
            const response = await api.request({
                url: `/login`,
                method: "POST",
                data: params,
                signal: cancel ? cancelApiObject[this.login.name].handleRequestCancellation().signal : undefined,
            })
    
            return response?.data
        } catch (error) {
            throw error
        }
    },
    register: async function (params, cancel = false) {
        try {
            const response = await api.request({
                url: "/register/",
                method: "POST",
                data: params,
                signal: cancel ? cancelApiObject[this.register.name].handleRequestCancellation().signal : undefined,
            })
    
            return response?.data
        } catch (error) {
            throw error
        }
    },
    logout: async function (params = null, cancel = false) {
        try {
            const response = await api.request({
                url: "/logout",
                method: "GET",
                signal: cancel ? cancelApiObject[this.logout.name].handleRequestCancellation().signal : undefined,
            })
    
            return response?.data
        } catch (error) {
            throw error
        }
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(authAPI)