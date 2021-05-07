<template>
    <div class="admin_page">
        <h1 class="admin_page_main_title">Admin Console Page</h1>
        <div class="admin_page_all_classes">
            <h1>Add or remove product classes from the index page</h1>
            <p>Click on the <strong>Add new class</strong> button to add a new class for the index page.</p>
            <p>Click on the <strong>SHOW</strong> button to <strong>show</strong> products in the desired class.</p>
            <p>Click on the <strong>DELETE</strong> button to <strong>delete</strong> the whole class and its content from the database.(<em>Does not delete the actuall product from the database, just the product tag</em>)</p>
            <p>Click on the <strong>ADD</strong> button to <strong>add</strong> a new product to the desired class</p>
            <div class="admin_page_class-container">
                <div class="addNewClassBtn" @click="newClassModal = true">
                    <strong>Add new class</strong>
                    <p>+</p>
                </div>

                <!-- \/ Add new class to the index classes MODAL \/ -->
                <div class="add_new_class-modal" v-if="newClassModal">
                    <div>
                        <h2>Type the <strong>name</strong> of the index class</h2>
                        <input type="text" v-model="newClassName">
                        <button type="button" @click="addNewIndexClass">Add</button>
                        <p @click="newClassModal = false">+</p>
                    </div>
                </div>

                <div class="admin_page_class" v-for="(indexClass, index) in indexClasses" :key="indexClass + index">
                    <p class="admin_page_class_name">{{ indexClass }}</p>
                    <button class="adminShowBtn" type="button" @click="showClass(indexClass)">SHOW</button>
                    <button class="adminShowBtn" type="button" @click="activeClass = ''; indexProducts = []">HIDE</button>
                    <button class="adminDelBtn" type="button" @click="deleteIndexClass(indexClass, index)">DELETE</button>
                    <button class="adminAddBtn" type="button" @click="openAncpModal(indexClass)">ADD</button>

                    <!-- \/ Add new products to the index classes MODAL \/ -->
                    <div class="add_new_class_product_modal-container" v-if="ancpModal">
                        <div class="add_new_class_product_modal">
                            <h1>Add a new product to the <strong>{{ ancpClass }}</strong></h1>
                            <p>Select the product categories to show products</p>
                            <div class="productOptionField">
                                <label for="collOptions">Select parent category of the product: </label>
                                <select name="collOptions" v-model="selectedIndexCollection">
                                    <option :value="colOpt" v-for="(colOpt, index) in collectionOptions" :key="colOpt + index" 
                                    @click="selectedIndexSubCollection = ''; selectedIndexDocument = ''">
                                        {{colOpt}}
                                    </option>
                                </select>
                            </div>
                            <div class="productOptionField" v-if="selectedIndexCollection">
                                <label for="docOptions">Select product category: </label>
                                <select name="docOptions" v-model="selectedIndexDocument">
                                    <option :value="docOpt" v-for="(docOpt, docIndex) in documentOptions[selectedIndexCollection.replaceAll(' ', '_').replaceAll('-','_')]" 
                                    :key="docOpt + docIndex"
                                    @click="selectedIndexSubCollection = ''">
                                        {{docOpt}}
                                    </option>
                                </select>
                            </div>
                            <div class="productOptionField" v-if="selectedIndexDocument">
                                <label for="subColOptions">Select product subcategory: </label>
                                <select name="subColOptions" v-model="selectedIndexSubCollection">
                                    <option :value="subColOpt" 
                                    v-for="(subColOpt, subColIndex) in subCollectionOptions[selectedIndexDocument.replaceAll('-','_').replaceAll(' ', '_')]" 
                                    :key="subColOpt + subColIndex">
                                        {{subColOpt}}
                                    </option>
                                </select>
                            </div>
                            <button type="button" @click="showAvailableIndexClassProducts" v-if="selectedIndexCollection">Show products</button>
                            <div class="ancp_products">
                                <div class="admin_page_product" v-for="(ap, apIndex) in ancpFilteredProucts" :key="ap + apIndex">
                                    <h4>{{ap.name}}</h4>
                                    <p class="ap_product_info" v-for="(apInfo, apKey) in ap" :key="apKey">{{apKey}}: {{apInfo}}</p>
                                    <button type="button" class="ancp_add_btn" @click="addProductIndexClass(ap.product_id, apIndex)">ADD</button>
                                    <p>Click <strong>ADD</strong> button to <strong>add</strong> product to the class</p>
                                </div>
                            </div>
                        </div>
                        <button class="close_ancp_modal_btn" @click="ancpModal = false">close</button>
                    </div>

                </div>
            </div>
            <h3>Showing products from the <strong>{{activeClass}}</strong> index class</h3>
            <div class="admin_page_products-container" v-if="indexProducts !== []">
                <div class="admin_page_product" v-for="(apProduct, productIndex) in indexProducts" :key="apProduct + productIndex">
                    <h4>{{apProduct.name}}</h4>
                    <p class="ap_product_info" v-for="(apInfo, apKey) in apProduct" :key="apKey">{{apKey}}: {{apInfo}}</p>
                    <br><br>
                    <p class="ap_product_remove_info">Remove product from the from the <strong>{{activeClass}}</strong> class</p>
                    <button type="button" @click="removeProductClass(apProduct.product_id, productIndex)">REMOVE</button>
                </div>
            </div>
        </div>

        <div class="search_products">
            <h2>Search all products in order to EDIT or DELETE them.</h2>
            <p>Select product options to search the database</p>
            <div class="productOptionField">
                <label for="collOptions">Select parent category of the product: </label>
                <select name="collOptions" v-model="selectedIndexCollection">
                    <option :value="colOpt" v-for="(colOpt, index) in collectionOptions" :key="colOpt + index" 
                    @click="selectedIndexSubCollection = ''; selectedIndexDocument = ''">
                        {{colOpt}}
                    </option>
                </select>
            </div>
            <div class="productOptionField" v-if="selectedIndexCollection">
                <label for="docOptions">Select product category: </label>
                <select name="docOptions" v-model="selectedIndexDocument">
                    <option :value="docOpt" v-for="(docOpt, docIndex) in documentOptions[selectedIndexCollection.replaceAll(' ', '_').replaceAll('-','_')]" 
                    :key="docOpt + docIndex"
                    @click="selectedIndexSubCollection = ''">
                        {{docOpt}}
                    </option>
                </select>
            </div>
            <div class="productOptionField" v-if="selectedIndexDocument">
                <label for="subColOptions">Select product subcategory: </label>
                <select name="subColOptions" v-model="selectedIndexSubCollection">
                    <option :value="subColOpt" 
                    v-for="(subColOpt, subColIndex) in subCollectionOptions[selectedIndexDocument.replaceAll('-','_').replaceAll(' ', '_')]" 
                    :key="subColOpt + subColIndex">
                        {{subColOpt}}
                    </option>
                </select>
            </div>
            <button type="button" @click="showAvailableIndexClassProducts" v-if="selectedIndexCollection">SEARCH</button>
            <div class="ancp_products">
                <div class="admin_page_product" v-for="(ap, apIndex) in ancpFilteredProucts" :key="ap + apIndex">
                    <h4>{{ap.name}}</h4>
                    <p class="ap_product_info" v-for="(apInfo, apKey) in ap" :key="apKey">{{apKey}}: {{apInfo}}</p>
                    <br><br>
                    <button type="button" @click="deleteProductFromDB(ap.product_id, apIndex)">DELETE</button>
                    <button type="button" @click="productToBeEdited = ap; editProductModal = true">Edit Product</button>
                </div>
            </div>
            
            <div class="edit_product_modal" v-if="editProductModal">
                <div class="admin_page_product">
                    <h4>{{productToBeEdited.name}}</h4>
                    <div v-for="(apInfo, apKey) in productToBeEdited" :key="apKey">
                        <label :for="apKey + 'edit'">{{apKey}}</label>
                        <input :name="apKey + 'edit'" class="ap_product_info" v-model="productToBeEdited[apKey]" :disabled="apKey === 'slug' || apKey === 'product_id'">
                    </div>
                    <br><br>
                    <button type="button" @click="editProduct">EDIT</button>
                    <button type="button" @click="editProductModal = false">Exit Edit Product</button>
                </div>
            </div>
        </div>

        <!-- Add new product to the database -->
        <div class="addProductOptions">
            <h1>Section dedicated to adding new products to the database</h1>
            <p>As you select options the console will expand</p>
            <div class="productOptionField">
                <label for="collOptions">Select parent category of the product: </label>
                <select name="collOptions" v-model="selectedCollection">
                    <option :value="colOpt" v-for="(colOpt, index) in collectionOptions" :key="colOpt + index" 
                    @click="selectedSubCollection = ''; selectedDocument = ''; resetProductFields()">
                        {{colOpt}}
                    </option>
                </select>
                <p class="productSelectOption" v-if="selectedCollection">Parent category of the product: <strong>{{ selectedCollection }}</strong></p>
            </div>
            <div class="productOptionField" v-if="selectedCollection">
                <label for="docOptions">Select product category: </label>
                <select name="docOptions" v-model="selectedDocument">
                    <option :value="docOpt" v-for="(docOpt, docIndex) in documentOptions[selectedCollection.replaceAll(' ', '_')]" 
                    :key="docOpt + docIndex"
                    @click="selectedSubCollection = ''; resetProductFields()">
                        {{docOpt}}
                    </option>
                </select>
                <p class="productSelectOption" v-if="selectedDocument">Product category: <strong>{{ selectedDocument }}</strong></p>
            </div>
            <div class="productOptionField" v-if="selectedDocument">
                <label for="subColOptions">Select product subcategory: </label>
                <select name="subColOptions" v-model="selectedSubCollection">
                    <option :value="subColOpt" 
                    v-for="(subColOpt, subColIndex) in subCollectionOptions[selectedDocument.replaceAll(' ','_')]" 
                    :key="subColOpt + subColIndex" 
                    @click="resetProductFields">
                        {{subColOpt}}
                    </option>
                </select>
                <p class="productSelectOption">Product subcategory: <strong>{{ selectedSubCollection }}</strong></p>
            </div>
        </div>
        <div class="add_product-container" v-if="selectedSubCollection">
            <form>
                <div class="add_product_field">
                    <label for="product_name">Product name:</label>
                    <input type="text" name="product_name" v-model="product.name">
                </div>
                <div class="add_product_field">
                    <label for="product_type">Product type:</label>
                    <input type="text" name="product_type" v-model="product.product">
                </div>
                <div class="add_product_field">
                    <label for="price">Product price($):</label>
                    <input type="number" step="0.1" name="price" v-model.number="product.price">
                </div>
                <div class="add_product_field">
                    <label for="discount">Product discount(%):</label>
                    <input type="number" step="1" name="discount" v-model.number="product.discount">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'bags and backpacks'">
                    <label for="color">Product color:</label>
                    <input type="text" name="color" v-model="product.color">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'bags and backpacks'">
                    <label for="carry_capacity">Bag/Backpack carry capacity(laptop/tablet screen size in inches):</label>
                    <input type="number" step="0.1" name="carry_capacity" v-model.number="product.carry_capacity">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'laptop chargers' || selectedSubCollection === 'tablet chargers' || selectedSubCollection === 'video' || selectedSubCollection === 'audio'">
                    <label for="cable_length">Cable length(meters):</label>
                    <input type="number" step="0.1" name="cable_length" v-model.number="product.cable_length">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'laptop chargers' || selectedSubCollection === 'tablet chargers' || selectedSubCollection === 'video' || selectedSubCollection === 'audio'">
                    <label for="connector">Connector type:</label>
                    <input type="text" name="connector" v-model="product.connector">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'laptop chargers' || selectedSubCollection === 'tablet chargers'">
                    <label for="power_output">Power output(wats):</label>
                    <input type="number" step="0.1" name="power_output" v-model.number="product.power_output">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'laptop cooler pads'">
                    <label for="fan_size">Fan size(milimeters):</label>
                    <input type="number" step="0.1" name="fan_size" v-model.number="product.fan_size">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'laptop cooler pads'">
                    <label for="fan_speed">Fan speed(rpm):</label>
                    <input type="number" step="0.1" name="fan_speed" v-model.number="product.fan_speed">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'laptop cooler pads'">
                    <label for="laptop_size_support">The pad supports laptop sizes up to (inches):</label>
                    <input type="number" step="0.1" name="laptop_size_support" v-model.number="product.laptop_size_support">
                </div>
                <div class="add_product_field" v-if="selectedDocument === 'laptops'  || selectedDocument === 'pc'">
                    <label for="cpu">CPU:</label>
                    <input type="text" name="cpu" v-model="product.cpu">
                </div>
                <div class="add_product_field" v-if="selectedDocument === 'laptops' || selectedDocument === 'pc'">
                    <label for="gpu">GPU:</label>
                    <input type="text" name="gpu" v-model="product.gpu">
                </div>
                <div class="add_product_field" v-if="selectedDocument === 'laptops' || selectedDocument === 'tablets' || selectedDocument === 'pc'">
                    <label for="hdd">HDD(Gb):</label>
                    <input type="number" step="0.1" name="hdd" v-model.number="product.hdd">
                </div>
                <div class="add_product_field" v-if="selectedDocument === 'laptops' || selectedDocument === 'tablets'">
                    <label for="screen_size">Screen size(inches):</label>
                    <input type="number" step="0.1" name="screen_size" v-model.number="product.screen_size">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'cpu' ||selectedSubCollection === 'gpu'">
                    <label for="chipManufcturer">Manufacturer:</label>
                    <input type="text" name="chipManufcturer" v-model="product.manufacturer">
                </div>
                <div class="add_product_field" v-if="selectedDocument === 'pc'">
                    <label for="mb">Motherboard:</label>
                    <input type="text" name="mb" v-model="product.motherboard">
                </div>
                <div class="add_product_field" v-if="selectedDocument === 'pc'">
                    <label for="ps">Power supply:</label>
                    <input type="text" name="ps" v-model="product.power_supply">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'cpu'">
                    <label for="cpu_speed">CPU speed(GHz):</label>
                    <input type="number" step="0.1" name="cpu_speed" v-model.number="product.cpu_speed">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'cpu'">
                    <label for="cpu_turbo">Turbo speed(GHz):</label>
                    <input type="number" step="0.1" name="cpu_turbo" v-model.number="product.cpu_turbo">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'cpu'">
                    <label for="cpu_cache">CPU cache memory(MB):</label>
                    <input type="number" step="1" name="cpu_cache" v-model.number="product.cpu_cache">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'gpu'">
                    <label for="gpuMem">GPU memory(GB):</label>
                    <input type="number" step="1" name="gpuMem" v-model.number="product.gpu_memory">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'gpu'">
                    <label for="gpu_speed">GPU speed(GHz):</label>
                    <input type="number" step="0.1" name="gpu_speed" v-model.number="product.gpu_speed">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'hdd'">
                    <label for="hdd_capacity">HDD memory(GB):</label>
                    <input type="number" step="100" name="hdd_capacity" v-model.number="product.hdd_capacity">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'hdd'">
                    <label for="hdd_rpm">HDD rpm:</label>
                    <input type="number" step="100" name="hdd_rpm" v-model.number="product.hdd_rpm">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'hdd'">
                    <label for="hdd_buffer">HDD buffer:</label>
                    <input type="number" step="2" name="hdd_buffer" v-model.number="product.hdd_buffer">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'motherboard'">
                    <label for="chipset">Chipset:</label>
                    <input type="text" name="chipset" v-model="product.chipset">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'motherboard'">
                    <label for="socket">Socket(add supported sockets):</label>
                    <input type="text" name="socket" v-model="tempSocket">
                    <button type="button" @click="pushMbSocket">Add</button>
                    <p>Supported sockets: {{ product.socket }}</p>
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'motherboard'">
                    <label for="max_ram">Max ram memory supported:</label>
                    <input type="number" step="1" name="max_ram" v-model.number="product.max_ram">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'antivirus'">
                    <label for="av_manufacturer">manufacturer:</label>
                    <input type="text" name="av_manufacturer" v-model="product.av_manufacturer">
                </div>
                <div class="add_product_field" v-if="selectedSubCollection === 'operating system'">
                    <label for="os_manufacturer">Manufacturer:</label>
                    <input type="text" name="os_manufacturer" v-model="product.os_manufacturer">
                </div>
                <div class="addProductBtn-container">
                    <span>Add new product to the database: </span>
                    <button @click.prevent="addNewProduct">Add</button>
                </div>
            </form>
        </div>

        <!-- Product added to the database MODAL -->
        <div class="product_added_modal" v-if="productSubmitted">
            <div class="addedProduct-container">
                <h3>Product <strong>{{product.name}}</strong> added to the database</h3>
                <div v-for="(pr, pIndex) in product" :key="pr + pIndex">
                    <p v-if="pr">{{pIndex}}: {{ pr }}</p>
                </div>
                <button type="button" @click="closeModal">+</button>
            </div>
        </div>
    </div>
