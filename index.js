const express = require('express');
const dotenv = require('dotenv');
const cors= require("cors");
const mongo = require('./connect');
const employeeRouter = require('./router/employeeRouter');
const productRouter = require('./router/productRouter');
const registerRouter = require('./router/registerRouter');
const auth = require("./modules/authmodule");


dotenv.config();
mongo.connect();
mongo.connectMongoose();


const app = express();
app.use(cors());
app.use(express.json());



app.use('/', (req,res,next) => {
   console.log("Custom Middleware");   
   next();
});
app.use('/register', registerRouter);
app.use("/", auth.authenticateUser);
app.use('/employee', employeeRouter);
app.use('/product', productRouter);


app.listen(process.env.PORT || 8000);