const express = require("express");
const cheerio = require('cheerio');
const axios = require("axios");

const App = express()

App.get("/", async(req, res)=>{
    const items =[]
    const link = `https://tryst.link/`
    const response =await axios(link)
    const html = response.data
    const $ = cheerio.load(html)
    $('.thumb-col', html).each((index, value)=>{
        const name = $(value).find('h2').text()
        const about = $(value).find('.thumb__about').text()
        const tours = $(value).find('.thumb__tours').text()
        items.push({tours, name, about})
    })
    res.send(items);
})

App.listen(3500, ()=>{
    console.log("listening on 3500");
})