</template>

<script>
import { realtimeFirestore } from '../firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    data() {
        return{
            productSubmitted: false,
            newClassModal: false,
            newClassName: '',
            tempSocket: '',
            productToBeEdited: {},
            editProductModal: false,
            newProduct: {},
            product: {
                name: null,
                product: null,
                slug: null,
                price: null,
                discount: null,
                collection: null,
                product_category: null,
                product_subcategory: null,
                color: null,
                carry_capacity: null,
                cable_length: null,
                connector: null,
                power_output: null,
                fan_size: null,
                fan_speed: null,
                laptop_size_support: null,
                cpu: null,
                gpu: null,
                hdd: null,
                screen_size: null,
                motherboard: null,
                power_supply: null,
                cpu_speed: null,
                cpu_cache: null,
                cpu_turbo: null,
                manufacturer: null,
                gpu_speed: null,
                gpu_memory: null,
                hdd_capacity: null,
                hdd_rpm: null,
                hdd_buffer: null,
                socket: [],
                max_ram: null,
                chipset: null,
                os_manufacturer: null,
                av_manufacturer: null
            },
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
            productsDatabase: [],
            searchCollection: '',
            searchDocument: '',
            searchSubColection: '',
            selectedCollection: '',
            selectedDocument: '',
            selectedSubCollection: '',
            selectedIndexCollection: '',
            selectedIndexDocument: '',
            selectedIndexSubCollection: '',
            products: [],
            indexProducts: [],
            indexClasses: [],
            productsToBeRemovedFromIndexClass: [],
            activeClass: '',
            ancpModal: false,
            ancpClass: '',
            ancpProducts: [],
            ancpIndexProducts:[],
            ancpFilteredProucts: []
        }
    },
    methods: {
        editProduct() {
            realtimeFirestore.collection('products').doc(this.productToBeEdited.product_id).set(this.productToBeEdited)
            .then(() => {
                console.log("success")
                alert('Product successfully edited')
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteProductFromDB(id, index) {
            realtimeFirestore.collection('products').doc(id).delete()
            .then(() => {
                console.log(id + ' deleted')
                this.ancpFilteredProucts.splice(index, 1)
                realtimeFirestore.collection('product slugs').doc('product slugs').update({
                    product_slugs: firebase.firestore.FieldValue.arrayRemove(id.toLowerCase())
                })
            })
        },
        pushMbSocket () {
            this.product.socket.push(this.tempSocket);
            this.tempSocket = '';
        },
        addNewProduct() {
            for (let key in this.product) {
                if(Array.isArray(this.product[key])) {
                    console.log(this.product[key] + ' is an array')
                    if(this.product[key].length > 0) {
                        this.newProduct[key] = this.product[key]
                    }
                } else {
                    if(this.product[key] !== null) {
                        console.log(this.product[key] + ' is NOT an array')
                        this.newProduct[key] = this.product[key]
                    }     
                }
            }
            this.newProduct.collection = this.selectedCollection
            this.newProduct.product_category = this.selectedDocument
            this.newProduct.product_subcategory = this.selectedSubCollection
            
            console.log(this.newProduct)
            realtimeFirestore.collection('products').add(
                this.newProduct
            )
            .then(docRef => {
                docRef.update({
                    product_id: docRef.id,
                    slug: docRef.id.toLowerCase()
                })
                realtimeFirestore.collection('product slugs').doc('product slugs').update({
                    product_slugs: firebase.firestore.FieldValue.arrayUnion(docRef.id.toLowerCase())
                })
                this.productSubmitted = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        addNewIndexClass() {
            realtimeFirestore.collection('index classes').doc(this.newClassName).set({
            })
            .then(() => {
                console.log(this.newClassName + ' is submitted to the database index classes')
                this.newClassModal = false
                this.$router.go()
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteIndexClass(indexClass, indexIndex) {
            console.log(indexClass)
            realtimeFirestore.collection('products').where('index_classes', 'array-contains', indexClass).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.productsToBeRemovedFromIndexClass.push(doc.id)
                })
                console.log(this.productsToBeRemovedFromIndexClass)
            })
            .then(() => {
                this.productsToBeRemovedFromIndexClass.forEach(docID => {
                    realtimeFirestore.collection('products').doc(docID).update({
                        index_classes: firebase.firestore.FieldValue.arrayRemove(indexClass)
                    })
                })
            })
            .then(() => {
                realtimeFirestore.collection('index classes').doc(indexClass).delete()
                .then(() => {
                    console.log('document: ' + indexClass + ' deleted')
                    this.indexClasses.splice(indexIndex, 1)
                })
            })

        },
        // pop-up modal to notify that the product has been pushed to the database
        closeModal() {
            this.selectedCollection = null,
            this.selectedDocument = null,
            this.selectedSubCollection = null
            for(let key in this.product) {
                if(key === 'socket') {
                    this.product.socket = []
                } else
                this.product[key] = null
            }
            this.productSubmitted = false
        },
        resetProductFields() {
            for(let key in this.product) {
                if (key === 'socket') {
                    this.product.socket = []
                } else
                this.product[key] = null
            }
        },
        showClass(par) {
                if(this.activeClass !== par) {
                    this.activeClass = par
                    this.indexProducts = []
                    realtimeFirestore.collection('products').where('index_classes', 'array-contains', par).get()
                    .then(qSnap => {
                        qSnap.forEach(doc => {
                            this.indexProducts.push(doc.data())
                        })
                    })
                } else {
                    console.log('error because' + this.activeClass + '=' + par)
                }
        },
        removeProductClass(par, index) {
            console.log(par + ' ' + this.activeClass + index)
            let docRef = realtimeFirestore.collection('products').doc(par)
            docRef.update({
                index_classes: firebase.firestore.FieldValue.arrayRemove(this.activeClass)
            })
            .then(() => {
                this.indexProducts.splice(index, 1)
            })
        },
        addProductIndexClass(docID, docIndex) {
            console.log(this.ancpClass)
            realtimeFirestore.collection('products').doc(docID).update({
                index_classes: firebase.firestore.FieldValue.arrayUnion(this.ancpClass)
            })
            .then(() => {
                this.ancpFilteredProucts.splice(docIndex, 1)
                console.log(this.ancpClass + 'class added to the ' + docID)
            })
        },
        openAncpModal(par) {
            this.ancpModal = true
            this.ancpClass = par
            this.selectedIndexCollection = ''
            this.selectedIndexDocument = ''
            this.selectedIndexSubCollection= ''
            realtimeFirestore.collection('products').where('index_classes', 'array-contains', par).get()
            .then(qSnap => {
                qSnap.forEach(doc => {
                    this.ancpIndexProducts.push(doc.data())
                })
                console.log(this.ancpIndexProducts)
            })
        },
        showAvailableIndexClassProducts() {
            this.ancpFilteredProucts = []
            this.ancpProducts = []
            if(this.selectedIndexCollection !== '' && this.selectedIndexDocument !== '' && this.selectedIndexSubCollection !== '') {
                console.log('fetching items from product_subcategory ' + this.selectedIndexSubCollection + ' => fetching items from product_category ' + this.selectedIndexDocument + ' => fetching items from collection ' + this.selectedIndexCollection)
                realtimeFirestore.collection('products')
                .where('product_subcategory', '==', this.selectedIndexSubCollection)
                .where('product_category', '==', this.selectedIndexDocument)
                .where('collection', '==', this.selectedIndexCollection).get()
                .then(qSnap => {
                    qSnap.forEach(doc => {
                        this.ancpProducts.push(doc.data())
                    })
                })
                .then(() => {
                    console.log(this.ancpProducts)
                    this.ancpFilteredProucts = this.ancpProducts.filter(ap => !this.ancpIndexProducts.some(ip => ip.product_id === ap.product_id))
                })
                .then(() => {
                    console.log(this.ancpFilteredProucts)
                })
                .catch(err => {
                    console.log('Failed to retrieve product information, ERROR: ' + err)
                })
            } else if(this.selectedIndexCollection !== '' && this.selectedIndexDocument !== '' && this.selectedIndexSubCollection === '') {
                console.log('fetching items from' + this.selectedIndexDocument + ' => fetching items from collection ' + this.selectedIndexCollection)
                realtimeFirestore.collection('products')
                .where('product_category', '==', this.selectedIndexDocument)
                .where('collection', '==', this.selectedIndexCollection).get()
                .then(qSnap => {
                    qSnap.forEach(doc => {
                        this.ancpProducts.push(doc.data())
                    })
                })
                .then(() => {
                    console.log(this.ancpProducts)
                    this.ancpFilteredProucts = this.ancpProducts.filter(ap => !this.ancpIndexProducts.some(ip => ip.product_id === ap.product_id))
                })
                .then(() => {
                    console.log(this.ancpFilteredProucts)
                })
                .catch(err => {
                    console.log('Failed to retrieve product information, ERROR: ' + err)
                })
            } else if(this.selectedIndexCollection !== '' && this.selectedIndexDocument === '' && this.selectedIndexSubCollection === '') {
                console.log('fetching items from' + this.selectedIndexCollection)
                realtimeFirestore.collection('products').where('collection', '==', this.selectedIndexCollection).get()
                .then(qSnap => {
                    qSnap.forEach(doc => {
                        this.ancpProducts.push(doc.data())
                    })
                })
                .then(() => {
                    console.log(this.ancpProducts)
                    this.ancpFilteredProucts = this.ancpProducts.filter(ap => !this.ancpIndexProducts.some(ip => ip.product_id === ap.product_id))
                })
                .then(() => {
                    console.log(this.ancpFilteredProucts)
                })
                .catch(err => {
                    console.log('Failed to retrieve product information, ERROR: ' + err)
                })
            }
            this.selectedIndexCollection = ''
            this.selectedIndexDocument = ''
            this.selectedIndexSubCollection = ''
        }
    },
    created() {
        realtimeFirestore.collection('index classes').get()
        .then(snap => {
            snap.forEach(doc => {
                let classId = doc.id
                this.indexClasses.push(classId)
            })
        })
    }
}
</script>

<style>
.admin_page {
    padding: 30px 100px;
    background: rgb(199, 200, 201);
}
.admin_page_main_title {
    text-align: center;
    font-size: 4rem;
}
.admin_page h1 {
    padding: 20px 4px;
}
.admin_page_class-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
.admin_page_all_classes {
    border-bottom: 2px solid black ;
    padding-bottom: 50px;
}

/* Modals */
.add_new_class-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.add_new_class-modal div {
    padding: 40px;
    background: skyblue;
    text-align: center;
    position: relative;
}
.add_new_class-modal p {
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 1.2rem;
    transform: rotate(45deg);
    padding: 0 3px;
    cursor: pointer;
}
.add_new_class-modal p:hover {
    transform: rotate(45deg) scale(1.3, 1.3);
}
.add_new_class-modal h2 {
    margin-bottom: 40px;
}
.add_new_class-modal input {
    font-size: 1.2rem;
    margin-bottom: 15px;
}
.add_new_class-modal button {
    display: block;
    margin: auto;
    font-size: 1.2rem;
    padding: 5px;
}
.add_new_class_product_modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3);    
}
.close_ancp_modal_btn {
    font-size: 1.2rem;
    position: absolute;
    top: 5px;
    right: 15px;
}
.add_new_class-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.733);
}
.add_new_class_product_modal {
    position: absolute;
    top: 50%;
    left: 50%;
    right: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
    width: 70%;
    background: skyblue;
    text-align: center;
    overflow: auto;
}
.add_new_class_product_modal .productOptionField {
    margin-right: auto;
    margin-left: auto;
}
.ancp_products {
    display: flex;
    flex-wrap: wrap;
}

