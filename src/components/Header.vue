<template>
  <header>
      <div class="header_main">
          <router-link :to="{name: 'Index'}">
              <div class="logo">
                  <p class="">Bobo</p>
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
              </div>
          </router-link>
          <div class="search_bar-container">
              <select name="" id="">
                  <option value="all">All Products</option>
              </select>
              <input type="search" name="" id="search" placeholder="Search" v-model="searchInput" @keyup.enter="searchProducts">
              <button type="button" class="search_btn" @click="searchProducts"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></button>
          </div>
          <div class="header_btn-container">
              <button type="button" class="user_btn"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> </button>
              <router-link :to="{ name: 'ShopCart' }"><button type="button" class="cart_btn"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span v-if="$store.getters.numberOfCartItems.length > 0">{{$store.getters.numberOfCartItems.length}}</span></button></router-link>
          </div>
      </div>
      <div class="header_info">
          <div class="drop_down_menu-container" ref="drop_down_menu_container">
              <button type="button" class="menu_btn" ref="drop_menu_btn" :class="{ menu_btn_active: menuActive }" @click="menuToggle"><span ref="burger_arrow1" class="burger_arrow">&#9782;</span> product categories <span ref="burger_arrow2" class="burger_arrow">&#9782;</span></button>
              <transition name="menu_toggle">
                  <div class="drop_down_menu" ref="drop_down_menu" v-if="menuActive">
                      <div class="drop_down_menu_parent_category" ref="drop_down_menu_parent_category" @click="menuActive = false" v-for="(pCategory, pIndex) in $store.getters.parentCategories" :key="pCategory + pIndex + 'plink'">
                          <router-link :to="{ name: 'CategoryPage', params: { categorySlug: pCategory.replaceAll(' ', '-') } }"><p class="product_link" >{{ pCategory }}</p></router-link>
                          <div class="drop_down_menu_category" ref="drop_down_menu_category" @click="menuActive = false" v-for="(category, index) in $store.getters.categories[pCategory.replaceAll(' ', '_')]" :key="category + index + 'category'">
                              <router-link :to="{ name: 'SubCategoryPage', params: { categorySlug: pCategory.replaceAll(' ', '-'), subCategorySlug: category.replaceAll(' ', '-') } }"><p>{{category}}</p></router-link>
                              <div class="drop_down_menu_subcategory" ref="drop_down_menu_subcategory" @click="menuActive = false" v-for="(subCategory, subIndex) in $store.getters.subCategories[category.replaceAll(' ', '_')]" :key="subCategory + subIndex + 'subCategory'">
                                  <router-link :to="{ name: 'SubSubCategoryPage', params: { categorySlug: pCategory.replaceAll(' ', '-'), subCategorySlug: category.replaceAll(' ', '-'), subSubCategorySlug: subCategory.replaceAll(' ', '-') } }"><p>{{subCategory}}</p></router-link>
                              </div>
                          </div>
                      </div>
                  </div>
              </transition>
          </div>
          <div class="links-container">
              <router-link :to="{ name: 'Payment' }">Payment</router-link>|
              <router-link :to="{ name: 'Blog' }">Blog</router-link> |
              <router-link :to="{ name: 'ProductConsole' }">Admin Console</router-link>
          </div>
          <div class="phone-container">
              <p>tel: 010 111 111; 010 222 222</p>
          </div>
      </div>
  </header>
</template>

<script>
export default {
    data() {
        return {
            menuActive: false,
            shopCartItems: [],
            searchInput: '',
            searchArray: []
        }
    },
    methods: {
        searchProducts() {
            if(this.searchInput !== '') {
                this.$router.push({ name: 'SearchPage', params: { searchSlug: this.searchInput.replaceAll(' ', '-') } })
            }
        },
        menuToggle() {
            this.menuActive = !this.menuActive
        },
        closeDropMenu(e) {
            if(e.target !== this.$refs.drop_down_menu_container && e.target !== this.$refs.burger_arrow1 && e.target !== this.$refs.burger_arrow2 && e.target !== this.$refs.drop_menu_btn && e.target != this.$refs.drop_down_menu_parent_category && e.target !== this.$refs.drop_down_menu && e.target !== this.$refs.drop_down_menu_category && e.target !== this.$refs.drop_down_menu_subcategory) {
                this.menuActive = false
            } else {
                return
            }
        }
    },
    created() {
        this.shopCartItems = this.$store.getters.numberOfCartItems
        window.addEventListener('click', this.closeDropMenu);
    },
    destroyed() {
        window.removeEventListener('click', this.closeDropMenu)
    }
}
</script>

