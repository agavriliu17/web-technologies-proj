const { HEADERS } = require("../resources/constants");
const Statistics = require("../models/statisticsModel");

async function topRegionsByOrder(req, res){
    try {
        const result = await Statistics.regionsByOrder();
        if(result === null){
            res.writeHead(500, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong!" })
            );
        }
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function topServicesByOrder(req, res){
    try {
        const result = await Statistics.servicesByOrder();
        if(result === null){
            res.writeHead(500, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong!" })
            );
        }
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function topServicesPerRegion(req, res){
    try {
        const result = await Statistics.servicesPerRegion();
        if(result === null){
            res.writeHead(500, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong!" })
            );
        }
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function topUsersByOrder(req, res){
    try {
        const result = await Statistics.usersByOrder();
        if(result === null){
            res.writeHead(500, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong!" })
            );
        }
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function totalOrders(req, res){
    try {
        const result = await Statistics.totalOrders();
        if(result === null){
            res.writeHead(500, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong!" })
            );
        }
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function totalUsers(req, res){
    try {
        const result = await Statistics.totalUsers();
        if(result === null){
            res.writeHead(500, HEADERS);
            return res.end(
                JSON.stringify({ message: "Something went wrong!" })
            );
        }
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify(result));
    } catch (error) {
        console.log(error);
        res.writeHead(500, HEADERS);
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

module.exports = {
    topRegionsByOrder,
    topServicesByOrder,
    topServicesPerRegion,
    topUsersByOrder,
    totalOrders,
    totalUsers,
}