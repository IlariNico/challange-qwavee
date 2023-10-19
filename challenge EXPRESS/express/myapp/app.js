const express=require('express');
const app =express();
const port=3000;
const productController = require('./controllers/product.controller');

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.get('/products',productController);

app.get('/products/:id',productController);

app.post('/products',productController);

app.put('/products/:id',productController);

app.delete('/products/:id',productController);

app.listen(port,()=>{
    console.log("funciona en el puerto "+port);
})