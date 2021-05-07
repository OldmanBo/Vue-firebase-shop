import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogs: [
      {
          title: 'Giveaway to celebrate 20 years!',
          text: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, recusandae? Sint at perspiciatis nesciunt rem commodi, omnis facilis dolor delectus, eum ipsam ','Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum nesciunt tenetur nobis asperiores commodi aliquam ipsam quis odio rerum. Voluptate, nemo asperiores pariatur dolore libero aut quisquam! Aspernatur, quidem non earum, illo voluptatem ab hic odit nemo tenetur officiis maxime atque debitis excepturi voluptatibus ullam beatae laudantium, reprehenderit iusto iure!'],
          slug: 'giveaway-to-celebrate-20-years',
          img: 'giveaway'
      },
      {
          title: 'Work hours changes due to the holiday season',
          slug: 'work-hours-change',
          img: 'work_hours_change',
          text: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, recusandae? Sint at perspiciatis nesciunt rem commodi, omnis facilis dolor delectus, eum ipsam excepturi deserunt ratione suscipit eligendi, iure velit eius quibusdam soluta ipsam, natus veniam qui itaque. Ptenetur, totam necessitatibus pariatur neque maxime hic quibusdam ?']
      },
      {
          title: 'Holiday season discounts',
          slug: 'holiday-sesaon-discounts',
          img: 'holiday_season_discounts',
          text: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ut tenetur, totam necessitatibus pariatur neque maxime hic quibusdam soluta ipsam, natus veniam qui itaque aspernatur ex architecto obcaecati voluptatem officiis deserunt ratione suscipit eligendi, iure velit eius. tenetur, totam necessitatibus pariatur neque maxime hic quibusdam ?']
      }
    ],
    allProducts: [],
    shopCart: [],
    searchItems: [],
    collectionOptions:['pc and components', 'laptops and tablets'],
    documentOptions: {
      pc_and_components: ['pc', 'components', 'cables', 'software'],
      laptops_and_tablets: ['laptops', 'laptop gear', 'tablets', 'tablet gear']
    },
    subCollectionOptions:{
      laptops: ['gaming', 'notebook'],
      laptop_gear: ['bags and backpacks', 'laptop chargers', 'laptop cooler pads'],
      tablet_gear: ['bags and backpacks', 'tablet chargers'],
      tablets: ['tablets'],
      pc: ['desktop', 'workstation'],
      components: ['cpu', 'gpu', 'hdd', 'motherboard'],
      cables: ['video', 'audio'],
      software: ['operating system', 'antivirus']
    },
    productSlugs: { 
      product_slugs : [
      "laptop-charger-2xl2-2m-80",
      "tablet-fire",
      "tablet-bag-storm",
      "laptop-charger-2xl2s-18-85",
      "7l8qntxgyzeyessf43sd",
      "gl-storm",
      "bdsrwqjvt0jv05ltph96",
      "cbca8l8ox4w162jjpx1j",
      "e061tduxvwub4k3wxmdf",
      "bag-sky",
      "backpack-fire",
      "gidkpx4bc5dq4hb57i4k",
      "gqude0niebae8eeolxly",
      "tablet-storm",
      "k9crrp81nqriojwlitsw",
      "l0pt5nk4elpqhyvcnh91",
      "menb05pelgl7uxxgruhl",
      "mugitslun5cdbabriv78",
      "qbfslml8duud79huika7",
      "nb-water",
      "tablet-charger-65-22-2w",
      "styqcu9ut01raazsiybl",
      "sid81a3zjkqz0btxmvpm",
      "x0pds1bi4ey9bn8yyfwy",
      "zeawpkqiysajfxmh55fm",
      "znhktoy2kakvokrztkvx",
      "laptop-cooling-pad-fire-15-150",
      "tablet-charger-60-2-2w",
      "inuu0dvt4xxovfvqq9j9",
      "jrnmneithzcuvfpom74n",
      "gl-earth",
      "backpack-water",
      "mvjf93370h3dfor8mx1i",
      "laptop-cooling-pad-storm-16-160",
      "tablet-charger-60-15-2w",
      "bag-fire",
      "tablet-water",
      "gl-fire",
      "shru4qar8lfaedfhrxoi",
      "ti62jebu3tarypaospum",
      "gl-water",
      "uhdyydfovbqvtl7ujjvq",
      "tablet-bag-shadow",
      "wgdvevkahio2lmwaxdqx",
      "yd1lzkmopvx8s0jaad57",
      "tablet-bag-water"
    ]
  }
  },
  getters: {
    getProductSlugs: state => {
      return state.productSlugs
    },
    getCollections: state => {
      return state.collectionOptions
    },
    getDocuments: state => {
      return state.documentOptions
    },
    getSubCollections: state => {
      return state.subCollectionOptions
    },
    getAllProducts: state => {
      return state.allProducts
    },
    searchitems: state => {
      return state.searchItems
    },
    subCategories: state => {
      return state.subCollectionOptions
    },
    categories: state => {
      return state.documentOptions
    },
    parentCategories: state => {
      return state.collectionOptions
    },
    sendBlogs: state => {
      return state.blogs
    },
    numberOfCartItems: state => {
      return state.shopCart
    }
  },
  mutations: {
    pushProductSlugs: (state, slugsArray) => {
      state.productSlugs = slugsArray
    },
    pushAllProducts: (state, product) => {
      state.allProducts.push(product)
    },
    pushSearchItems: (state, itemsArray) => {
      state.searchItems = itemsArray
    },
    pushToCart: (state, productId) => {
      state.shopCart.push(productId)
    },
    removeFromCart: (state, productIndex) => {
      state.shopCart.splice(productIndex, 1)
    },
    clearCart: (state) => {
      state.shopCart = []
    }
  },
  actions: {
  },
  modules: {
  }
})
