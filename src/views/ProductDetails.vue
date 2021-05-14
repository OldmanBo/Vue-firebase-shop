<template>
  <div class="product_details_page">
      <div class="product_details-container">
          <div class="pd_details-container">
              <div class="product_details_img">
                  <img :src="require(`../assets/${product.product_id}.jpg`)" alt="product image"  v-if="product.product_id">
                  <p v-if="!product.product_id">LOADING IMAGE...</p>
              </div>
              <div class="pd_product_info">
                  <h3>{{ product.name }}</h3>
                  <p id="productId">Product ID: {{ product.product_id }}</p>
                  <p class="pd_product_price">Price: <span>{{ product.price }} $</span></p>
                  <p class="pd_product_discount" v-if="product.discount">Discount: <span>{{ product.discount }}%</span></p>
                  <p class="pd_product_discount_price" v-if="product.price * product.discount / 100 !== 0">Discounted price: <span>{{ product.price - (product.price * product.discount / 100) }} $</span></p>
                  <p class="pd_saving" v-if="product.price * product.discount / 100 !== 0">Saving: {{ product.price * product.discount / 100 }} $</p>
                  <div class="pd_buttons-container">
                      <button type="button" class="pd_basket_btn" @click="pushItemIntoBasket(product.product_id)">Add to the basket</button>
                      <button type="button" class="compare_btn">Compare</button>
                  </div>
                  <div class="pd_socials-container">
                      <button type="button" class="fb_btn">Like</button>
                      <button type="button" class="share_btn">Share</button>
                      <span>Free Shipping</span>
                  </div>
              </div>
          </div>
          <div class="pd_detailed_info">
              <h3>DETAILS</h3>
              <p class="pd_product_detail"
               :class="{detailHidden: productKey === 'index_classes' || 
               productKey === 'slug' 
               || productKey === 'price' 
               || productKey === 'name'  
               || productKey === 'discount'
               || productKey === 'product_id',
               'pRam': productKey === 'gpu_memory' || productKey === 'max_memory' || productKey === 'hdd',
               'ghzSpeed': productKey === 'gpu_speed' || productKey === 'cpu_speed' || productKey === 'cpu_turbo',
               'pMB': productKey === 'cpu_cache' || productKey === 'hd_buffer',
               'pInches': productKey === 'carry_capacity' || productKey === 'screen_size' || productKey === 'laptop_size_support',
               'pMeters': productKey === 'cable_length',
               'pRPM': productKey === 'hdd_rpm' || productKey === 'fan_speed',
               'pWats': productKey === 'power_output',
               'pMmeters': productKey === 'fan_size'}"
               v-for="(productValue, productKey, index) in product" :key="productValue + index"
              >{{ productKey.replaceAll('_', ' ') }}: <span>{{ productValue.toString().replaceAll(',', ', ') }}</span></p>
          </div>
          <div class="similar_products">
              <h3>Similar Products</h3>
              <div class="sm-continer">
                  <div class="product" v-for="(sProduct, index) in sProducts" :key="sProduct.product_id + index">
                        <div class="product_image">
                            <router-link :to="{ name: 'ProductDetails', params: { productSlug: sProduct.slug } }">
                                <img :src="require(`../assets/${sProduct.product_id}.jpg`)" alt="">
                            </router-link>
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
          <form class="comment_section" @submit.prevent="postComment">
              <h3>Comments</h3>
              <label for="commentName">Your name: </label>
              <input class="comment_name" type="text" name="commentName" v-model="commentName" required>
              <label for="userComment">Your comment: </label>
              <textarea name="userComment" cols="30" rows="10" v-model="userComment" required></textarea>
              <label class="ratingLabel" for="productRating">Your rating: </label>
              <div class="product_rating-container" v-for="(rating, index) in productRatingChoices" :key="rating + index">
                <input class="product_rating" type="radio" name="productRating" :value="index + 1" v-model="productRating" required>
                <span class="product_rating_overlay" :class="{pro_active: index + 1 <= productRating}"></span>
              </div>
              <button >Post comment</button>
              <div class="comment_modal" v-if="commentSubmitted">
                  <h2>Your comment has ben submitted</h2>
                  <button type="button" @click="$router.go()">Return to the site</button>
              </div>
          </form>
          <div class="user_comments" v-for="(uComment, uCIndex) in productComments" :key="uComment.comment_id + uCIndex">
              <h4><span>Customer:</span> {{ uComment.user }}</h4>
              <p>Product rating: {{ uComment.rating }}</p>
              <p>{{ uComment.comment }}</p>
              <p><em>{{ commentTime(uComment.timestamp) }}</em></p>
          </div>
      </div>
  </div>
</template>

<script>
import { realtimeFirestore } from '../firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'
import index from '../store/index'

