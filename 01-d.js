const fs = require('fs');

class ProductManager {
    constructor(){
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
}

const productManager = new ProductManager();

productManager.addProduct('Iphone', 'Iphone 12 Pro Max de 256gb Black', 1200, './multimedia/iphone12.jfif', 2, '15');
productManager.addProduct('Samsung', 'Samsung s23 + 128gb Red', 1500, './multimedia/samsung23.webp', 5, '10');
console.log(productManager.getProducts());
console.log(productManager.getProductById(2));