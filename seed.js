const mongoose = require("mongoose");
const Products = require("./models/product");
require("dotenv").config();
const { data } = require("./data");

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
    await Products.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const product = new Products({
      name: data[i].title,
      category: data[i].category,
      description: data[i].description,
      imageUrl: data[i].image,
      price: data[i].price,
    });
    
    await product.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
