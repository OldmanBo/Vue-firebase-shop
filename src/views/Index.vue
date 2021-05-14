<template>
    <div class="index_page">
        <div class="carousel-container" @mouseover="stopAutoSlide" @mouseout="playAutoSlide">
                <div class="slide" :class="{ slide_active: slide.display }" v-for="slide in blogSlides" :key="slide.name">
                    <router-link class="slide_link" :to="{ name: 'BlogDetails', params: { blogSlug: slide.blogRoute } }"><img class="slider_img" :src="'static/' + slide.name + '_slideImg.png'" alt=""></router-link>
                </div>
            <button class="prev_slide_btn" @click="prevSlide">prev</button>
            <button class="next_slide_btn" @click="nextSlide">next</button>
        </div>
        <section class="index_products_container">
            <div class="products_section" v-for="(section, sectionIndex) in indexSections" :key="section + sectionIndex">
                <div class="section_title_btn-container">
                    <h3 class="products_section_title">{{ section }}</h3>
                </div>
                <div class="products_section_slider">
                    <div class="product" v-for="(product, index) in sectionProducts[section.replaceAll(' ', '_')]" :key="index + product" 
                    :class="{product_active: prSlides[section.replaceAll(' ', '_')].includes(index)}" :style="{order: prSlides[section.replaceAll(' ', '_')].indexOf(index)}">
                        <router-link :to="{ name: 'ProductDetails', params: { productSlug: product.slug } }"><div class="product_image">
                            <img :src="getImg(product.product_id)" alt="">
                        </div></router-link>
                        <div class="product_info">
                            <p class="product_title">{{ product.name }}</p>
                            <p class="old_price" v-if="product.discount > 0">{{product.price}} $</p>
                            <p class="current_price">{{product.price - (product.price * product.discount / 100)}} $</p>
                        </div>
                        <button type="button" class="basket_btn" @click="pushItemIntoBasket(product.product_id)"><div class="svg_shadow"></div><svg class="w-6 h-6 cart_btn_svg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg></button>
                        <div class="product_discount_info-container" v-if="product.discount > 0">
                                <p class="product_discount_info">DISCOUNT <span>{{product.discount}}%</span></p>
                                <div class="pink_triangle"></div>
                                <div class="white_triangle"></div>
                        </div>
                    </div>
                </div>
                <div class="index_slider_btns">
                        <button type="button" class="prev_product_slide_btn" @click="prevPrSlide(section)">prev</button>
                        <button type="button" class="next_product_slide_btn" @click="nextPrSlide(section)">next</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { realtimeFirestore } from '../firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    data() {
        return {
            prSlides: {
                
            },
            slideNumber: 0,
            slideInterval:'',
            blogSlides: [
                {
                    blogRoute: 'holiday-sesaon-discounts',
                    name: 'blog1',
                    display: true
                },
                {
                    blogRoute: 'work-hours-change',
                    name: 'blog2',
                    display: false
                },
                {
                    blogRoute: 'giveaway-to-celebrate-20-years',
                    name: 'blog3',
                    display: false
                }
            ],
            indexSections: [],
            products: [],
            sectionProducts: {}
        }
    },
    methods: {
        getImg(id) {
            try {
                require(`../assets/${id}.jpg`)
                return  require(`../assets/${id}.jpg`)
            } catch (error) {
                return require(`../assets/no_img.png`)
            }
        },
        pushItemIntoBasket(productId) {
            this.$store.commit('pushToCart', productId)
        },
        nextPrSlide(sec) {
            let sectionName = sec.replaceAll(' ', '_')
            for(let i = 0; i < this.prSlides[sectionName].length; i++) {
                if(this.prSlides[sectionName][i] >= this.sectionProducts[sectionName].length -1) {
                    this.prSlides[sectionName][i] = 0
                } else {
                    this.prSlides[sectionName][i]++
                }
            }
            
            this.blogSlides[this.slideNumber].display = false
            if (this.slideNumber >= this.blogSlides.length - 1) {
                this.slideNumber = 0
                this.blogSlides[0].display = true
            }
            else {
                this.slideNumber++
                this.blogSlides[this.slideNumber].display = true
            }
        },
        prevPrSlide(sec) {
            let sectionName = sec.replaceAll(' ', '_')
            for(let i = 0; i < this.prSlides[sectionName].length; i++) {
                if(this.prSlides[sectionName][i] <= 0) {
                    this.prSlides[sectionName][i] = this.sectionProducts[sectionName].length -1
                } else {
                    this.prSlides[sectionName][i]--
                }
            }
            this.blogSlides[this.slideNumber].display = false
            if (this.slideNumber <= 0) {
                this.slideNumber = this.blogSlides.length - 1
                this.blogSlides[this.blogSlides.length - 1].display = true
            }
            else {
                this.slideNumber--
                this.blogSlides[this.slideNumber].display = true
            }
        },
        getImg(img) {
            return require('../assets/' + img + '.jpg')
        },
        prevSlide() {
            this.blogSlides[this.slideNumber].display = false
            if (this.slideNumber <= 0) {
                this.slideNumber = this.blogSlides.length - 1
                this.blogSlides[this.blogSlides.length - 1].display = true
            }
            else {
                this.slideNumber--
                this.blogSlides[this.slideNumber].display = true
            }

        },
        nextSlide() {
            this.blogSlides[this.slideNumber].display = false
            if (this.slideNumber >= this.blogSlides.length - 1) {
                this.slideNumber = 0
                this.blogSlides[0].display = true
            }
            else {
                this.slideNumber++
                this.blogSlides[this.slideNumber].display = true
            }
        },
        stopAutoSlide() {
            clearInterval(this.slideInterval)
        },
        playAutoSlide() {
            this.slideInterval = setInterval(this.nextSlide, 4000)
        }
    },
    created() {
        this.slideInterval = setInterval(this.nextSlide, 4000)
        realtimeFirestore.collection('index classes').get()
        .then(snap => {
            snap.forEach(doc => {
                let classId = doc.id
                this.indexSections.push(classId)
            }) 
        })
        .then(() => {
            realtimeFirestore.collection('products').where('index_classes', 'array-contains-any', this.indexSections).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.products.push(doc.data())
                })
            })
            .then(() => {
                this.indexSections.forEach(section => {
                    this.sectionProducts[section.replaceAll(' ', '_')] = []
                    this.sectionProducts[section.replaceAll(' ', '_')] = this.products.filter(product => {
                        return product.index_classes.includes(section)
                    })
                })
            })
            .then(() => {
                this.indexSections.forEach(section => {
            this.prSlides[section.replaceAll(' ', '_')] = [0, 1, 2, 3]
        })
            })
            .then(() => {
                this.blogSlides[this.slideNumber].display = false
                if (this.slideNumber >= this.blogSlides.length - 1) {
                    this.slideNumber = 0
                    this.blogSlides[0].display = true
                } else {
                    this.slideNumber++
                    this.blogSlides[this.slideNumber].display = true
                }
            })
            
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    },
    mounted() {
    }
    
}
</script>

