import fs from 'fs';

export default class ProductManager{
    constructor(path) {
        this.path = path;
    }

    async createProduct(obj){
        try {
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const productsFile = await this.getProducts();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    // async addProduct(title, description, price, thumbnail, code, stock) {
    //     const product = {
    //         id: await this.#getMaxId() + 1,
    //         title,
    //         description,
    //         price,
    //         thumbnail,
    //         code,
    //         stock
    //     };
    //     this.products.push(product);
    //     // this.saveProducts();
    // }

    // loadProductos(){
    //     try {
    //         const data = fs.readFileSync(this.path, 'utf-8');
    //         this.products = JSON.parse(data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // saveProducts(){
    //     const datos = JSON.stringify(this.products, null, 2);
    //     fs.writeFileSync(this.path, datos, 'utf-8');
    // }

    async #getMaxId() {
        let maxId = 0;
        const products = await this.getProducts();
        products.map((product) => { 
          if (product.id > maxId) maxId = product.id;                                       
        });
        return maxId;
    }
    // async #getMaxId(){
    //     let maxId = 0;
    //     this.products.map((product) => {
    //         if(product.id > maxId) maxId = product.id
    //     })
    //     return maxId;
    // }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    // async getProducts(){
    //     return this.products;
    // }

    async getProductById(id){
        try {
           const productsFile = await this.getProducts();
           const product = productsFile.find((p)=> p.id === id); 
           if(product) return product
           else return false;
        } catch (error) {
            console.log(error);
        }
    }
    // async getProductById(idProduct){
    //     const productFound = this.products.find(product => product.id === idProduct);
    //     if (productFound) {
    //         return productFound
    //     } else {
    //         return console.log('Not Found')
    //     }

    // }

    async deleteProduct(id){
        try {
            const productsFile = await this.getProducts();
            if(productsFile.length > 0){
                const newArray = productsFile.filter(product => product.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error);
        }
    }
    // async deleteProductById(idProduct){
    //     const productFounded = this.products.findIndex(product => product.id === idProduct);
    //     if (productFounded !== -1) {
    //         this.products.splice(productFounded, 1);
    //         this.saveProducts();
    //         console.log('producto eliminado')
    //     } else {
    //         console.log('Not Found')
    //     }

    // }

    async updateUser(obj, id){
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(product => product.id === id);
            if(index === -1){
                throw new Error('id not found');
            } else {
                productsFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }
    // async updateProducts(productFounded, updateFields) {
    //     if(productFounded !== -1) {
    //         const updatedProduct = { ...this.products[productFounded], ...updateFields};
    //         this.products[productFounded] = updatedProduct;
    //         this.saveProducts();
    //         console.log('producto actualizado correctamente');
    //     } else{
    //         console.log('Not Found')
    //     }
    // }
}
