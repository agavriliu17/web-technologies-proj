const { Client } = require('pg')

function getClient(){
    return new Client({
        host : "localhost",
        port : 5432,
        user : "developer",
        password : "developer",
        database : "serp"
    })
}

module.exports = {
    getClient
}