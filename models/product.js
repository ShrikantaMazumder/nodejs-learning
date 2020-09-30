const getDB = require('../utils/database').getDB;
module.exports = class Product {
    constructor(prodTitle, prodImage, prodPrice, prodDesc) {
        this.title = prodTitle,
        this.image = prodImage,
        this.description = prodDesc,
        this.price = prodPrice
    }

    save() {
        this.id = Math.random().toString();
        products.push(this);
    }

    static fetchAll() {
        return products
    }

    static getById(id, callback) {
        const product = products.find(prod => prod.id == id);
        callback(product);
    }

    static deleteById(id) {
        
    }

}