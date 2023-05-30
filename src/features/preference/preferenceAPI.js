import { api } from "@/app/axios/axiosConfigs"
import { defineCancelApiObject } from "@/app/axios/axiosUtils"

export const preferenceAPI = {
    save: async function (params, cancel = false) {
        try {
            const response = await api.request({
                url: `/user/preferences`,
                method: "POST",
                data: params,
                signal: cancel ? cancelApiObject[this.save.name].handleRequestCancellation().signal : undefined,
            })
    
            return response?.data
        } catch (error) {
            throw error
        }
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(preferenceAPI)