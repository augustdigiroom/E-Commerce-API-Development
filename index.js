const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//[SECTION] Routes
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

// [SECTION] Environment Setup
require('dotenv').config(); 

const app = express();

// Connecting to MongoDB Atlas
mongoose.connect(process.env.MONGODB_STRING);

// If the connection is successful, output in the console
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

// Setup for allowing the server to handle data from requests
// Allows your app to read json data
app.use(express.json());
// Allows your app to read data from forms
app.use(express.urlencoded({extended:true}));

// You can also customize the CORS options to meet your specific requirements
const corsOptions = {
	// Allow request from this origin (the client's URL) the origin is in array form if there are multiple origins
	origin: ['http://localhost:8000'],
	// Allow only specified HTTP methods, optional only if you want to restrict the methods
	// methods: ['GET', 'POST'],

	// Allow only specified headers, optional only if you want to restrict headers
	// allowedHeaders: ['Content-Type', 'Authorization'],

	// Allows crendentials (e.g. cookies, authorization headers)
	credentials: true,

	// Provides status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//[SECTION] Backend Routes 
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

if(require.main === module){
	app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${process.env.PORT || 3000}`));
}

module.exports = {app,mongoose};