export default {
    data() {
        return {
            product: {},
            sProducts: [],
            productRatingChoices: [1,2,3,4,5],
            productRating: '1',
            commentName: '',
            userComment: '',
            commentSubmitted: false,
            productComments: []
        }
    },
    beforeRouteUpdate: (to, from, next) => {
        if(index.getters.getProductSlugs.product_slugs.includes(to.params.productSlug)) {
            next()
        } else {
            next({ name: 'NotFound'})
        }
    },
    created() {
        const promise1 = realtimeFirestore.collection('products').where('slug', '==', this.$route.params.productSlug).get()
        .then(qSnap => {
            qSnap.forEach(doc => {
                this.product = doc.data()
            })
        })
        .then(() => {
            realtimeFirestore.collection('products').where('product', '==', this.product.product).limit(4).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.sProducts.push(doc.data())
                })
            })
            .then(() => {
                this.sProducts = this.sProducts.filter(item => {
                    return this.product.product_id !== item.product_id
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        Promise.resolve(promise1)
        .then(() => {
            realtimeFirestore.collection('product comments').where('product_id', '==', this.product.product_id).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.productComments.push(doc.data())
                })
                this.productComments.sort((a, b) => {
                    return b.timestamp - a.timestamp
                })
            })
        .catch(err => {
            console.log(err)
            })
        })
    },
    methods: {
        pushItemIntoBasket(productId) {
            this.$store.commit('pushToCart', productId)
        },
        updateInfo() {
            this.sProducts = []
            realtimeFirestore.collection('products').where('slug', '==', this.$route.params.productSlug).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.product = doc.data()
            })
        })
        .then(() => {
            realtimeFirestore.collection('products').where('product', '==', this.product.product).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.sProducts.push(doc.data())
                })
            })
            .then(() => {
                this.sProducts = this.sProducts.filter(item => {
                    return this.product.product_id !== item.product_id
                })
                console.log(this.sProducts)
            })
        })
        .catch(err => {
            console.log(err)
        })
        },
        postComment() {
            realtimeFirestore.collection('product comments').add({
                comment: this.userComment,
                rating: this.productRating,
                user: this.commentName,
                product_id: this.product.product_id,
                timestamp: Date.now()
            })
            .then(ref =>  {
                ref.update({
                    comment_id: ref.id,
                })
            })
            .then(() => {
                this.commentSubmitted = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        commentTime(timestamp) {
            let time = new Date(timestamp).toLocaleString()
            return time
        },
    },
    computed: {
        
    },
    watch: {
        $route: 'updateInfo'
    }
}
</script>

<style>
.product_details_page {
    padding: 0 17%;
}

.pd_product_info p {
    color: hsl(240, 41%, 37%);
    margin: 15px 0;
}
.pd_product_info h3 {
    text-transform: capitalize;
}
.pd_details-container {
    display: flex;
    margin-top: 30px;
    margin-bottom: 50px;
}
.product_details_img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    margin-right: 50px;
}
.product_details_img img {
    width: 100%;
}
.pd_product_discount span{
    color: rgb(177, 29, 177);
}
.pd_product_discount_price,
.pd_product_price,
.pd_saving,
.pd_product_discount {
    font-size: 1.1rem;
}
.pd_product_discount_price span,
.pd_product_price span {
    display:block;
    font-size: 1.8rem;
}
.pd_product_discount_price span {
    color: rgb(177, 29, 177);
}
#productId {
    font-size: 0.9rem;
    margin: 15px 0;
}
.pd_buttons-container input {
    max-width: 40px;
    height: 100%;
    padding: 8px;
    text-align: center;
    border: 1px solid black;
    border-radius: 5px;
}
.pd_basket_btn {
    background: hsl(216, 96%, 35%);
    color: white;
    border: none;
    border-radius:5px;
    font-size: 1rem;
    padding: 10px 15px;
    margin: 0 10px;
    text-align: center;
    display: inline-block;
    transition: background 200ms ease-in;
    cursor: pointer;
    width: 200px;
}
.pd_basket_btn:hover {
    background: hsl(216, 96%, 45%);
}
.compare_btn {
    padding: 10px 15px;
    display: inline-block;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    background: rgba(5, 93, 225, 0.295);
    transition: background 200ms ease-in, color 200ms ease-in;
    cursor: pointer;
}
.compare_btn:hover {
    background: rgb(30, 30, 107);
    color: white;
}
.fb_btn, .share_btn {
    background: hsl(216, 96%, 60%);
    border: none;
    border-radius: 3px;
    padding: 5px;
    display: inline-block;
    font-weight: 600;
    letter-spacing: 2px;
    color:white;
    cursor: pointer;
    transition: transform 150ms ease-in;
}
.fb_btn:hover, .share_btn:hover {
    transform: scaleX(1.1);
    backface-visibility: hidden;
}
.fb_btn {
    margin-right: 10px;
}
.pd_socials-container {
    display: flex;
    margin-top: 40px;
}
.pd_socials-container span {
    display: inline-block;
    margin-left: auto;
    color: rgb(177, 29, 177);
    font-size: 1.2rem;
}

