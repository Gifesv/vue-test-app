import {createStore} from 'vuex'

const store = new createStore({
    actions: {},
    state: {
        cities: [
            {
              id: 1,
              name: "Москва",
            },
            {
              id: 2,
              name: "Санкт-Петербург",
            },
            {
              id: 3,
              name: "Казань",
            },
          ],
        data: {

        },
        errors: {
          
        },
        requestCompleted: false
    },
    mutations: {},
    getters: {}

})
export default store;