<template>
    <div class="search_page">
        <SortButtons :categoryProducts = "filterredProducts" />
        <div class="similar_products">
            <div class="sm-continer">
                <div class="product" v-for="(sProduct, index) in filterredProducts" :key="sProduct + index">
                    <div class="product_image">
                        <router-link :to="{ name: 'ProductDetails', params: { productSlug: sProduct.slug } }"><img :src="require(`../assets/${sProduct.product_id}.jpg`)" alt=""></router-link>
                    </div>
                    <div class="product_info">
                        <p class="product_title">{{ sProduct.name }}</p>
                        <p class="old_price" v-if="sProduct.discount > 0">{{sProduct.price}} $</p>
                        <p class="current_price">{{sProduct.price - (sProduct.price * sProduct.discount / 100)}} $</p>
                    </div>
                    <button type="button" class="basket_btn" @click="pushItemIntoBasket(sProduct.product_id)"><div class="svg_shadow"></div><svg class="w-6 h-6 cart_btn_svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></button>
                    <div class="product_discount_info-container" v-if="sProduct.discount > 0">
                            <p class="product_discount_info">DISCOUNT <span>{{sProduct.discount}}%</span></p>
                            <div class="pink_triangle"></div>
                            <div class="white_triangle"></div>
                    </div>
                </div>
            </div>
        </div>
        <h2 v-if="filterredProducts.length <= 0">Sorry, the search term didn't match any product.</h2>
    </div>
</template>

<script>
import { realtimeFirestore } from '../firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'
import SortButtons from '../components/SortButtons'

export default {
    components: { SortButtons },
    data() {
        return {
            allProducts: [],
            filterredProducts: [],
            filterredProductsIDs:[]
        }
    },
    methods: {
        pushItemIntoBasket(productId) {
            this.$store.commit('pushToCart', productId)
        },
        updateInfo() {
            this.filterredProducts = []
            this.filterredProductsIDs =[]
            this.allProducts = this.$store.getters.getAllProducts
            this.allProducts.forEach(product => {
                if (this.filterredProductsIDs.includes(product.product_id)) {
                    return
                } else {
                    for(let key in product) {
                        if(product[key] !== null && typeof product[key] !== 'number' && product[key].includes(this.$route.params.searchSlug.replaceAll('-', ' ').toLowerCase())) {
                            this.filterredProducts.push(product)
                            this.filterredProductsIDs.push(product.product_id)
                            break
                        }
                    }
                }
            })
            console.log(this.filterredProducts)   
        }
    },
    watch: {
        $route: 'updateInfo'
    },
    created() {
        this.allProducts = this.$store.getters.getAllProducts
        this.allProducts.forEach(product => {
            if (this.filterredProductsIDs.includes(product.product_id)) {
                return
            } else {
                for(let key in product) {
                    if(product[key] !== null && typeof product[key] !== 'number' && product[key].includes(this.$route.params.searchSlug.replaceAll('-', ' '))) {
                        this.filterredProducts.push(product)
                        this.filterredProductsIDs.push(product.product_id)
                        break
                    }
                }
            }
        })
        console.log(this.filterredProducts)
        console.log(this.$store.getters.getAllProducts)
    }
}
</script>

<style>
.search_page {
    padding: 0 17%;
}
.search_page .similar_products .sm-continer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>