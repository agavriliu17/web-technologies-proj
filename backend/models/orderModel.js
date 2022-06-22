const { v4: uuidv4 } = require('uuid');
const { getClient } = require('../databasePG');

function findOrders(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('SELECT * FROM orders', (err, res) => {
            if(!err){
                console.log('Transaction successful!');
                resolve(res.rows);
            }
            else{
                console.log(`Error code: ${err.code}`);
                console.log(err.stack);
                resolve(null);
            }
            client.end();
        });
    });
}

function insertOrder(order){
    return new Promise((resolve, reject) => {
        const newOrder = { id: uuidv4(), ...order };
        const client = getClient();
        client.connect();
        client.query('INSERT INTO orders VALUES ($1, $2, $3, $4)', 
            [newOrder.id, newOrder.idUser, newOrder.idService, newOrder.date],
            (err, res) => {
                if(!err){
                    console.log('Transaction successful!');
                    resolve(newOrder);
                }
                else{
                    console.log(`Error code: ${err.code}`);
                    console.log(err.stack);
                    resolve(null);
                }
                client.end();
            }
        );
    });
}

module.exports = {
    findOrders,
    insertOrder,
}