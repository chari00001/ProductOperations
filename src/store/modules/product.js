import Vue from "vue";
import { router } from "../../router";

const state = {
    products: []
}

const getters = {
    getProducts(state){
        return state.products;
    },
    getProduct(state){
        return key => state.products.filter(element => {
            return element.key == key
        })
    }
}

const mutations = {
    updateProductList(state, product){
        state.products.push(product);
    }
}

const actions = {
    initApp({ commit }){
        Vue.http.get("https://productoperations-3efe0-default-rtdb.firebaseio.com/products.json")
            .then(response => {
                let data = response.body;
                for(let key in data){
                    data[key].key = key;
                    commit("updateProductList", data[key]);
                }
            })
    },
    saveProduct({ commit, state, dispatch }, product){
        /****** Connecting to Firebase and sending json  ********/
        Vue.http.post("https://productoperations-3efe0-default-rtdb.firebaseio.com/products.json", product)
            .then((response) => {
                /******* Updating Product List *******/
                product.key = response.body.name;
                commit("updateProductList", product);
                let tradeResult = {
                    purchase: product.price,
                    sale: 0,
                    count: product.amount
                }
                dispatch("setTradeResult", tradeResult);
                router.replace("/"); // Routes to Product List page when Save button triggered
            })
    },
    sellProduct({ commit, state, dispatch }, payload){
        let product = state.products.filter(element => {
            return element.key == payload.key
        })

        if(product){

            let totalCount = product[0].amount - payload.amount

            Vue.http.patch("https://productoperations-3efe0-default-rtdb.firebaseio.com/products/" + payload.key + ".json", {amount: totalCount})
                .then(response => {
                    product[0].amount = totalCount;
                    let tradeResult = {
                        purchase: 0,
                        sale: product[0].price,
                        count: payload.amount
                    }
                    dispatch("setTradeResult", tradeResult);
                    router.replace("/");
                })
        }

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}