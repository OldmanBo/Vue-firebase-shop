<template>
  <div class="sort_btn-container">
      <button class="sort_btn" @click="sortProductsPriceUp(categoryProducts)" :class="{active_sort_btn: activeBtn === 1}">Price &uArr;</button>
      <button class="sort_btn" @click="sortProductsPriceDown(categoryProducts)" :class="{active_sort_btn: activeBtn === 2}">Price &dArr;</button>
      <button class="sort_btn" @click="sortProductsNameAZ(categoryProducts)" :class="{active_sort_btn: activeBtn === 3}">Sort (a-z)</button>
      <button class="sort_btn" @click="sortProductsNameZA(categoryProducts)" :class="{active_sort_btn: activeBtn === 4}">Sort (z-a)</button>
  </div>
</template>

<script>
export default {
    props: [ "categoryProducts" ],
    data() {
        return {
            activeBtn: null
        }
    },
    methods: {
        sortProductsNameAZ( productCategory ) {
            productCategory.sort((a, b) => {
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
            this.activeBtn = 3
        },
        sortProductsNameZA( productCategory ) {
            productCategory.sort((a, b) => {
                let nameA = a.name.toUpperCase()
                let nameB = b.name.toUpperCase()
                if(nameA < nameB) {
                    return 1;
                }
                else if(nameA > nameB) {
                    return -1
                }
                return 0
            })
            this.activeBtn = 4
        },
        sortProductsPriceUp(productCategory) {
            productCategory.sort((a, b) => {
                return (a.price - (a.price * a.discount / 100)) - (b.price - (b.price * b.discount / 100))
            })
            this.activeBtn = 1
        },
        sortProductsPriceDown(productCategory) {
            productCategory.sort((a, b) => {
                return (b.price - (b.price * b.discount / 100)) - (a.price - (a.price * a.discount / 100))
            })
            this.activeBtn = 2
        }
    }
}
</script>

<style>
.sort_btn-container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
}
.sort_btn-container button {
    margin: 0 10px;
    padding: 9px;
    min-width: 100px;
    border: none;
    background: #E1ECF9;
    color: #091d34d0;
    border-radius: 25px 25px 0px 0;
    cursor: pointer;
    font-weight: 600;
    transition: border-radius 200ms ease-in, background 150ms ease-in;
}
.sort_btn-container button:hover {
    border-radius: 0 0 25px 25px;
}
.sort_btn.active_sort_btn {
    background: #659fe2;
    border-radius: 0 0 25px 25px;
    color: #091C32;
}
</style>