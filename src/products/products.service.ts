import { Injectable,HttpException,HttpStatus, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //uses default repository
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { CreateproductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import {Product} from'./product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product)private productRepository:Repository<Product>){
    }
    private findProductId(id:number){
        return this.productRepository.findOne({where:{id}});
    }
    private returnNotFound(){
        return new HttpException("Producto no encontrado",HttpStatus.NOT_FOUND); 
    }

    async getPaginatedProducts(page:number,limit:number){
        const paginatedProducts= (await (paginate(this.productRepository,{page,limit}))).items;
        return paginatedProducts;
    }

    async createProduct(product:CreateproductDto){

        const findProduct=await this.productRepository.findOne({where:{nombre:product.nombre}});
        if(findProduct){
            return new HttpException('Producto con ese nombre ya existe',HttpStatus.CONFLICT);
        }
        const newProduct=this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }
     getProducts(){
        const findProducts= this.productRepository.find();
        return findProducts;
    }
    async getProduct(id:number){
        const findProduct=await this.findProductId(id);
        if(findProduct){
            return findProduct;
        }
        return this.returnNotFound();
    }
    async deleteProduct(id:number){
        const deleteResult=await this.productRepository.delete(id);
        if(deleteResult.affected===0)
            return this.returnNotFound();
        return deleteResult;
    }
          
    
    async updateProduct(id:number,product:UpdateProductDto){
        const findProduct=await this.findProductId(id);
        if(findProduct)
            return this.productRepository.update({id},product);
        
        return this.returnNotFound();
    }
}
