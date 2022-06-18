const { equal } = require('assert')
const http = require('http')
const { getUsers, getUser, postUser, getUserByNickname } = require('./controllers/userController')

const server = http.createServer((req, res) => {
    if(req.url === '/welcome'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('<h1 style = "text-align:center">Welcome!</h1>')
    }
    else if(req.url === '/api/v1/users' && req.method === 'GET'){ //Get all users, path: /api/v1/users
        getUsers(req, res)
    }
    else if(req.url  === '/api/v1/users' && req.method === 'POST'){ //Add user, path: /api/v1/users
        //Not final
        postUser(req, res)
    }
    else if(req.url.match(/\/api\/v1\/users\/([0-9]+)/) && req.method === 'GET'){ //Get user by id, path: /api/v1/users/{id}
        let id = req.url.split('/')[4]
        //TODO
        //getUserById(req, res, id)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('<h1 style = "text-align:center">Welcome!</h1>')
    }
    else if(req.url.match(/\/api\/v1\/users\/nickname=([a-zA-Z0-9_.\(\)]+$)/) && req.method === 'GET'){ //Get user by nickname, path: /api/v1/users/nickname={nickname}
        let info = req.url.split('/')[4]
        let nickname = info.split('=')[1]
        getUserByNickname(req, res, nickname)
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('<h2 style = "text-align:center">Unknown request!</h2>')
    }
    
})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))