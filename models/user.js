// Mongoose Code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
                quantity: {type: Number, required: true}
            }
        ]
    },

});

//AddToCart
userSchema.methods.addToCart = function (product) {

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}

// Remove from Cart
userSchema.methods.removeFromCart = function (productId) {
    const updatedCart = this.cart.items.filter(prod => {
        return prod._id.toString() !== productId.toString();
    })
    this.cart = updatedCart;
    return this.save();
}
// Clear cart after order
userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}

module.exports = mongoose.model('User', userSchema);


// MongoDB Code
/*
const {getDB} = require("../utils/database");
const ObjectId = require('mongodb').ObjectId;
class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }
    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }
    addToCart(product) {
        const existingCart = this.cart ? this.cart.items : [];
        const cartProductIndex = existingCart.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...existingCart];

        if (cartProductIndex >= 0) {
            newQuantity = existingCart[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity
        } else {
            updatedCartItems.push({
               productId: ObjectId(product._id),
               quantity: newQuantity
            });
        }

        const updatedCart = { items: updatedCartItems };
        const db = getDB();
        return db.collection('users').updateOne({ _id: ObjectId(this._id) }, {$set: { cart: updatedCart }});
    }

    getCart() {
        const db = getDB();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });

        return db.collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
                });
            });
    }

    deleteItemFromCart(productId) {
        const updatedCart = this.cart.items.filter(item => {
           return item.productId.toString() !== productId.toString();
        });
        const db = getDB();
        return db.collection('users')
            .updateOne({ _id: ObjectId(this._id) }, { $set: { cart: { items: updatedCart } } });
    }
    addOrder() {
        const db = getDB();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: ObjectId(this._id),
                    name: this.name,
                    email: this.email,
                }
            };
            return db.collection('orders').insertOne(order)
        })
        .then(result => {
            // Cleared user's cart object
            this.cart = { items: [] };
            // cleared cart from database
            return db.collection('users').updateOne({ _id: ObjectId(this._id) }, { $set: { cart: { items: [] } } });
        });
    }

    getOrder() {
        const db = getDB();
        // 'user._id' for nested element match.
        return db.collection('orders').find({'user._id': ObjectId(this._id)}).toArray()
    }

    static findUserById(userId) {
        const db = getDB();
        return db.collection('users').findOne({_id: ObjectId(userId)})
            .then(user => {
                console.log(user);
                return user
            })
            .catch(err => {
                console.log(err);
            })
    }
}
module.exports = User;

 */