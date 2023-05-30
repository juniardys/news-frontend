import { api } from "@/app/axios/axiosConfigs"
import { defineCancelApiObject } from "@/app/axios/axiosUtils"

export const newsAPI = {
    get: async function (params, cancel = false) {
        try {
            const response = await api.request({
                url: `/news`,
                method: "GET",
                params,
                signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
            })
    
            return response.data
        } catch (error) {
            throw error
        }
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(newsAPI)