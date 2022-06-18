const names = ['John', 'Nick', 'Rick', 'Dan', 'Martin', 'Geremmy', 'Jack', 'Juan'];
const { v4: uuidv4 } = require('uuid')
const { getClient } = require('../databasePG')

//User model class
class User{
    constructor(id, nickname, name, password, email){
        this.id = id
        this.name = name
        this.nickname = nickname
        this.password = password
        this.email = email
    }
}

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
        client.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5)', [newUser.id, newUser.nickname, newUser.name, newUser.password, newUser.email], (err, res) => {
            if(!err){
                console.log('Transaction successful!')
            }
            else{
                console.log(err.stack)
            }
            client.end()
        })
        resolve(newUser)
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
                console.log(err.stack)
                resolve(null)
            }
            client.end()
        })

    })
}

module.exports = {
    findAll,
    insertUser,
    findUserByNickname
}