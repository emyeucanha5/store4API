require('dotenv').config();
require('express-async-errors');

const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const app = express();
const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;
const productsRouter = require('./routes/products');

app.use(express.json());
app.use('/api/v1/products', productsRouter);

const start = async() =>{
    try {
        await connectDB(url);
        
        app.listen(port, ()=>{
            console.log(`Server is listening to the port ${port}`);
        });        
    } catch (error) {
        console.log(error);
    }
}

app.get('/', (req,res) => {
    res.send('<h1 style = "text-align: center; padding-top:20% ">Click on <a href="/api/v1/products?limit=10&page=3">this</a></h1>');
})


app.use(errorHandlerMiddleware);
app.use(notFound);

start();