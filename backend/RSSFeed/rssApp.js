const { deepStrictEqual, rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const RSS = require('rss');
const { findAll } = require('../models/serviceModel');


async function fetchData(){
    const data = await findAll();
    let articles = [];
    for(const service of data){
        const custom_elements = [ { description : service.description }, { price : service.price } ];
        const element = {
            title : service.name,
            description : service.description,
            custom_elements : custom_elements
        };
        articles.push(element)
    }
    return articles;
    
}

async function buildRss(res){
    const articles = await fetchData();
    console.log(articles);
    const blog = {
        title: 'Our Services',
        description: 'The list of all available SerP services at the moment.',
        author: 'SerP',
        articles: articles
    };
    const feed = new RSS({
        title : blog.title,
        description : blog.description,
        author : blog.author
    });
    for(const article of blog.articles){
        feed.item(article);
    }
    const xml = feed.xml({indent : true});
    fs.writeFileSync('feed.xml', xml);
    // const result = fs.readFileSync('feed.xml');
    // return result;
    try {
        fs.readFile('feed.xml', function (err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(data.toString());
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    buildRss,
}



