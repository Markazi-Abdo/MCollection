import { create } from "zustand"
import AxiosInstance from "../utils/axios"

export const useAnalyticsStore = create(( set )=>({
    data:"",

    getAnalytics:async function(){
        try {
            const fetchData = await AxiosInstance.get("/analytics/data");
            set({ data:fetchData.data.data });
            console.log("App Analytics are here....");
        } catch (error) {
            console.log(error.message)
        }
    }
}))