.product_added_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.733);
}
.addedProduct-container button {
    position: absolute;
    font-size: 1.2rem;
    padding: 0;
    transform: rotate(45deg);
    width: 30px;
    height: 30px;
    border-radius: 100%;
    top: 7px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
}
.addedProduct-container button:focus {
    transform: rotate(45deg) scale(1.3);
    outline: none;
}
.addedProduct-container button:hover {
    transform: rotate(45deg) scale(1.23);
}
.addedProduct-container {
    position: absolute;
    width: 500px;
    padding: 40px 70px;
    top: 50%;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    background: skyblue;
}
.addedProduct-container h3 {
    text-align: center;
    margin-bottom: 50px;
}
/* Modals */

.addNewClassBtn {
    width: 150px;
    min-height: 100%;
    background: rgb(37, 119, 151);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 15px 15px 0px 0;
}
.addNewClassBtn:hover {
    border: 4px solid rgb(29, 91, 116);
    background: rgba(37, 119, 151, 0.76);
}
.addNewClassBtn p {
    display: none;
    color: rgb(18, 0, 136);
}
.addNewClassBtn:hover p{
    display: block;
    font-size: 4rem;
}
.addNewClassBtn:hover strong {
    display: none;
}
.admin_page_class {
    padding: 10px;
    border: 1px solid grey;
    background: skyblue;
    text-align: center;
    width: 300px;
    margin: 15px 15px 0px 0;
}
.admin_page_class_name {
    text-transform: uppercase;
    margin: 5px;
}
.admin_page_class button {
    padding: 7px;
    font-weight: bold;
}
.adminShowBtn, .adminDelBtn {
    margin-right: 15px;
}


