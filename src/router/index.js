import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../store/index'
import Index from '../views/Index'
import Blog from '../views/Blog'
import BlogDetails from '../views/BlogDetails'
import Payment from '../views/Payment'
import ProductConsole from '../views/ProductConsole'
import ProductDetails from '../views/ProductDetails'
import ShopCart from '../views/ShopCart'
import CategoryPage from '../views/CategoryPage'
import SubCategoryPage from '../views/SubCategoryPage'
import SubSubCategoryPage from '../views/SubSubCategoryPage'
import SearchPage from '../views/SearchPage'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:blogSlug',
    name: 'BlogDetails',
    component: BlogDetails,
    props: true
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/product-console',
    name: 'ProductConsole',
    component: ProductConsole
  },
  {
    path: '/product-details/:productSlug',
    name: 'ProductDetails',
    component: ProductDetails,
    beforeEnter: (to, from, next) => {
      if(index.getters.getProductSlugs.product_slugs.includes(to.params.productSlug)) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/shop-cart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/categories/:categorySlug',
    name: 'CategoryPage',
    component: CategoryPage,
    props: true,
    beforeEnter: (to, from, next) => {
      if(index.getters.getCollections.includes(to.params.categorySlug.replaceAll('-', ' '))) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/categories/:categorySlug/:subCategorySlug',
    name: 'SubCategoryPage',
    component: SubCategoryPage,
    beforeEnter: (to, from, next) => {
      if(index.getters.getCollections.includes(to.params.categorySlug.replaceAll('-', ' ')) 
      && index.getters.getDocuments[to.params.categorySlug.replaceAll('-', '_')].includes(to.params.subCategorySlug.replaceAll('-', ' '))) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/categories/:categorySlug/:subCategorySlug/:subSubCategorySlug',
    name: 'SubSubCategoryPage',
    component: SubSubCategoryPage,
    beforeEnter: (to, from, next) => {
      if(index.getters.getCollections.includes(to.params.categorySlug.replaceAll('-', ' ')) 
      && index.getters.getDocuments[to.params.categorySlug.replaceAll('-', '_')].includes(to.params.subCategorySlug.replaceAll('-', ' ')) 
      && index.getters.getSubCollections[to.params.subCategorySlug.replaceAll('-', '_')].includes(to.params.subSubCategorySlug.replaceAll('-', ' '))) {
        next()
      } else {
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/search/:searchSlug',
    name: 'SearchPage',
    component: SearchPage,
    props: true
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: NotFound
  }
]


const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
