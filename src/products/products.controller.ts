import { Body, Controller,Param ,Post,Get,ParseIntPipe, Delete, Put, HttpException, NotFoundException, Query } from '@nestjs/common';


import { CreateproductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';


@Controller('productos') //in the code i use the classes names in english but i specify the endpoint in spanish as peer the requirements
export class ProductsController {
    constructor(private productService:ProductsService){
    }

    @Post() 
    createProduct(@Body()newProduct:CreateproductDto){
        try{
            const createdProduct=this.productService.createProduct(newProduct);
            return createdProduct;
        }catch (error) {
            if(error instanceof HttpException)
                throw new Error();
        }
    }

    @Get()
    getProducts(@Query('page')page:number,@Query('limit')limit:number){

        if((limit&&!page)||(limit&&page)){
            return this.productService.getPaginatedProducts(page,limit);
        }
            
        else
            return this.productService.getProducts();
    }
    @Get(':id')
    getProduct(@Param('id',ParseIntPipe) id:number){
        try{
            const product=this.productService.getProduct(id);
            return product;
        }
        catch(err){
            throw new Error("not found");
        }
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
