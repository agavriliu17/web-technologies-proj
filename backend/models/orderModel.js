const { v4: uuidv4 } = require('uuid');
const { getClient } = require('../databasePG');

function findOrders(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('SELECT id, id_user, id_service, date::timestamp::date, status FROM orders', (err, res) => {
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
        client.query('INSERT INTO orders VALUES ($1, $2, $3, $4, $5)', 
            [newOrder.id, newOrder.idUser, newOrder.idService, newOrder.date, newOrder.status],
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

function findOrderById(id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('SELECT id, id_user, id_service, date::timestamp::date, status FROM orders WHERE id = $1', [id], (err, res) => {
            if(!err){
                console.log('Transaction successful!');
                resolve(res.rows[0]);
            }
            else if(err.code == '22P02'){
                console.log('Invalid UUID format');
                resolve('invalid format');
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

function updateOrder(order, id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('UPDATE orders SET id_user = $1, id_service = $2, date = $3, status = $4 WHERE id = $5',
            [order.idUser, order.idService, order.date, order.status, id],
            (err, res) => {
                if(!err){
                    console.log('Transaction successful!');
                    resolve(order);
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

function deleteOrder(id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('DELETE FROM orders WHERE id = $1', [id], (err, res) => {
            if(!err){
                console.log('Deleted successfully!');
                resolve('deleted');
            }
            else{
                resolve(null);
                console.log('Error on delete!');
            }
            client.end();
        });
    });
}

function findOrdersForUser(id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(
            'SELECT u.name, o.date::date, s.name as serviceName, o.status FROM users u INNER JOIN orders o ON o.id_user = u.id INNER JOIN services s ON o.id_service = s.id WHERE u.id = $1;',
            [id],
            (err, res) =>{
                if(!err){
                    console.log('Transaction successful!');
                    console.log()
                    resolve(res.rows);
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
    findOrderById,
    updateOrder,
    deleteOrder,
    findOrdersForUser,
}