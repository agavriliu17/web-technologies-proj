const { v4: uuidv4 } = require('uuid');
const { getClient } = require('../databasePG');

function findAll(){
    return new Promise((resolve, reject) => {
        const client = getClient()
        client.connect()
        client.query('SELECT * FROM users', (err, res) => {
            if(!err){
                console.log('Transaction successful!')
                resolve(res.rows)
            }
            else{
                console.log(`Error code: ${err.code}`)
                console.log(err.stack)
                resolve(null)
            }
            client.end()
        })
        
    })
}

function insertUser(user){
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user}
        const client = getClient()
        client.connect()
        client.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)', [newUser.id, newUser.nickname, newUser.name, newUser.password, newUser.email, newUser.isAdmin], (err, res) => {
            if(!err){
                resolve(newUser)
                console.log('Transaction successful!')
            }
            else if(err.code == 23505){
                resolve("invalid data")
            }
            else{
                resolve(null)
                console.log(`Error code: ${err.code}`)
                console.log(err.stack)
            }
            client.end()
        })
    })
}

function findUserByNickname(nickname){
    return new Promise((resolve, reject) => {
        const client = getClient()
        client.connect()
        client.query('SELECT * FROM users WHERE nickname = $1', [nickname], (err, res) => {
            if(!err){
                console.log('Transaction successful!')
                resolve(res.rows[0])
            }
            else{
                console.log(`Error code: ${err.code}`)
                console.log(err.stack)
                resolve(null)
            }
            client.end()
        })

    })
}

function findUserById(id){
    return new Promise((resolve, reject) => {
        const client = getClient()
        client.connect()
        client.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
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

function findUserByEmail(email){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
            if(!err){
                console.log('Transaction successful!');
                resolve(res.rows[0]);
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

function updateUser(user, id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query("UPDATE users SET nickname = $1, name = $2, password = $3, email = $4, isAdmin = $5 WHERE id = $6", 
            [user.nickname, user.name, user.password, user.email, user.isAdmin, id],
            (err, res) =>{
                if(!err){
                    console.log('Transaction successful!');
                    resolve(user);
                }
                else if(err.code === "23505"){
                    console.log('Duplicated value!');
                    resolve('duplicated value');
                }
                else{
                    console.log(`Error code: ${err.code}`);
                    console.log(err.stack);
                    resolve(null);
                }
                client.end();
            })
    })
}

function deleteUser(id){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query('DELETE FROM users WHERE id = $1', [id], (err, res) => {
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
    })

}

module.exports = {
    findAll,
    insertUser,
    findUserByNickname,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser,
}