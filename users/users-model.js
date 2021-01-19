const db = require('../data/dbconfig.js');

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
    console.log("Adding user!")
    return db('users').insert(user);
     
}

function findById(id) {
    return db('users')
    .where({id})
    .first();
}