<style>
.router-link-active {
    text-decoration: none;
}
header {
    margin: auto;
    padding: 10px 0;
    width: 100%;
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
}
.header_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 17%;
}
.logo {
    font-size: 3.2rem;
    font-weight: 800;
    color: hsl(216, 96%, 35%);
    display: flex;
    align-items: center;
}
.logo svg {
    max-width: 60px;
    height: auto;
    font-size: 3em; 
    color: hsl(216, 96%, 45%);
}
.header_btn-container button {
    width: 33px;
    height: 50px;
    padding: 0;
    font-size: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
}
.header_btn-container svg {
    width: 100%;
    height: auto;
}
.search_bar-container {
    border: 2px solid lightblue;
    border-radius: 20px;
    display: flex;
    align-items: center;
    position: relative;
    width: 80%;
    max-width: 600px;
}
.search_bar-container input {
    border: none;
    font-size: 1rem;
    padding: 8px ;
    border-radius: 0 20px 20px 0;
    color: grey;
    width: 67%;
}
.search_bar-container input:focus {
    border: none;
    outline: none;
    background: hsl(0, 0%, 97%);
}
.search_bar-container select {
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-right: 2px solid lightblue;
    border-radius: 20px 0 0 20px;
    font-size: 1rem;
    padding: 8px;
    appearance: none;
    color: grey;
    width: 33%;
    pointer-events: none;
}
.search_btn {
    font-size: 1rem;
    border: none;
    background: none;
    position: absolute;
    right: 5px;
    cursor: pointer;
    color: gray;
}
.search_btn svg {
    max-width: 18px;
    height: auto;
}

.header_info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgb(167, 209, 248);
    padding: 7px 13%;
}
.drop_down_menu-container {
    position: relative;
}
.drop_down_menu {
    position: absolute;
    z-index: 100;
    top: 37px;
    padding: 20px 7px;
    background: rgb(167, 209, 248);
    display: flex;
}
.product_link {
    margin: 10px 0;
    cursor: pointer;
    font-size: 1rem;
    border-bottom: 1px solid rgb(46, 46, 46);
    border-top: 1px solid rgb(46, 46, 46);
    transition: transform 200ms ease-in;
    padding: 5px;
    transition: box-shadow 150ms ease-in, color 150ms ease-in;
}
.product_link:hover {
    box-shadow: 0 0 5px #5897DF;
    color: #11335A;
}
.menu_btn {
    z-index: 10;
    cursor: pointer;
    background: transparent;
    border: none;
    font-size: 1rem;
    padding: 3px;
    text-transform: uppercase;
    font-weight: 600;
    box-shadow: 0 0 15px skyblue;
}
.menu_btn:hover .burger_arrow {
    animation: menu_animation 300ms;
    animation-fill-mode: forwards;
}

.menu_btn.menu_btn_active span {
    display: inline-block;
    transform: scale(0.5);
    transition: transform 300ms;
    color: #559E54;
}

.menu_btn span {
    transition: transform 300ms;
    display: inline-block;
    transform: scale(1.3);
    margin: 5px;
    
}
.menu_btn span:hover {
    color: #559E54;
}
/* dropdown menu animaiton */
.menu_toggle-enter {
    transform:scaleY(0);
    opacity: 0;
}
.menu_toggle-leave-to {
    transform:scaleY(0);
    opacity: 0;
}
.menu_toggle-leave-active {
    transform-origin: top;
    transition: transform 300ms, opacity 150ms;
}
.menu_toggle-enter-active {
    transform-origin: top;
    transition: transform 300ms, opacity 150ms;
}

@keyframes menu_animation {
    0% {
        color: black;
    }
    50% {
        color: #D4F7D4;
    }
    100% {
        color: #559E54;
    }
}
/* dropdown menu animaiton */

.drop_down_menu_parent_category a{
    text-decoration: none;
    font-weight: 600;
    color: black;
    text-transform: uppercase;
}
.drop_down_menu_parent_category{
    padding: 0 10px;
    min-width: 250px;
}
.drop_down_menu_parent_category + .drop_down_menu_parent_category {
    border-left: 1px solid #11335A;
}

.drop_down_menu_category {
    margin-left: 10px;
    transition: box-shadow 150ms ease-in, color 150ms ease-in;
}
.drop_down_menu_category p{
    padding: 4px;
}
.drop_down_menu_category p:hover {
    box-shadow: 0 0 5px #5897DF;
    color: #11335A;
}
.drop_down_menu_category p {
    font-size: 0.95rem;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
}
.drop_down_menu_subcategory {
    margin: 5px 10px;
}
.drop_down_menu_subcategory p {
    font-size: 0.90rem;
    border-top: none;
    border-bottom: none;
}

.cart_btn {
    position: relative;
}
.cart_btn span {
    position: absolute;
    top: -5px;
    left: 0;
    font-size: 1rem;
    font-weight: 500;
    width: 25px;
    height: 25px;
    color: #091034;
    background: #cae1fc;
    border-radius: 50%;
    padding: 3px;
}

.links-container {
    display: flex;
}
.links-container p {
    margin: 0 5px;
    font-size: 1rem;
}
.links-container a {
    text-decoration: none;
    margin: 0 10px;
    color: black;
}
.links-container a:hover {
    color:#559E54;
}
</style>