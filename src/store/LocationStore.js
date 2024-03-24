import { defineStore } from "pinia";

export const useLocationStore = defineStore("locationStore", {
    state: () => ({
        provinces: [],
        cities: [],
    }),
    getters: {
        PROVINCES_NAME() {
            return this.provinces.map((item) => item.name);
        },
        CITIES_NAME() {
            return this.cities.map((item) => item.name);
        },
    },
    actions: {
        async GET__PROVINCE() {
            await fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
            )
                .then((response) => response.json())
                .then((provinces) => (this.provinces = provinces))
                .catch((error) => error);
        },

        async GET__CITY(prov_id) {
            await fetch(
                `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov_id}.json`
            )
                .then((response) => response.json())
                .then((cities) => (this.cities = cities))
                .catch((error) => error);
        },

        __GET_PROVINCE_ID_BY_NAME(name) {
            return this.provinces.find((item) => item.name === name)["id"];
        },
    },
});
