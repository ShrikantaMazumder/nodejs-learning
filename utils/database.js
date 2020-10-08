const {MongoClient} = require('mongodb');

let _db;

const mongoConnect = callback => {
    const uri = "mongodb+srv://mongo-auth:T1s5L63J1XnsIiZG@cluster0.gbyyk.mongodb.net/basic-node?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true,
        useUnifiedTopology: true });
    client.connect()
    .then(res => {
        console.log('Database connected');
        _db = res.db();
        callback();
    })
    .catch( err => {
        console.log(err);
        throw err;
    });
}

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found.';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;



