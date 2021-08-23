# pc-shop
#### Working carousels
<img src='/showcase_gif_files/Example1.gif' width= 1000px>  

#### Blogs
<img src='/showcase_gif_files/Example2.gif' width= 1000px>  

#### Navigation and product sorting
<img src='/showcase_gif_files/Example3.gif' width= 1000px>  

#### Product filtering
<img src='/showcase_gif_files/Example5.gif' width= 1000px>  

#### Product rating and comments    
    - The comments are stored in the firebase database
<img src='/showcase_gif_files/Example4.gif' width= 1000px> 

#### Shop cart      
    - The order goes to firebase database
<img src='/showcase_gif_files/Example6.gif' width= 1000px>  

#### Adding new products to the database
<img src='/showcase_gif_files/Example7.gif' width= 1000px>  

#### Adding new sale classes for the home page
<img src='/showcase_gif_files/Example8.gif' width= 1000px>  

#### Editing and deleting products
<img src='/showcase_gif_files/Example9.gif' width= 1000px>  


# IMPORTANT
    This is not my web design, i have taken the template from a local pc shop and tried to add some more life to it with animations and transition efefcts.
    After adding a new product from the admin console, you should add a JPG image in the "assets" folder, and name that image after the product ID(the ID will be shown after the product addition).
    Otherwise, it will show the deafult "No image" image.

    Furthermore, since i was not familiar with the page authentication when i made this project, there is no disctinction between the imaginary customer and the imaginary page admin.
    I have created the admin console to work on my CRUD(Create, Read, Update, Delete) skills and to get more familiar with the firebase firestore.

    An imaginary customer can use the product rating system (one can rate the products and write comments about them).
    Additionaly, there is a simple but useful shop-cart system for the product orders. 
    All these forms have some very basic form validation, because i was focused more on learning and improving my vue and firebase skills.

    The imaginary page admin can add and delete product classes for the index page (Hot Products and Discounts are the basic ones), 
    also there is the option for adding new products and deleting or edditing the existing ones. 

    Also, there is some dynamic page routing done with the use of vue router, and with the addiitonal use of navigation guards to watch for the existing and none-existing url slugs. 404 error page is also working.
    
    This is still a work in progress, and i know that there is still a lot to be learned. Hopefully, as i continue to develop my developer skills, this project will become bug free. :D

    -- Added responsiveness to accommodate smaller screens for all pages, except the admin page.
## Project setup

 To install all the needed dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
