import express from 'express';
import ProductManager from './managers/product.manager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('./products.json');

app.get('/products', async(req, res)=>{
    try {
       const products = await productManager.getProducts();
       res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/products/:idProduct', async(req, res)=>{
    try {
        const { idProduct } = req.params;
        const product = await productManager.getProductById(Number(idProduct));
        if(product){
            res.json(product)
        } else {
            res.status(400).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/products', async(req, res)=>{
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const product = {
            title,
            description, 
            price,
            thumbnail,
            code,
            stock,
        }
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.listen(8080, () => {
    console.log('server is ok')
})