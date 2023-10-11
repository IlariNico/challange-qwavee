import { Body, Controller,Param ,Post,Get,ParseIntPipe, Delete, Put } from '@nestjs/common';

import { CreateproductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('productos') //in the code i use the classes names in english but i specify the endpoint in spanish as peer the requirements
export class ProductsController {
    constructor(private productService:ProductsService){
    }

    @Post() //default endpoint products
    createProduct(@Body()newProduct:CreateproductDto):Promise<Product>{
        return this.productService.createProduct(newProduct);
    }
    @Get()
    getProducts():Promise<Product[]>{
        return this.productService.getProducts();
    }
    @Get(':id')
    getProduct(@Param('id',ParseIntPipe) id:number):Promise<Product>{
        return this.productService.getProduct(id);
    }
    @Delete(':id')
    deleteProduct(@Param('id',ParseIntPipe)id:number){
        return this.productService.deleteProduct(id);
    }
    @Put(':id')
    updateProduct(@Param('id',ParseIntPipe)id:number,@Body()updatedProduct:UpdateProductDto){
        return this.productService.updateProduct(id,updatedProduct);
    }
}
