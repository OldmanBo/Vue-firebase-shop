# pc-shop

# IMPORTANT
    After adding a new product from the admin console, it is crucial to add a JPG image in the "assets" folder, and name that image after the product url slug(the slug will be shown after the product addition).
    If no image is added for the new product, the page containing that product will not work properly.

    Furthermore, since i am not that familiar with the page authentication there is no disctinction between the imaginary customer and the imaginary page admin. I have created the admin console to work on my CRUD(Create, Read, Update, Delete) skills and to get more familiar with the firebase firestore.

    An imaginary customer can use the product rating system (one can rate the products and write comments about them). Additionaly, there is a simple but useful shop-cart system for the product orders. All these forms have some very basic form validation, because i was focused more on learning and improving my vue and firebase skills.

    The imaginary page admin can add and delete product classes for the index page (Hot Products and Discounts are the basic ones), also there is the option for adding new products and deleting or edditing the existing ones. 

    Also, there is some dynamic page routing done with the use of vue router, and with the addiitonal use of route guards to watch for the existing and none-existing url slugs. 404 error page is also working.

    This is still a work in progress, and i know that there is still a lot to be learned. Hopefully, as i continue to develop my developer skills, this project will become bug free. :D

## Project setup
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