.admin_page_products-container {
    display: flex;
    flex-wrap: wrap;
}
.admin_page_product {
    padding: 5px;
    margin: 10px;
    width: 300px;
    border: 1px solid black;
    position: relative;
}
.admin_page_product p, h4 {
    margin-top: 5px;
}
.admin_page_product .ap_product_remove_info {
    text-align: center;
}

.admin_page_product h4 {
    text-align: center;
}
.admin_page_product button {
    display: block;
    position: relative;
    right: 50%;
    left: 50%;
    transform: translatex(-50%);
    margin-top: 15px;
    padding: 5px;
    font-weight: bold;
}

.productOptionField, .add_product_field {
    padding: 5px;
    margin: 5px 0;
    border-bottom: 1px solid black;
    width: 40%;
    max-width: 500px;
    min-width: 400px;
}
.add_product-container {
    margin-top: 30px;
    border-top: 3px solid black;
    max-width: 600px;
}
.add_product_field input {
    margin-left: 10px;
}
input[type='number'] {
    -moz-appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.addProductOptions {
    margin-top: 60px;
    margin-bottom: 150px;
}

.addProductBtn-container {
    margin-top: 30px;
}
.addProductBtn-container span {
    font-size: 1.2rem;
    font-weight: bold;
}
.addProductBtn-container button {
    font-size: 1.2rem;
    padding: 5px 15px;
    background: skyblue;
    border: none;
    border-radius: 10px;
}

.search_products {
    margin-top: 150px;
    padding-bottom: 100px;
    border-bottom: 2px solid black ;
}
.edit_product_modal {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(9, 40, 70, 0.664);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.edit_product_modal .admin_page_product {
    background: rgb(22, 94, 167);
    padding: 60px 20px;
    width: 400px;
}
.edit_product_modal .admin_page_product div {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
</style>