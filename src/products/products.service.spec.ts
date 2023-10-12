import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {Product} from './product.entity'


describe('ProductsService', () => {
  let service: ProductsService;
  const mockProductRepository={
    create:jest.fn().mockImplementation(dto=>dto),
    save:jest.fn().mockImplementation((product)=>{
      database.push({id:3,...product});
      return Promise.resolve({id:3,...product})}),
    delete:jest.fn().mockImplementation( (id)=>{
      const initLength=database.length;
      const product= findProductById(id);
      database=database.filter((product)=>product.id!==id)
      const finalLength=database.length;
      const resultLength=(initLength-finalLength);
      if(resultLength<initLength){return Promise.resolve({affected:resultLength})}
      else return product
    }),
    findOne: jest.fn().mockImplementation((options) => {
      const product = database.find((p) => p.id === options.where.id);
      return Promise.resolve(product);
    })
    ,
    update:jest.fn().mockImplementation(({id},productDto)=>{
      parseInt(id, 10);
      const selectedProduct=findProductById(id);
      const updatedProduct = Object.assign({}, selectedProduct, productDto);
      database[0]=updatedProduct;
      return updatedProduct;
    }),
    find:jest.fn().mockImplementation(()=>{
      return database;
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,{
        provide:getRepositoryToken(Product),
        useValue:mockProductRepository
      }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product and return a promise',async()=>{
    const dbSize=database.length;
    const createDto={nombre: 'Producto 3',precio: 25, descripcion: 'Descripcion 3',};
    expect(await service.createProduct(createDto)).toEqual({
      id:3,...createDto
    });
    expect(dbSize).toBeLessThan(database.length);
  })
  expect(mockProductRepository.create).toHaveBeenCalled;

  it('should return the list of products',()=>{
    expect(service.getProducts()).toEqual(database);
  })
  expect(mockProductRepository.find).toHaveBeenCalled;

  it('should get a product ',async ()=>{
    const expectedProduct=database[0];
    const selectedProduct=await service.getProduct(1);
    expect(selectedProduct).toEqual(expectedProduct);
  })
  expect(mockProductRepository.findOne).toHaveBeenCalled;

  it('should update a product and return it',async ()=>{
    const updateDto={nombre:"nuevo nombre prod 1",precio:9999}
    const updatedProduct=await service.updateProduct(1,updateDto);
    expect(updatedProduct).toEqual(database[0]);
  })
  expect(mockProductRepository.update).toHaveBeenCalled;

  it('should delete a product and return it',async ()=>{
    const expectedProduct=database[0];
    const deletedProduct=await service.deleteProduct(1);
    expect(deletedProduct).toEqual(expectedProduct);
  })
  expect(mockProductRepository.delete).toHaveBeenCalled;

 
  
});
function findProductById(id:number) {
  return database.find((product) => product.id === id);
}
let database=[
  {
    id: 1,
    nombre: 'Producto 1',
    precio: 10,
    descripcion: 'Descripcion 1',
  },
  {
    id: 2,
    nombre: 'Producto 2',
    precio: 15,
    descripcion: 'Descripcion 2',
  },
];
