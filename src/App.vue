<template>
  <div id="app">
    <Header v-if="$route.name !== 'ProductConsole'" />
    <router-view :key="$route.path" />
    <Footer v-if="$route.name !== 'ProductConsole'" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import { realtimeFirestore } from './firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {Header, Footer},
  created() {
    realtimeFirestore.collection('products').get()
    .then(snap => {
      snap.forEach(doc => {
        this.$store.commit('pushAllProducts', doc.data())
      })
    })

    realtimeFirestore.collection('product slugs').doc('product slugs').get()
    .then(doc => {
      this.$store.commit('pushProductSlugs', doc.data())
      console.log(this.$store.getters.getProductSlugs)
    })
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
