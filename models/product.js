const { getDB } = require('../utils/database');

module.exports = class Product {
    constructor(prodTitle, prodImage, prodPrice, prodDesc) {
        this.title = prodTitle,
        this.image = prodImage,
        this.description = prodDesc,
        this.price = prodPrice
    }

    save() {
        const db = getDB();
        return db.collection('products').insertOne(this)
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    static fetchAll() {
        const db = getDB();
       return db.collection('products').find().toArray()
           .then(products => {
               return products;
           })
           .catch(err => console.log(err))
    }

    static getById(id, callback) {
        const product = products.find(prod => prod.id == id);
        callback(product);
    }

    static deleteById(id) {
        
    }

}