<style>

.carousel-container {
    width: 100%;
    position: relative;
    display: flex;
    margin-bottom: 80px;
}
.slide {
    width: 100%;
    max-height: 500px;
    overflow: hidden;
    position: absolute;
    z-index: 4;
    opacity: 0;
    transition: opacity 700ms;
}

.slide.slide_active {
    position: relative;
    z-index: 5;
    opacity: 1;
    transition: opacity 700ms;
}
.slider_img {
    width: 100%;
    height: 100%;
    display: block;
}
.slide_link {
    display: block;
}
.carousel-container button {
    position: absolute;
    top: 50%;
    font-size: 1.2rem;
    background: rgba(135, 207, 235, 0.493);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 4px;
    transition: background 200ms;
    cursor: pointer;
    z-index: 6;
}
.carousel-container button:hover {
    background: rgba(135, 207, 235, 0.87);
}
.prev_slide_btn {
    left: 5px;
}
.next_slide_btn {
    right: 5px;
}

.index_products_container {
    padding: 0 17%;
}
.section_title_btn-container {
    text-align: center;
    position: relative;
    padding: 5px 2px;
    background: rgba(167, 209, 248, 0.178);
    border-radius: 3px;
    margin: 20px 0;
    box-shadow: inset 0 0 5px skyblue;
}
.index_slider_btns {
    display: flex;
    justify-content: center;
    margin: 10px;
    padding: 30px;
}
.index_slider_btns button{
    padding: 7px;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    color: #091C32;
    border-radius: 20%;
    background: #E1ECF9;
    margin: 0 15px;
    cursor: pointer;
    transition: box-shadow 150ms ease-in, background 150ms ease-in;
}
.index_slider_btns button:hover {
    box-shadow: inset 0 0 4px skyblue;
    background: hsl(212, 67%, 89%);
}

