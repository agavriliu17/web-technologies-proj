const { findUserById } = require('../models/userModel');
const { findServiceById } = require('../models/serviceModel');
const Order = require('../models/orderModel');
const { getPostData } = require("../utils");
const { HEADERS } = require("../resources/constants");

async function getOrders(req, res){
    try {
        const orders = await Order.findOrders();
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(orders));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function addOrder(req, res){
    try {
        const body = await getPostData(req);
        let { id_user, id_service, date, status } = JSON.parse(body);
        if(!verifyUserAndService(id_user, id_service)){
            res.writeHead(400, HEADERS);
            return res.end(
                JSON.stringify({ message: "User or Service with this id does not exist!" })
            );
        }
        if(typeof status === 'undefined'){
            status = 'pending'; //Default status
        }
        const order = {
            idUser : id_user,
            idService : id_service,
            date,
            status
        };
        const newOrder = await Order.insertOrder(order);
        if (newOrder === null) {
            res.writeHead(400, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong: Order not added" })
            );
        }
        res.writeHead(201, HEADERS);
        return res.end(JSON.stringify(newOrder));

    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function getOrderById(req, res, id){
    try {
        const order = await Order.findOrderById(id);
        if(order === 'invalid format'){
            res.writeHead(400, HEADERS);
            res.end(JSON.stringify({ message: "Wrong id format" }));
        }
        else if(order === null){
            res.writeHead(400, HEADERS);
            res.end(JSON.stringify({ message: "Something went wrong!" }));
        }
        else{
            res.writeHead(200, HEADERS);
            res.end(JSON.stringify(order));
        }
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function updateOrder(req, res, id){
    try {
        const order = await Order.findOrderById(id);
        if(!order){
            res.writeHead(400, HEADERS);
            return res.end(JSON.stringify({ message: "Order not updated: no order with such id!" }));
        }
        else if(order === 'invalid format'){
            res.writeHead(400, HEADERS);
            return res.end(JSON.stringify({ message: "Order not updated: wrong id format!" }));
        }
        const body = await getPostData(req);
        const { id_user, id_service, date, status } = JSON.parse(body);
        if(!verifyUserAndService(id_user, id_service)){
            res.writeHead(400, HEADERS);
            return res.end(
                JSON.stringify({ message: "User or Service with this id does not exist!" })
            );
        }
        const orderInfo = {
            idUser : id_user || order.id_user,
            idService : id_service || order.id_service,
            date: date || order.date,
            status: status || order.status
        };

        const updatedOrder = await Order.updateOrder(orderInfo, id);
        if(updatedOrder === null){
            res.writeHead(400, HEADERS);
            res.end(JSON.stringify({ message: "Order not updated: something went wrong!" }));
        }
        else{
            res.writeHead(200, HEADERS);
            res.end(JSON.stringify(updatedOrder));
        }

    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function deleteOrder(req, res, id){
    try {
        const order = await Order.findOrderById(id);
        if(!order){
            res.writeHead(400, HEADERS);
            return res.end(JSON.stringify({ message: "Order not deleted: no order with such id!" }));
        }
        else if(order === 'invalid format'){
            res.writeHead(400, HEADERS);
            return res.end(JSON.stringify({ message: "Order not deleted: wrong id format!" }));
        }
        const deleteResult = await Order.deleteOrder(id);
        if(deleteResult === null){
            res.writeHead(400, HEADERS);
            res.end(JSON.stringify({ message: "Order not deleted: something went wrong!" }));
        }
        else{
            res.writeHead(200, HEADERS);
            res.end(JSON.stringify({ message: `Order ${order.id} deleted!` }));
        }
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

//Verify if user and service with the ids provided exist
async function verifyUserAndService(idUser, idService){
    const userExists = await findUserById(idUser);
    if(!userExists){
        return false;
    }
    const serviceExists = await findServiceById(idService);
    if(!serviceExists){
        return false;
    }
    return true;
}

module.exports = {
    getOrders,
    addOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
}