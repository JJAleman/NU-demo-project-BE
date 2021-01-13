const db = require('../data/db.config.js');

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db('users').select('id', 'email', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    // console.log("IN MODEL USER:", user)
    return db('users').insert(user)
     
}

function findById(id) {
    // console.log("IN FIND BY ID:", id)
    return db('users')
    .where("id", id)
    .first();
}