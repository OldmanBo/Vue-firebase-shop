<template>
  <div class="category_page">
      <h1>Showing products from: 
          <router-link :to="{ name: 'CategoryPage', params: { categroySlug: $route.params.categorySlug } }"><span>{{ $route.params.categorySlug.replaceAll('-', ' ') }}</span></router-link> / 
          <router-link :to="{ name: 'SubCategoryPage', params: { subCategroySlug: $route.params.subCategorySlug } }"><span>{{ $route.params.subCategorySlug }}</span></router-link>
      </h1>
      <SortButtons :categoryProducts="categoryProducts" />
      <div class="similar_products">
              <div class="sm-continer">
                  <div class="product" v-for="(sProduct, index) in categoryProducts" :key="sProduct + index">
                        <div class="product_image">
                            <router-link :to="{ name: 'ProductDetails', params: { productSlug: sProduct.slug } }"><img :src="getImg(sProduct.product_id)" alt=""></router-link>
                        </div>
                        <div class="product_info">
                            <p class="product_title">{{ sProduct.name }}</p>
                            <p class="old_price" v-if="sProduct.discount > 0">{{sProduct.price}} $</p>
                            <p class="current_price">{{sProduct.price - (sProduct.price * sProduct.discount / 100)}} $</p>
                        </div>
                        <button type="button" class="basket_btn" @click="pushItemIntoBasket(sProduct.product_id)"><div class="svg_shadow"></div><svg class="w-6 h-6 cart_btn_svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></button>
                        <div class="product_discount_info-container" v-if="sProduct.discount > 0">
                                <p class="product_discount_info">DISCOUNT <span>{{sProduct.discount}}%</span></p>
                                <div class="white_triangle">
                                    <div class="pink_triangle"></div>
                                    <div class="blue_triangle"></div>
                                </div>
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
import index from '../store/index'
import SortButtons from '../components/SortButtons'

export default {
    components: { SortButtons },
    data() {
        return {
            categoryProducts: []
        }
    },
    methods: {
        pushItemIntoBasket(productId) {
            this.$store.commit('pushToCart', productId)
        },
        getImg(id) {
            try {
                require(`../assets/${id}.jpg`)
                return  require(`../assets/${id}.jpg`)
            } catch (error) {
                return require(`../assets/no_img.png`)
            }
        }
    },
    created() {
        realtimeFirestore.collection('products')
        .where('collection', '==', this.$route.params.categorySlug.replaceAll('-', ' '))
        .where('product_category', '==', this.$route.params.subCategorySlug.replaceAll('-', ' ') ).get()
        .then(qSnap => {
            qSnap.forEach(doc => {
                this.categoryProducts.push(doc.data())
            })
        })
    },
    beforeRouteUpdate: (to, from, next) => {
        if(index.getters.getCollections.includes(to.params.categorySlug.replaceAll('-', ' ')) 
        && index.getters.getDocuments[to.params.categorySlug.replaceAll('-', '_')].includes(to.params.subCategorySlug.replaceAll('-', ' '))) {
            next()
        } else {
            next({name: 'NotFound'})
        }
    }
}
</script>

<style>

</style>