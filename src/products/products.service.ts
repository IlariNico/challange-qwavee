import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //uses default repository
import { paginate } from 'nestjs-typeorm-paginate';
import { Not, Repository } from 'typeorm';

import { CreateproductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  private findProductId(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  private returnNotFound() {
    return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
  }

  async createProduct(product: CreateproductDto) {
    const findProduct = await this.productRepository.findOne({
      where: { nombre: product.nombre },
    });
    if (findProduct) {
      return new HttpException(
        'Producto con ese nombre ya existe',
        HttpStatus.CONFLICT,
      );
    }
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }
  getProducts() {
    const findProducts = this.productRepository.find();
    return findProducts;
  }

  async getPaginatedProducts(page: number, limit: number) {
    const paginatedProducts = (
      await paginate(this.productRepository, { page, limit })
    ).items;
    return paginatedProducts
  }

  async getProduct(id: number) {
    let result;
    const findProduct = await this.findProductId(id);
    if (findProduct) {
      result= findProduct;
    }
    else{
      result=this.returnNotFound();
    } 
    return result;
  }

  async deleteProduct(id: number) {
    let result;
    const productToDelete=await this.findProductId(id);
    const deleteResult = await this.productRepository.delete(id);
    
    if (deleteResult.affected === 0) {
      
      result= this.returnNotFound();
    }
    else{
      
      result=productToDelete;
    } 
    return result;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    
    const findProduct = await this.findProductId(id);
    let result=null;
    if (findProduct) {
      if(Object.keys(product).length>0){
        if(product.nombre!=undefined){
          
          const duplicatedNameProduct=await this.productRepository.findOne({where:{nombre:product.nombre,id:Not(id)}});
          if(duplicatedNameProduct){
            result=new HttpException("nombre duplicado",HttpStatus.CONFLICT);
          }
        }
        if(result===null){
          result=await this.productRepository.update({ id }, product);
          result = await this.findProductId(id);
          
        }
      }
      else{
        return new HttpException("no se puede modificar sin parámetros",HttpStatus.BAD_REQUEST);
      }
    }
    else{
      result= this.returnNotFound();
    }
    return result;
  }
}
