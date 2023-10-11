import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //uses default repository
import { Repository } from 'typeorm';
import { CreateproductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import {Product} from'./product.entity';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product)private productRepository:Repository<Product>){
    }
    createProduct(product:CreateproductDto){
        const newProduct=this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }
     getProducts(){
        const findProducts= this.productRepository.find();
        return findProducts;
    }
    getProduct(id:number){
        const findProduct=this.productRepository.findOne({
            where:{
                id
            }
        });
        return findProduct;
    }
    async deleteProduct(id:number){
        const findProduct=await this.productRepository.findOne({
            where:{
                id
            }
        });
        this.productRepository.remove(findProduct);
        return findProduct;
    }
    updateProduct(id:number,product:UpdateProductDto){
        return this.productRepository.update({id},product);
    }
}
