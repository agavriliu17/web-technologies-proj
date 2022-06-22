const { v4: uuidv4 } = require('uuid')
const { getClient } = require('../databasePG')

function findAll(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('SELECT * FROM services', (err, res) => {
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
    })
}

function insertService(service){
    return new Promise((resolve, reject) => {
        const newService = { id: uuidv4(), ...service };
        const client = getClient();
        client.connect();
        client.query('INSERT INTO services VALUES ($1, $2, $3, $4, $5)', [newService.id, newService.name, 
            newService.description, newService.price, newService.region], (err, result) => {
                if(!err){
                    resolve(newService);
                    console.log('Transaction successful!');
                }
                else{
                    resolve(null);
                    console.log(`Error code: ${err.code}`);
                    console.log(err.stack);
                }
                client.end();
            });
    });
}

function findServiceById(id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('SELECT * FROM services WHERE id = $1', [id], (err, result) => {
            if(!err){
                console.log('Transaction successful!');
                resolve(result.rows[0]);
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

function findServicesByName(name){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query("SELECT * FROM services WHERE LOWER(name) = $1 UNION SELECT * FROM services WHERE LOWER(name) LIKE $2",
            [name.toLowerCase(), '%' + name.toLowerCase() + '%'], (err, res) => {
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

function updateService(service, id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('UPDATE services SET name = $1, description = $2, price = $3, region = $4 WHERE id = $5', 
            [service.name, service.description, service.price, service.region, id], (err, res) => {
                if(!err){
                    console.log('Transaction successful!');
                    resolve(service);
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

function deleteService(id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('DELETE FROM services WHERE id = $1', [id], (err, res) => {
            if(!err){
                console.log('Deleted successfully!');
                resolve('deleted');
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

module.exports = {
    findAll,
    insertService,
    findServiceById,
    findServicesByName,
    updateService,
    deleteService,
}