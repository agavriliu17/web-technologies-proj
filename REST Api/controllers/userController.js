const User = require('../models/userModel')

// @desc Get all users
// @route GET api/v1/users
async function getUsers(req, res){
    try {
        const users = await User.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
    }
}

async function postUser(req, res){
    try {
        const user = {
            name: 'Andy',
            nickname: '4ndy2',
            password: 'apples',
            email: 'andy2@mail.com'
        }
        let newUser = await User.insertUser(user)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}

async function getUserByNickname(req, res, nickname){
    try {
        const user = await User.findUserByNickname(nickname)
        if(!user){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message : 'User Not Found'}))
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    postUser,
    getUserByNickname
}