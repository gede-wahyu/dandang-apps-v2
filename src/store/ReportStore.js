import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useReportStore = defineStore("reportStore", {
    state: () => ({
        incomeTax: null,
    }),
    getters: {},
    actions: {
        async GET__INCOME_TAX(year) {
            const result = await fetchWrapper
                .get(`${baseUrl}/api/dashboard/sales-tax/${year}`)
                .then((result) => {
                    this.incomeTax =
                        result.data["comparison_income_tax"][
                            "monthly_sales_data"
                        ];
                })
                .catch((error) => error);

            return result;
        },
    },
});
