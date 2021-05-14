<template>
  <div class="category_page">
      <h1>Showing products from: 
          <router-link :to="{ name: 'CategoryPage', params: { categroySlug: $route.params.categorySlug } }"><span>{{ $route.params.categorySlug.replaceAll('-', ' ') }}</span></router-link> / 
          <router-link :to="{ name: 'SubCategoryPage', params: { subCategroySlug: $route.params.subCategorySlug } }"><span>{{ $route.params.subCategorySlug }}</span></router-link> / 
          <router-link :to="{ name: 'SubSubCategoryPage', params: { subSubCategroySlug: $route.params.subSubCategorySlug } }"><span>{{ $route.params.subSubCategorySlug }}</span></router-link>
      </h1>
      <button class="filter_btn" @click="showFilters" :class="{ active_filter_btn: filtersInterface }"><span v-if="!filtersInterface">Show Filters</span><span v-if="filtersInterface">Hide Filters</span></button>
      <button class="filter_btn" v-if="filtersInterface" @click="filterProducts">Apply Filters</button>
      <button class="filter_btn" v-if="filtersInterface" @click="removeFilters(filterProducts)">Remove Filters</button>
      <div class="filter_products-container" v-if="filtersInterface">
          <div class="filter_product_options-container" v-for="(option, optionIndex) in productFilterOptionsObject" :key="option + optionIndex + 'filter'">
              <h4>{{ optionIndex.replaceAll('_', ' ').toUpperCase() }}
                   <span v-if="optionIndex === 'screen_size' || optionIndex === 'carry_capacity' || optionIndex === 'laptop_size_support'">(Inches)</span>
                   <span v-if="optionIndex === 'price'">($)</span>
                   <span v-if="optionIndex === 'hdd' || optionIndex === 'gpu_memory' || optionIndex === 'max_ram'">(GB)</span>
                   <span v-if="optionIndex === 'cpu_cache'">(MB)</span>
                   <span v-if="optionIndex === 'discount'">(%)</span>
                   <span v-if="optionIndex === 'cpu_speed' || optionIndex === 'cpu_turbo' || optionIndex === 'gpu_speed'">(GHz)</span>
                   <span v-if="optionIndex === 'cable_length'">(m)</span>
                   <span v-if="optionIndex === 'power_output'">(W)</span>
                   <span v-if="optionIndex === 'fan_size'">(mm)</span>
                   <span v-if="optionIndex === 'fan_speed'">(RPM)</span>
              </h4>
              <div v-for="(inputOption, inputOptionIndex) in option" :key="inputOption + inputOptionIndex + 'inputOption'">
                  <label :for="inputOption">{{ inputOption.toString() }}</label>
                  <input class="filterCheckbox" type="checkbox" :name="inputOption" @click="pushFilter(inputOption, optionIndex)">
              </div>
          </div>
      </div>
      <SortButtons :categoryProducts="filterredCategoryProducts" />
      <div class="similar_products">
              <div class="sm-continer">
                  <div class="product" v-for="(sProduct, index) in filterredCategoryProducts" :key="sProduct + index">
                        <div class="product_image">
                            <router-link :to="{ name: 'ProductDetails', params: { productSlug: sProduct.slug } }">
                                <img :src="getImg(sProduct.product_id)" alt="">
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
            filterredCategoryProducts: [],
            productFilterOptions: [],
            productFilterOptionsObject: {},
            activeFilterOptions: {},
            filtersInterface: false
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
        removeFilters() {
            for(let filter in this.activeFilterOptions) {
                this.activeFilterOptions[filter] = []
            }
            const checkboxes = document.querySelectorAll('.filterCheckbox')
            checkboxes.forEach(box => {
                box.checked = false
            })
            this.filterredCategoryProducts = this.categoryProducts
        },
        showFilters() {
            this.filtersInterface = !this.filtersInterface
            for(let filter in this.activeFilterOptions) {
                this.activeFilterOptions[filter] = []
            }

        },
        filterProducts() {
            for(let obj in this.activeFilterOptions) {
                if(this.activeFilterOptions[obj].length > 0) {
                    console.log(this.activeFilterOptions[obj])
                    this.filterredCategoryProducts = this.categoryProducts.filter(product => {
                        return this.activeFilterOptions[obj].includes(product[obj])
                    })
                } else {
                    console.log('error' + obj)
                }
            }
        },
        pushFilter(input, fieldName) {
            console.log(fieldName + input)
            if (this.activeFilterOptions[fieldName].includes(input)) {
                this.activeFilterOptions[fieldName] = this.activeFilterOptions[fieldName].filter(field => {
                    return field !== input
                })
            } else {
                this.activeFilterOptions[fieldName].push(input)
            }
            console.log(this.activeFilterOptions[fieldName])
        },
        pushItemIntoBasket(productId) {
            this.$store.commit('pushToCart', productId)
        },
    },
    filters: {
    },
    created() {
        const promise1 = realtimeFirestore.collection('products')
        .where('collection', '==', this.$route.params.categorySlug.replaceAll('-', ' '))
        .where('product_category', '==', this.$route.params.subCategorySlug.replaceAll('-', ' '))
        .where('product_subcategory', '==', this.$route.params.subSubCategorySlug.replaceAll('-', ' ') ).get()
        .then(qSnap => {
            qSnap.forEach(doc => {
                this.categoryProducts.push(doc.data())
            })
            this.filterredCategoryProducts = this.categoryProducts
        })

        Promise.resolve(promise1)
        .then(() => {
            this.categoryProducts.forEach(product => {
                for(let key in product) {
                    if (this.productFilterOptions.includes(key)) {
                        return
                    } else {
                        this.productFilterOptions.push(key)
                    }
                }
                this.productFilterOptions.sort()
            })
        })
        .then(() => {
            this.productFilterOptions.forEach(option => {
                if (option === 'slug' || option === 'product_id' || option === 'product_category' || option === 'collection' || option === 'product_subcategory' || option === 'index_classes') {
                    return
                } else {
                    this.productFilterOptionsObject[option] = []
                    this.activeFilterOptions[option] = []
                }
            })
            this.categoryProducts.forEach(product => {
                this.productFilterOptions.forEach(filter => {
                    if(product[filter] && this.productFilterOptionsObject[filter]) {
                        if(this.productFilterOptionsObject[filter].includes(product[filter])) {
                            return
                        } else {
                            this.productFilterOptionsObject[filter].push(product[filter])
                        }
                    } else {
                        return
                    }
                })
            })
        })
    },
    beforeRouteUpdate: (to, from, next) => {
        if(index.getters.getCollections.includes(to.params.categorySlug.replaceAll('-', ' ')) 
        && index.getters.getDocuments[to.params.categorySlug.replaceAll('-', '_')].includes(to.params.subCategorySlug.replaceAll('-', ' ')) 
        && index.getters.getSubCollections[to.params.subCategorySlug.replaceAll('-', '_')].includes(to.params.subSubCategorySlug.replaceAll('-', ' '))) {
            next()
        } else {
            next({name: 'NotFound'})
        }
    }
}
</script>

<style>

.filter_btn {
    background: #E1ECF9;
    border: none;
    padding: 10px;
    margin: 0 10px 15px 10px;
    color: hsl(216, 96%, 25%);
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
}
.filter_btn.active_filter_btn {
    border: 2px solid hsl(216, 96%, 35%);
    box-shadow: 0 0 3px hsl(216, 96%, 35%);
}
.filter_btn:hover {
    border: 2px solid hsl(216, 96%, 35%);
}

.filter_products-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.filter_product_options-container {
    padding: 0 5px;
    border-left: 1px solid black;
}
.filter_product_options-container div{
    display: flex;
    justify-content: space-between;
}

</style>