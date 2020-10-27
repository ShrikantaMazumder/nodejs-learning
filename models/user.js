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