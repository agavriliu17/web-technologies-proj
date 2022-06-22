const { findUserById } = require('../models/userModel');
const { findServiceById } = require('../models/serviceModel');
const Order = require('../models/orderModel');
const { getPostData } = require("../utils");

async function getOrders(req, res){
    try {
        const orders = await Order.findOrders();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(orders));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function addOrder(req, res){
    try {
        const body = await getPostData(req);
        const { id_user, id_service, date } = JSON.parse(body);
        const userExists = await findUserById(id_user);
        if(!userExists){
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({ message: "User with provided id does not exist!" })
            );
        }
        const serviceExists = await findServiceById(id_service);
        if(!serviceExists){
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({ message: "Service with provided id does not exist!" })
            );
        }
        const order = {
            idUser : id_user,
            idService : id_service,
            date
        };
        const newOrder = await Order.insertOrder(order);
        if (newOrder === null) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({ message: "Something went wrong: Order not added" })
            );
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newOrder));

    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

module.exports = {
    getOrders,
    addOrder,
}