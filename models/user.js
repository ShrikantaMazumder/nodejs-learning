const {getDB} = require("../utils/database");
const ObjectId = require('mongodb').ObjectId;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
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