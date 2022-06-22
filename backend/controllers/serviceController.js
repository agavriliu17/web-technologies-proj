const Service = require("../models/serviceModel");
const { getPostData } = require("../utils");

async function getServices(req, res){
    try {
        const services = await Service.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(services));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function addService(req, res){
    try {
        const body = await getPostData(req);
        const { name, description, price, region } = JSON.parse(body);
        const service = {
            name,
            description,
            price,
            region
        };
        const newService = await Service.insertService(service);
        if (newService === null) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({ message: "Something went wrong: Service not added" })
            );
        }
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newService));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function getServiceById(req, res, id){
    try {
        const service = await Service.findServiceById(id);
        if(service === 'invalid format'){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Wrong id format" }));
        }
        else if(service === null){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Something went wrong" }));
        }
        else{
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(service));
        }

    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function getServicesByName(req, res, name){
    try {
        const services = await Service.findServicesByName(name);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(services));
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function updateService(req, res, id){
    try {
        const service = await Service.findServiceById(id);
        if (!service) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Service Not Found" }));
          } 
          else if (service === "invalid format") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Wrong Id Format" }));
          } 
          else {
            const body = await getPostData(req);
            const { name, description, price, region } = JSON.parse(body);
            const serviceInfo = {
                name: name || service.name,
                description: description || service.description,
                price: price || service.price,
                region: region || service.region
            };
            const updatedService = await Service.updateService(serviceInfo, service.id);
            if(updatedService === null){
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Service not updated: something went wrong!" }));
            }
            else{
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(updatedService));
            }
          }
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

async function deleteService(req, res, id){
    try {
        const service = await Service.findServiceById(id);
        if (!service) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Service Not Found" }));
          } 
          else if (service === "invalid format") {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Wrong Id Format" }));
          } 
          else {
            const deleteResult = Service.deleteService(id);
            if(deleteResult === null){
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Service not deleted: something went wrong!" }));
            }
            else{
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: `Service ${service.name} deleted!` }));
            }
          }
    } catch (error) {
        console.log(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Something went wrong" }));
    }
}

module.exports = {
    getServices,
    addService,
    getServiceById,
    getServicesByName,
    updateService,
    deleteService,
}