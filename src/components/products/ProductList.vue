<template>

<div class="container">
        <div class="row">
            <div class="col-12 mb-5 card mt-5 shadow">
                <div class="card-body">
                    <h3>Ürün Listesi</h3>
                    <hr>
                    <table class="table table-hover table-striped table-bordered" v-if="getProducts.length > 0">
                        <thead>
                        <th>id</th>
                        <th>Ürün Adı</th>
                        <th>Adet</th>
                        <th>Fiyat</th>
                        <th>Açıklama</th>
                        </thead>
                        <tbody>
                        <tr v-for="product in getProducts">
                            <td class="align-middle text-center"><span class="badge badge-info"> {{ product.key }} </span></td>
                            <td class="align-middle text-center"> {{ product.name }} </td>
                            <td class="align-middle text-center" :class="getCountClasses(product.amount)"> {{ product.amount }} </td>
                            <td style="width: 120px;"> {{ product.price | currency }}</td>
                            <td class="align-middle"> {{ product.desc }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="alert alert-warning" v-else>
                        <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
                        <br>
                        <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["getProducts"])
    },
    methods: {
        getCountClasses(amount){
            return {
                "btn-danger text-white": amount == 0 || amount == null,
                "btn-warning text-white": amount <= 5 && amount > 0,
                "btn-success text-white": amount > 5
            }
        }
    }
}

</script>