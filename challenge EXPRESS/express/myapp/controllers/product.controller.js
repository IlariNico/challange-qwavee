const express=require('express');
const router=express.Router();
const productService=require('../services/product.service');

router.use(express.json());

router.get('/products',async (req,res)=>{
    const products=await productService.getProducts();
    res.json(products);
});

router.get('/products/:id',async (req,res)=>{
    const product=await productService.getProduct(req.params.id);
    if(product!=undefined){
        res.json(product);
    }
    else
        res.status(404).send("Revisar el id");
});

router.post('/products',async (req,res)=>{
    const product=await productService.createProduct(req.body);
    if(product!=undefined){
        res.status(201).json(product);
    }
    else{
        
        res.status(400).send("Formato incorrecto o nombre repetido");
    }
});

router.put('/products/:id',async (req,res)=>{ //for now only the same params as post, no optionals
    const updatedProduct=await productService.updateProduct(req.params.id,req.body);
    if(updatedProduct!=undefined){
        res.status(200).json(updatedProduct);
    }
    else{
        res.status(404).send("Revisar id o formato");
    }
    
})

router.delete('/products/:id',async(req,res)=>{
    const deletedProduct=await productService.deleteProduct(req.params.id);
    if(deletedProduct!=undefined){
        res.status(200).json(deletedProduct);
    }
    else{
        res.status(404).send("No encontrado revisar id");
    }
})
module.exports=router;