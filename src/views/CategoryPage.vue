<template>
  <div class="category_page">
      <h1>Showing products from: <router-link :to="{ name: 'CategoryPage', params: { categroySlug: $route.params.categorySlug } }"><span>{{ $route.params.categorySlug.replaceAll('-', ' ') }}</span></router-link></h1>
      <SortButtons :categoryProducts="categoryProducts" />
      <div class="similar_products">
              <div class="sm-continer">
                  <div class="product" v-for="(sProduct, index) in categoryProducts" :key="sProduct + index">
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
  </div>
</template>

<script>
import { realtimeFirestore } from '../firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'
import SortButtons from '../components/SortButtons'
import index from '../store/index'

export default {
    components: { SortButtons },
    data() {
        return {
            categoryProducts: [],
            slugs: []
        }
    },
    methods: {
        pushItemIntoBasket(productId) {
            this.$store.commit('pushToCart', productId)
        },
        sortProducts() {
            // this.categoryProducts.sort((a, b) => {
            //     return (a.price - (a.price * a.discount / 100)) - (b.price - (b.price * b.discount / 100))
            // })
            this.categoryProducts.sort((a, b) => {
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()
                if(nameA < nameB) {
                    return -1;
                }
                else if(nameA > nameB) {
                    return 1
                }
                return 0
            })
        }
    },
    created() {
        realtimeFirestore.collection('products').where('collection', '==', this.$route.params.categorySlug.replaceAll('-', ' ')).get()
        .then(qSnap => {
            qSnap.forEach(doc => {
                this.categoryProducts.push(doc.data())
            })
        })
    },
    beforeRouteUpdate: (to, from, next) => {
        if(index.getters.getCollections.includes(to.params.categorySlug.replaceAll('-', ' '))) {
            next()
        } else {
            next({name: 'NotFound'})
        }
    }
}
</script>

<style>

.category_page {
    padding: 20px 17%;
}
.category_page h1 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}
.category_page h1 span {
    color: skyblue;
}
.category_page h1 span:hover {
    border-bottom: 1px solid skyblue;
}
.category_page .similar_products .sm-continer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

</style>