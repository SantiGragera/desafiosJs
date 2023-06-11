const fs = require('fs');

class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.saveProducts();
    }

    loadProductos(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.log(error)
        }
    }

    saveProducts(){
        const datos = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, datos, 'utf-8');
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId) maxId = product.id
        })
        return maxId;
    }

    getProducts(){
        return this.products;
    }

    getProductById(idProduct){
        const productFound = this.products.find(product => product.id === idProduct);
        if (productFound) {
            return productFound
        } else {
            return console.log('Not Found')
        }

    }

    deleteProductById(idProduct){
        const productFounded = this.products.findIndex(product => product.id === idProduct);
        if (productFounded !== -1) {
            this.products.splice(productFounded, 1);
            this.saveProducts();
            console.log('producto eliminado')
        } else {
            console.log('Not Found')
        }

    }

    updateProducts(productFounded, updateFields) {
        if(productFounded !== -1) {
            const updatedProduct = { ...this.products[productFounded], ...updateFields};
            this.products[productFounded] = updatedProduct;
            this.saveProducts();
            console.log('producto actualizado correctamente');
        } else{
            console.log('Not Found')
        }
    }
}

const productManager = new ProductManager('./products.js');

productManager.addProduct('Iphone', 'Iphone 12 Pro Max de 256gb Black', 1200, './multimedia/iphone12.jfif', 2, '15');
productManager.addProduct('Samsung', 'Samsung s23 + 128gb Red', 1500, './multimedia/samsung23.webp', 5, '10');
console.log(productManager.getProducts());
// productManager.updateProducts(0, { price: 2000});
productManager.deleteProductById(2);
console.log(productManager.getProducts());
