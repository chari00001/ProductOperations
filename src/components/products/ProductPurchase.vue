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
                <h3>Ürün İşlemleri</h3>
                <hr>
                <div class="form-group">
                    <label>Product Name</label>
                    <input v-model="product.name" type="text" class="form-control" placeholder="Ürün adını giriniz..">
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input v-model="product.amount" type="number" class="form-control" placeholder="Ürün adetini giriniz..">
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input v-model="product.price" type="number" class="form-control" placeholder="Ürün fiyatı giriniz..">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="product.desc" cols="30" rows="5" placeholder="Ürüne ait bir açıklama giriniz..."
                              class="form-control"></textarea>
                </div>
                <hr>
                <button class="btn btn-primary" :disabled="!saveEnabled" @click="saveProduct">Save</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import product from '../../store/modules/product'

export default {
    data(){
        return {
            product: {
                name: "",
                amount: null,
                price: null,
                desc: "",
            },
            saveButtonClicked: false
        }
    },
    methods: {
        saveProduct(){
            this.saveButtonClicked = true;
            this.$store.dispatch("saveProduct", this.product);
        }
    },
    computed: {
        /***** Controls activity of save button according to input fields *****/
        saveEnabled(){
            if(this.product.name.length > 0 
            && this.product.amount > 0 
            && this.product.desc.length > 0 
            && this.product.price > 0){
                return true;
            }
            else {
                return false;
            }
        },
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
        }
    },
    beforeRouteLeave(to, from, next){
        /******* If button hasn't clicked and any field has filled, send confirmation. 
                 If any field has filled and button has clicked, navigate to product list page ******/
        if((this.product.name.length > 0 
        || this.product.amount > 0 
        || this.product.desc.length > 0 
        || this.product.price > 0)
        && !this.saveButtonClicked){

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