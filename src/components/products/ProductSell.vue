<template>

<div class="container">
    <div class="loading" :style="isLoading">
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
    <div class="row">
        <div class="col-6 offset-3 pt-3 card mt-5 shadow">
            <div class="card-body">
                <h3>Ürün Çıkışı</h3>
                <hr>
                <div class="form-group">
                    <label>Ürün Adı</label>
                    <select 
                        class="form-control" 
                        v-model="selectedProduct" 
                        @change="productSelected">
                        <option selected disabled>Choose a product</option>
                        <option 
                                :disabled="product.amount == 0"
                                :value="product.key" 
                                v-for="product in getProducts">
                                {{ product.name }}</option>
                    </select>
                </div>
                <transition name="fade" mode="out-in">
                    <div class="card mb-2 border border-danger" v-if="product !== null">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <div class="mb-3">
                                        <span class="badge badge-info">Stock: {{ product.amount }}</span>
                                        <span class="badge badge-primary">Price: {{ product.price }}</span>
                                    </div>
                                    <p class="border border-warning p-2 text-secondary">{{ product.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <div class="form-group">
                    <label>Adet</label>
                    <input type="text" class="form-control" v-model="productCount" placeholder="Ürün adetini giriniz..">
                </div>
                <hr>
                <button @click="save" :disabled="!saveEnabled" class="btn btn-primary">Kaydet</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            selectedProduct: null,
            product: null,
            productCount: 0,
            saveButtonClicked: false,
        }
    },
    methods: {
        productSelected(){
            this.product = this.$store.getters.getProduct(this.selectedProduct)[0];
        },
        save(){
            this.saveButtonClicked = true;
            let product = {
                key: this.selectedProduct,
                amount: this.productCount
            };
            this.$store.dispatch("sellProduct", product);
        }
    },
    computed: {
        ...mapGetters(["getProducts"]),
        isLoading(){
            if(this.saveButtonClicked){
                return {
                    display: "block"
                }
            }
            else{
                return {
                    display: "none"
                }
            }
        },
        saveEnabled(){
            if(this.selectedProduct !== null
            && this.productCount > 0){
                return true;
            }
            else {
                return false;
            }
        }
    },
    beforeRouteLeave(to, from, next){
        /******* If button hasn't clicked and any field has filled, send confirmation. 
                 If any field has filled and button has clicked, navigate to product list page ******/
        if((this.selectedProduct !== null || this.productCount > 0) && !this.saveButtonClicked){

                if(confirm("There are unsaved changes. Are you sure?")){
                    next();
                }
                else{
                    next(false);
                }
        }
        else {
            next();
        }
    }
}

</script>

<style scoped>

.border-danger {
            border-style: dashed !important;
        }

</style>