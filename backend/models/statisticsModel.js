const { getClient } = require('../databasePG');
const { QUERRIES } = require('../resources/constants');

function regionsByOrder(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.topRegionsByOrderCount, (err, res) => {
            if(!err){
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

function servicesByOrder(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.topServicesByOrderCount, (err, res) => {
            if(!err){
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

function servicesPerRegion(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.topServicesPerRegion, (err, res) => {
            if(!err){
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

function usersByOrder(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.topUsersByOrderCount, (err, res) => {
            if(!err){
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

function totalOrders(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.totalOrders, (err, res) => {
            if(!err){
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

function totalUsers(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.totalUsers, (err, res) => {
            if(!err){
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

function ordersPerMonthForService(id_service, month){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.numberOfOrdersPerMonthForService, [month, id_service], (err, res) => {
            if(!err){
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

function servicesFromRegion(region){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.allServicesFromRegion, [region], (err, res) => {
            if(!err){
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

function getAllRegions(){
    return new Promise((resolve, reject) => {
        const client = getClient();
        client.connect();
        client.query(QUERRIES.allRegions, (err, res) => {
            if(!err){
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

module.exports = {
    regionsByOrder,
    servicesByOrder,
    servicesPerRegion,
    usersByOrder,
    totalOrders,
    totalUsers,
    ordersPerMonthForService,
    servicesFromRegion,
    getAllRegions,
    
}