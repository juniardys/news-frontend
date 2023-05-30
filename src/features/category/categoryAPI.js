import { api } from "@/app/axios/axiosConfigs"
import { defineCancelApiObject } from "@/app/axios/axiosUtils"

export const categoryAPI = {
    get: async function (params, cancel = false) {
        try {
            const response = await api.request({
                url: `/categories`,
                method: "GET",
                params,
                signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
            })
    
            return response?.data
        } catch (error) {
            throw error
        }
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(categoryAPI)