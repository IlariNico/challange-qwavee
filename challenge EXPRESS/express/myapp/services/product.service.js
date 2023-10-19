
const productRepository=require('../repositories/product.repository')

class ProductService{
    
    
    async createProduct(product){
        
        if(await this.verifyProduct(product)){
            return await productRepository.createProduct(product);
        }
        else{
            return undefined;
        }
    }

    async getProduct(id){
        const product=await productRepository.getProduct(id);
        if(product.length>0)
            return product;
        else
            return undefined;
    }

    async getProducts(){
    const products=await productRepository.getProducts();
    if(products.length>0){
        return products;
    }
    else
    return undefined;
    }

    async validateName(nombre){
        const findProduct=await productRepository.getByName(nombre);
        
        return ((typeof(nombre)=='string')&&(nombre.length>4)&&(findProduct==undefined));
    }

    async updateProduct(id,data){
        let product=await this.getProduct(id);
        if(product!=undefined){
            if(await this.verifyProduct(data)){
                return await productRepository.updateProduct(id,data);
            }
        }
        else return undefined;
    }

    async deleteProduct(id){
        const findProduct=await this.getProduct(id);
        if(findProduct!=undefined){
            productRepository.deleteProduct(id);
            return findProduct;
        }
        else
            return undefined;
    }   

    validatePrice(precio){
        return ((typeof(precio)=='number')&&(precio>0))
    }

    validateDescription(descripcion){
        return ((typeof(descripcion)=='string')&&(descripcion.length>8)&&(descripcion.length<255))
    }

    async verifyProduct(product){
        const {nombre,precio,descripcion}=product;
        let res=await (this.validateName(nombre));
        return ((res)&&(this.validatePrice(precio))&&(this.validateDescription(descripcion)));
    }
    
}

module.exports=new ProductService();