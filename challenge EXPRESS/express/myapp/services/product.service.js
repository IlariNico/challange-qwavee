var mysql=require('mysql2/promise');
class ProductService{
    
    constructor(){
        
        this.pool=mysql.createPool({
            host:'localhost',
            user:'root',
            password:'',
            database:'njs_challenge_db'
        });
    
    }
    
    async createProduct(product){
        if(await this.verifyProduct(product)){
            
            const con=await this.pool.getConnection();
            try {
                con.execute("INSERT INTO `product`( `nombre`, `precio`, `descripcion`) VALUES (?,?,?)",[product.nombre,product.precio,product.descripcion]);
            } catch (error) {
                console.log(error)
            }
            con.release();
            return product;
        }
        else{
            return undefined;
        }
    }

    async getProduct(id){
        const con=await this.pool.getConnection();
        let product=undefined;
        try {
            product=await con.execute('SELECT * FROM product WHERE id=?',[id]);
            product=product[0];
        } catch (error) {
            console.log(error)
        }
        con.release();
        if(product.length>0)
            return product;
        else
            return undefined;
    }

    async getProducts(){
        const con=await this.pool.getConnection();
        let products=undefined;
        try {
            products=await con.query('SELECT * FROM product');
            products=products[0];
        } catch (error) {
            console.log(error);
        }
        con.release();
        return products;
    }

    async validateName(nombre){
        const con=await this.pool.getConnection();
        let findProduct;
        try {
            findProduct=await con.execute("SELECT * FROM `product` WHERE `nombre`= ?",[nombre]);
            
        } catch (error) {
            console.log(error)
        }
        con.release();
        return ((typeof(nombre)=='string')&&(nombre.length>4)&&(findProduct[0].length===0));
    }

    async updateProduct(id,data){
        let product=await this.getProduct(id);
        if(product.length>0){
            if(await this.verifyProduct(data)){
                let con=await this.pool.getConnection()
                try {
                    con.execute('UPDATE `product` SET `nombre`=?,`precio`=?,`descripcion`=? WHERE `id`=?',[data.nombre,data.precio,data.descripcion,id]);
                } catch (error) {
                    console.log(error);
                }
                con.release();
                return await this.getProduct(id);
            }
        }
        else return undefined;
    }

    async deleteProduct(id){
        const findProduct=await this.getProduct(id);
        if(findProduct!=undefined){
            let con=await this.pool.getConnection();
            try {
                con.execute('DELETE FROM product WHERE id=?',[id]);
            } catch (error) {
                console.log(error);
            }
            con.release();
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