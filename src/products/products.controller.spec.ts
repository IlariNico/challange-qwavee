import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductsService={
    createProduct:jest.fn(productDto=>{
      return{
        id:1,
        ...productDto
      }
    }),
    updateProduct:jest.fn((id,productDto)=>{
      const existingProduct=findProductById(id);
      const updatedProduct=Object.assign(productDto,existingProduct);
      return{
        id,...updatedProduct
      }
    }),
    getProducts:jest.fn(()=>{
      return productsData;
    }),
    getProduct:jest.fn((id)=>{
      return findProductById(id);
    }),
    deleteProduct:jest.fn((id)=>{
      const findProduct=findProductById(id);
      productsData=productsData.filter((product) => product.id !== id);
      return findProduct;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers:[ProductsService]
    }).overrideProvider(ProductsService).useValue(mockProductsService).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product',()=>{
    const pDto={nombre:'Producto prueba',precio: 33,descripcion:"una novedosa descripcion"}
    expect(controller.createProduct(pDto)).toEqual({
      id:1,
      nombre:pDto.nombre,
      precio:pDto.precio,
      descripcion:pDto.descripcion
    });
  });
  
  expect(mockProductsService.createProduct).toHaveBeenCalled;
  it('should update a product',()=>{
    const pDto={precio: 20,descripcion: 'Descripcion 1',};
    const dbDto=findProductById(1);
    const uDto=Object.assign(pDto,dbDto);
    expect(controller.updateProduct(1,pDto)).toEqual({
      ...uDto
    });
  })

  expect(mockProductsService.updateProduct).toHaveBeenCalled;

  it('should return products',()=>{
    expect(controller.getProducts(0,0)).toEqual(productsData);
  })
  expect(mockProductsService.getProducts).toHaveBeenCalled;

  it('should detelete a product',()=>{
    const sizeDb=productsData.length;
    const deletedDto={id: 2,nombre: 'Producto 2',precio: 15,descripcion: 'Descripcion 2',}
    expect(controller.deleteProduct(2)).toEqual(deletedDto);
    expect (productsData.length).toBeLessThan(sizeDb);
  })
  expect(mockProductsService.deleteProduct).toHaveBeenCalled;

  it('should return a product',()=>{
    const getDto=findProductById(1);
    expect(controller.getProduct(1)).toEqual(getDto);
  })
  expect(mockProductsService.deleteProduct).toHaveBeenCalled;
});
function findProductById(id:number) {
  return productsData.find((product) => product.id === id);
}
let productsData = [
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

