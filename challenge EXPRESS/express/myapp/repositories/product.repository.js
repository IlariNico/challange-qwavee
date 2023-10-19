var mysql=require('mysql2/promise');
class ProductRepository{

    constructor(){
        this.pool=mysql.createPool({
            host:'localhost',
            user:'root',
            password:'',
            database:'njs_challenge_db'
        });
    }

    async createProduct(product){
        const con=await this.pool.getConnection();
        try {
            await con.execute("INSERT INTO `product`( `nombre`, `precio`, `descripcion`) VALUES (?,?,?)",[product.nombre,product.precio,product.descripcion]);
            product=await this.getByName(product.nombre);
        } catch (error) {
            console.log(error)
        }
        con.release();
        return product;
    }

    async getProduct(id){
        const con=await this.pool.getConnection();
        let product;
        try {
            product=await con.execute('SELECT * FROM product WHERE id=?',[id]);
            product=product[0];
        } catch (error) {
            console.log(error)
        }
        con.release();
        return product;
    }

    async getProducts(){
        const con=await this.pool.getConnection();
        let products;
        try {
            products=await con.query('SELECT * FROM product');
            products=products[0];
        } catch (error) {
            console.log(error);
        }
        con.release();
        return products;
    }

    async updateProduct(id,data){
        let con=await this.pool.getConnection()
        try {
            con.execute('UPDATE `product` SET `nombre`=?,`precio`=?,`descripcion`=? WHERE `id`=?',[data.nombre,data.precio,data.descripcion,id]);
        } catch (error) {
            console.log(error);
        }
        con.release();
        return await this.getProduct(id);
    }

    async deleteProduct(id){
        let con=await this.pool.getConnection();
        try {
            con.execute('DELETE FROM product WHERE id=?',[id]);
        } catch (error) {
            console.log(error);
        }
        con.release();
    }

    async getByName(nombre){
        const con=await this.pool.getConnection();
        let findProduct;
        try {
            findProduct=await con.execute("SELECT * FROM `product` WHERE `nombre`= ?",[nombre]);
            
        } catch (error) {
            console.log(error)
        }
        con.release();
        if(findProduct[0].length>0)
            return findProduct[0];
        else
            return undefined;
    }
}
module.exports=new ProductRepository();