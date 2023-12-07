const express = require('express');
const cors = require('cors');
const path = require('path');
const { scrappWeb } = require('./helpers/webScrapping');

const scrapping = async () => {
    return await scrappWeb();
}

// setInterval(async () => {
//     await scrapping();
// }, 60000);

// scrapping();

const app = express();

app.use(cors());

const port = 3000;

app.get('/', async (req, res) => {
    res.send("App working correctly...");
})

app.get('/web-scrapping-api', async (req, res) => {
    const data  = await scrapping();
    res.json({ data });
})

app.listen( process.env.PORT || port, () => {
    console.log(`App listening on ${port}...`);
})