.pd_detailed_info h3 {
    text-align: center;
    padding: 10px;
    background: rgba(167, 209, 248, 0.178);
    margin-bottom: 25px;
}
.pd_product_detail {
    padding: 6px 0 2px 8px;
    border-bottom: 1px solid lightgrey;
    position: relative;
    overflow: hidden;
}
.pd_product_detail span {
    display: inline-block;
    left: 50%;
    bottom: 50%;
    transform: translateY(50%);
    position: absolute;
    background: rgba(211, 211, 211, 0.349);
    width: 100%;
    height: 100%;
    text-indent: 5px;
}
.pRam span::after {
    content: ' GB';
}
.ghzSpeed span::after {
    content: ' GHz';
}
.pMB span::after {
    content: ' MB';
}
.pMeters span::after {
    content: ' meters';
}
.pInches span::after {
    content: ' inches';
}
.pRPM span::after {
    content: ' rpm';
}
.pWats span::after {
    content: ' wats';
}
.pMmeters span::after {
    content: ' milimeters';
}
.detailHidden {
    display: none;
}

.similar_products {
    margin-top: 50px;
}
.sm-continer {
    display: flex;
    justify-content: center;
    overflow: hidden;
}
.similar_products .product {
    display: block;
}
.similar_products h3, .comment_section h3 {
    text-align: center;
    margin: 10px 0 20px 0;
    padding: 10px;
    background: rgba(167, 209, 248, 0.178);
}

.comment_section {
    margin-top: 50px;
    margin-bottom: 40px;
    position: relative;
}
.comment_name, 
.comment_section textarea {
    display: block;
    width: 100%;
    border: 1px solid rgba(211, 211, 211, 0.452);
    box-shadow: inset 0 0 3px rgba(211, 211, 211, 0.534);
    padding: 5px;
}
.comment_name:focus, 
.comment_section textarea:focus {
    border: 1px solid rgba(38, 172, 255, 0.89);
    box-shadow: 0 0 10px rgb(56, 159, 223);
}
.comment_section textarea {
    margin-bottom: 15px;
}

.comment_section label {
    font-weight: 600;
    font-size: 0.8rem;
    display: inline-block;
    margin-bottom: 5px;
    margin-top: 10px;
}
.ratingLabel {
    margin-right: 10px;
}
.product_rating-container {
    display: inline-block;
    position: relative;
    top: 5px;
}
.product_rating {
    position: relative;
    margin-right: 3px;
    opacity: 0;
    width: 20px;
    height: 20px;
    z-index: 3;
    cursor: pointer;
}
.product_rating_overlay {
    position: absolute;
    background: transparent;
    border: 1px solid rgba(82, 179, 240, 0.274);
    content: '';
    width: 20px;
    height: 20px;
    left: 0;
    border-radius: 100%;
    z-index: 1;
}
.product_rating:hover ~ .product_rating_overlay{
    background: rgb(82, 179, 240);
    box-shadow: 0 0 5px rgb(0, 157, 255);
}

.product_rating_overlay.pro_active {
    background: rgb(6, 159, 255);
}
.comment_section button {
    display: inline-block;
    margin-left: auto;
    position: absolute;
    right: 3px;
    bottom: 3px;
    border: none;
    border-radius: 5px;
    background: rgb(6, 159, 255);
    color: cornsilk;
    padding: 5px;
    font-weight: 600;
    cursor: pointer;
}
.comment_section button:hover {
    box-shadow: inset 0 0 5px cornsilk;
}
.comment_section button:focus {
    box-shadow: inset 0 0 5px cornsilk;
}

.comment_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: hsla(216, 61%, 28%, 0.425);
    z-index: 100;
}
.comment_modal h2 {
    background: hsl(216, 96%, 60%);
    color: hsl(216, 62%, 14%);
    border-radius: 5px;
    box-shadow: 0 0 10px hsl(216, 96%, 60%);
    padding: 20px;
}
.comment_modal button {
    display: inline-block;
    position: absolute;
    border: none;
    background: hsl(216, 96%, 60%);
    color:ivory;
    top: 55%;
    left: 50%;
    width: 150px;
    height: 50px;
    right: 50%;
    transform: translateX(50%);
    outline: none;
}

.user_comments +.user_comments {
    margin: 25px 0;
    border: 2px solid hsl(216, 96%, 60%);
}
.user_comments {
    border: 2px solid hsl(216, 96%, 60%);
    border-radius: 5px;
    padding: 10px;
}

.user_comments h4 {
    margin-bottom: 12px;
    font-size: 0.95rem;
}

.user_comments p:first-child {
    margin-bottom: 12px;
}
.user_comments p:nth-child(2) {
    margin-bottom: 12px;
    font-size: 1.1rem;
}
.user_comments p:last-child {
    margin-top: 15px;
    text-align: right;
}
</style>