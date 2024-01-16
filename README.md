# ShopSphere

ShopSphere is a web application that allows users to create and manage their own online store. Users can create their own store, add products to their store, and manage their store's inventory. Users can also purchase products from other users' stores.

## Getting Started

### Prerequisites

*Node.js* - Download and install Node.js from https://nodejs.org/en/download/

*MongoDB* - Download and install MongoDB from https://www.mongodb.com/download-center/community

### Installing

1. Clone the repository
```
git clone https://github.com/AryanGandotra/ShopSphere.git
```

2. Install dependencies
```
npm install
```

3. Start the server
```
npm start
```

4. Open http://localhost:3000 in your browser

## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Express](https://expressjs.com/) - Web framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
* [Passport](http://www.passportjs.org/) - Authentication middleware
* [Bootstrap](https://getbootstrap.com/) - Front-end component library
* [EJS](https://ejs.co/) - Templating engine


## Folder Structure

```
.
├── index.js
├── Views
│   ├── Auth
│   ├── cart
│   ├── checkout
│   ├── fav
│   ├── orderHistory
│   ├── partials
│   ├── products
│   └── home.ejs
├── Utils
│   └── catchAsync.js
├── controllers
│   └── users.js
├── models
│   ├── cart.js
│   ├── order.js
│   ├── store.js
│   └── user.js
├── package.json
├── package-lock.json
├── public
│   ├── css
│   │   ├── base.css
│   │   ├── cart.css
│   │   ├── checkout.css
│   │   ├── home.css
│   │   ├── login.css
│   │   ├── new.css
│   │   ├── orderHistory.css
│   │   ├── show.css
│   │   ├── signUp.css
│   │   └── stars.css
│   ├── images
│   │   ├── banner.png
│   │   ├── login.jpg
│   │   ├── logo.png
│   │   ├── shopping-bag.png
│   │   └── signup.png
│   └── js
│       ├── formValidation.js
│       └── orderHistory.js
├── middleware.js
├── README.md
├── Demo
│   ├── cart.js
│   ├── order.js
│   ├── store.js
│   └── user.js
├── routes
│   ├── cart.js
│   ├── checkout.js
│   ├── fav.js
│   ├── login.js
│   ├── logout.js
│   ├── orderHistory.js
│   ├── products.js
│   └── products.js

```

## Demo

### Home Page
![Home Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Home%20Page-1.png)

![Home Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Home%20Page-2.png)

![Home Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Home%20Page-3.png)

### Product Page
![Product Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Product%20Page%20(Admin%20Panel).png)

### Cart Page
![Cart Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Cart.png)

### Login Page
![User Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Login%20Page.png)

### Sign Up Page
![User Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/SignUp%20Page.png)

### My Orders Page
![User Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Order%20History.png)

### Invoice
![User Page](https://github.com/AryanGandotra/ShopSphere/blob/main/Demo/Invoice.png)


## Contribution

1. Contributions are welcome! Please feel free to submit a Pull Request.
2. Please create an issue for any new feature requests/bugs.
3. Pull requests will be merged after being reviewed.
