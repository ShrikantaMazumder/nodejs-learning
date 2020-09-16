const products = []
module.exports = class Product {
    constructor(prodTitle, prodPrice) {
        this.title = prodTitle,
        this.price = prodPrice
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products
    }

}