// Mongoose Code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Product', productSchema);


// MongoDB Code
/*

const { getDB } = require('../utils/database');
const ObjectId = require('mongodb').ObjectId;
module.exports = class Product {
    constructor(prodTitle, prodImage, prodPrice, prodDesc, id, userId) {
        this.title = prodTitle;
        this.image = prodImage;
        this.description = prodDesc;
        this.price = prodPrice;
            this.userId = userId;
        this._id = id ? ObjectId(id) : null;

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
        const db = getDB();
        return db.collection('products').deleteOne({_id: ObjectId(id)})
            .then(res => {
                console.log("Product Destroyed");
                return res;
            })
            .catch(err => {
                console.log("Error from Model", err);
                return err;
            })
    }

}
*/
