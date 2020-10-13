const { getDB } = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;

module.exports = class Product {
    constructor(prodTitle, prodImage, prodPrice, prodDesc, id) {
        this.title = prodTitle,
        this.image = prodImage,
        this.description = prodDesc,
        this.price = prodPrice,
        this._id = id
    }

    save() {
        const db = getDB();
        let dbOperation;
        if (this._id) {
            // Update product
            dbOperation = db.collection('products').updateOne({_id: ObjectId(this._id)}, {$set: this});
        } else {
            dbOperation = db.collection('products').insertOne(this)
        }
        return dbOperation
    }

    static fetchAll() {
        const db = getDB();
       return db.collection('products').find().toArray()
           .then(products => {
               return products;
           })
           .catch(err => console.log(err))
    }

    static getById(prodId) {
        const db = getDB();
        return db.collection('products').find({_id: ObjectId(prodId)}).next()
            .then(product => {
                return product;
            })
            .catch(err => console.log(err));
    }

    static deleteById(id) {
        
    }

}