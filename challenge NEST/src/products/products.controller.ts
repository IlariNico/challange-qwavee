import { Body, Controller,Param ,Post,Get,ParseIntPipe, Delete, HttpException , Query, Put } from '@nestjs/common';


import { CreateproductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { isNumber } from 'class-validator';


@Controller('productos') //in the code i use the classes names in english but i specify the endpoint in spanish as peer the requirements
export class ProductsController {
    constructor(private productService:ProductsService){
    }

    @Post() 
    createProduct(@Body() newProduct:CreateproductDto):Promise<Product|HttpException>{
        return this.productService.createProduct(newProduct);
    }

    @Get()
    getProducts(@Query('page') page,@Query('limit') limit):Promise<Product[]|HttpException>{
        let resultado;
        page=parseInt(page);
        limit=parseInt(limit);
        if(((isNumber(limit)&&isNumber(page)))){
            resultado= this.productService.getPaginatedProducts(page,limit);
        }
        else{
            resultado= this.productService.getProducts();
        }
        return resultado;
    }
    
    @Get(':id')
    getProduct(@Param('id',ParseIntPipe) id:number):Promise<Product|HttpException>{
        return this.productService.getProduct(id);
    }
    
    @Delete(':id')
    deleteProduct(@Param('id',ParseIntPipe) id:number):Promise<Product|HttpException>{
        return this.productService.deleteProduct(id);
    }
    
    @Put(':id')
    updateProduct(@Param('id',ParseIntPipe) id:number,@Body() updatedProduct:UpdateProductDto):Promise<Product|HttpException>{
        return this.productService.updateProduct(id,updatedProduct);
    }
}