.products_section {
    border-bottom: 1px solid skyblue;
}
.products_section_title {
    font-size: 2.3rem;
    font-weight: 400;
    text-transform: capitalize;
    color: hsl(240, 43%, 31%);
    letter-spacing: 1px;
}
.products_section_slider {
    display: flex;
    justify-content: space-between;
 
}
.product {
    display: none;
    position:relative;
    max-width: 300px;
    min-width: 250px;
    height: 516px;
    padding: 50px 10px 0 10px;
    border: 1px solid rgba(109, 168, 204, 0.575);
    border-radius: 2%;
    box-shadow: inset 0px 0px 5px 2px skyblue;
    margin: 5px;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
}
.product.product_active {
    display: block;
}
.product_discount_info {
    font-size: 1.2rem;
    color: white;

}
.product_discount_info-container {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border-radius: 0 15% 15% 0;
}
.pink_triangle {
    background: pink;
    box-shadow: 0 0 5px pink;
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    left: 178px;
    bottom: -18px;
}
.white_triangle {
    background: white;
    box-shadow: 0 0 5px white;
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    top: -1px;
    left: 199px;
}
.product_discount_info {
    background: hsl(216, 96%, 35%);
    position: relative;
    padding: 5px 20px;
    width: 100%;
    text-shadow: 0 0 2px white;
}
.product_discount_info span {
    display: inline-block;
    margin-left: auto;
    text-align: right;
    font-weight: 600;
    position: absolute;
    right: -1px;
    background: transparent;
    color: rgb(177, 29, 177);
    height: 100%;
    top: 0;
    line-height: 1.5;
    width: 30%;
    padding-right: 10px;
    text-shadow: 0 0 2px rgb(177, 29, 177);
}
.product_image {
    border: 2px solid transparent;
    width: 100%;
    max-height: 300px;
    min-height: 280px;
    padding: 10px;
    cursor: pointer;
    transition: border 150ms ease-in;
}
.product_image:hover  {
    border-left: 2px solid skyblue;
    border-right: 2px solid skyblue;
}
.product_image a {
    width: 100%;
    height: auto;
    display: block;
}
.product_image img {
    width: 90%;
    height: auto;
    max-height: 280px;
}
.product_info {
    text-align: center;
    position: absolute;
    bottom: 60px;
    right: 50%;
    transform: translateX(50%);
}
.product_title {
    margin: 25px 0 40px 0;
    padding: 4px;
    font-weight: 100;
    color: rgba(43, 43, 43, 0.863);
    background: rgba(135, 207, 235, 0.3);
    text-transform: capitalize;
    border-radius: 3px;
    box-shadow:  0 0 5px 5px rgba(135, 207, 235, 0.3);
}
.old_price {
    color: gray;
    text-decoration: line-through;
    white-space: nowrap;
}
.current_price {
    color: rgb(177, 29, 177);
    font-size: 2.3rem;
    white-space: nowrap;
}
.basket_btn {
    background: hsl(216, 96%, 35%);
    color: white;
    border: none;
    border-radius: 50% 50% 0 0;
    font-size: 1rem;
    padding: 10px 15px 5px 15px;
    margin: auto;
    text-align: center;
    display: block;
    transition: background 150ms ease-in;
    z-index: 10;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
    width: 130px;
}
.basket_btn:hover {
    background: hsl(216, 96%, 45%);
}
.basket_btn:hover .svg_shadow {
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.23);
}
.basket_btn svg {
    width: 30px;
    transition: filter 200ms ease-in;
}
.svg_shadow {
    content: '';
    position: absolute;
    background: transparent;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    left: 50%;
    transform: translate(-52%, -2px);
    transition: box-shadow 250ms ease-in, background 250ms ease-in;
}
</style>
