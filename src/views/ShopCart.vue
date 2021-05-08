<template>
  <div class="shop_cart_page">
      <h1>Your Shopping Cart</h1>
      <table>
          <tr>
              <th> </th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove Product</th>
          </tr>
          <tr v-for="(product, index) in shopCartProducts" :key="product + index + 'cart'">
              <td>{{ index + 1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.discount }}%</td>
              <td><input class="product_quantity" type="number" v-model="product.quantity"></td>
              <td>{{ (product.price - (product.price * product.discount / 100)) * product.quantity}}</td>
              <td class="remove_cart_product" @click="removeCartProduct(index)"><strong class="removeX">X</strong></td>
          </tr>
          <tr>
              <td colspan="5">TOTAL</td>
              <td colspan="2">{{ totalPrice }}</td>
          </tr>
      </table>
      <form class="customer_info_form" @submit.prevent="buyProducts">
          <h2>Please fill out all input fields</h2>
          <div>
              <label for="cName">Your full name:</label>
              <input type="text" name="cName" placeholder="John Doe" v-model="order.customerInfo.name" required>
          </div>
          <div>
              <label for="cCity">City:</label>
              <input type="text" name="cCity" placeholder="City" v-model="order.customerInfo.city" required>
          </div>
          <div>
              <label for="cAddress">Your home/shipping address</label>
              <input type="text" name="cAddress" placeholder="street name, number" v-model="order.customerInfo.address" required>
          </div>
          <div>
              <label for="cEmail">Your email:</label>
              <input type="email" name="cEmail" placeholder="asd@email" v-model="order.customerInfo.email" required>
          </div>
          <div>
              <label for="cPhone">Yoyur phone number:</label>
              <input type="number" name="cPhone" placeholder="000123123" v-model="order.customerInfo.phone" required>
          </div>
          <div>
              <label for="cPayment">Your payment method</label>
              <select name="cPayment" v-model="order.customerInfo.payment" required>
                    <option value="credit card">credit card</option>
                    <option value="cash on delivery">cash on delivery</option>
                    <option value="postNet">postNet</option>
              </select>
          </div>
          <button class="buy_btn">Order</button>
      </form>

      <div class="order_notificaiton_modal" v-if="orderModal">
          <p>Your order has been recieved. After our sales team books it, you will recieve a confirmation email and a full receipt with estemated delivery time. <span>Thank you for buying at Bobo inc.</span></p>
          <button @click="finishOrder">OK - return to the site</button>
      </div>

  </div>
</template>

<script>
import { realtimeFirestore } from '../firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    data() {
        return {
            shopCartProducts: [],
            totalProductPrice: 0,
            orderModal: false,
            order: {
                customerInfo: {
                    name: '',
                    city: '',
                    address: '',
                    email: '',
                    phone: '',
                    payment: ''
                },
                order_id: '',
                products: [
                    
                ]
            },
            customerName: '',
            customerCity: '',
            customerAddress: '',
            cutomerEmail: '',
            customerPhone: '',
            custmerPayment: ''
        }
    },
    methods: {
        finishOrder() {
            this.orderModal = false
            this.shopCartProducts = []
            this.$store.commit('clearCart')
            this.customerName =  '',
            this.customerCity =  '',
            this.customerAddress =  '',
            this.cutomerEmail =  '',
            this.customerPhone =  '',
            this.custmerPayment =  ''
            this.$router.push({ name: 'Index' })
        },
        removeCartProduct(productIndex) {
            this.$store.commit('removeFromCart', productIndex)
            this.shopCartProducts.splice(productIndex, 1)
        },
        buyProducts() {
            this.order.products = []
            this.shopCartProducts.forEach(prod => {
                let product = {
                    product_id: prod.product_id,
                    quantity: prod.quantity
                }
                this.order.products.push(product)
            })
            realtimeFirestore.collection('orders').add(
                this.order
            )
            .then(docRef => {
                docRef.update({
                    order_id: docRef.id
                })
                console.log(docRef.id + ' is submitted')
                this.order.order_id = docRef.id
            })
            .then(() => {
                this.orderModal = true
                console.log('This object is submited to the database ')
                console.log(this.order)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
        totalPrice() {
            this.totalProductPrice = 0
            this.shopCartProducts.forEach(product => {
                this.totalProductPrice = this.totalProductPrice + (product.price - (product.price * product.discount / 100)) * product.quantity
            })
            return this.totalProductPrice
        }
    },
    created() {
        this.$store.getters.numberOfCartItems.forEach(item => {
            realtimeFirestore.collection('products').doc(item).get()
            .then(doc => {
                let product = doc.data()
                product.quantity = 1
                this.shopCartProducts.push(product)
            })
        })
    }
}
</script>

<style>
.shop_cart_page {
    padding: 20px 17%;
    text-align: center;
}
.shop_cart_page table {
    margin: auto;
    border: 1px solid black;
    border-spacing: 0;
}
.shop_cart_page table, .shop_cart_page table td, .shop_cart_page table th  {
    border: 1px solid black;
}
.shop_cart_page table td, .shop_cart_page table th {
    padding: 4px;
}
.shop_cart_page table input[text] {
    background: none;
    border: none;
}
.product_quantity {
    max-width: 25px;
    text-align: center;
}
.removeX {
    color: red;
    display: inline-block;
}
.remove_cart_product:hover .removeX {
    transform: scale(1.4);
}
.remove_cart_product:hover {
    background: rgba(238, 130, 130, 0.288);
}
.remove_cart_product {
    cursor: pointer;
}

.customer_info_form {
    text-align: left;
    margin: 15px auto;
    padding: 5px;
    display: inline-block;
    border: 2px solid black;
}
.customer_info_form > div {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 5px;
    border-bottom: 1px solid lightgrey;
}
.customer_info_form h2 {
    text-align: center;
}
.buy_btn {
    display: block;
    margin: 20px auto 5px auto;
    font-size: 1.2rem;
    padding: 5px;
    background: #347B98;
    color: hsl(197, 50%, 95%);
    border: 1px solid #1A3E4C;
    border-radius: 5px;
    cursor: pointer;
}
.buy_btn:hover {
    outline: 2px ridge #E4F1F6;
    outline-offset: -4px;
}

.order_notificaiton_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.685);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.order_notificaiton_modal p {
    font-size: 2rem;
    max-width: 600px;
    background: #E4F1F6;
    color: rgb(27, 26, 77);
    padding: 15px;
    margin: 0 5% 50px 5%;
    border: 2px solid rgb(27, 26, 77);
    border-radius: 5px;
    box-shadow: 0 0 40px 5px rgba(29, 26, 190, 0.705);
}
.order_notificaiton_modal span {
    display: block;    
    margin: 15px 0;
}
.order_notificaiton_modal button {
    font-size: 1.2rem;
    background: #E4F1F6;
    color: rgb(27, 26, 77);
    border: 2px solid rgb(27, 26, 77);
    border-radius: 10px;
    padding: 7px;
    display: block;
    box-shadow: 0 0 10px 5px rgba(29, 26, 190, 0.705);
    transition: background 150ms ease-in, box-shadow 150ms ease-in;
    cursor: pointer;
}
.order_notificaiton_modal button:hover {
    background: rgb(207, 207, 211);
    box-shadow: 0 0 20px 5px rgba(29, 26, 190, 0.705);
}

</style>