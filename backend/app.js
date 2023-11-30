const express = require('express');
const cors = require('cors');
const { scrappWeb } = require('./helpers/webScrapping');

const app = express();

app.use(cors());
const port = 3000;

app.get('/web-scrapping-api', async (req, res) => {
    const data  = await scrappWeb();
    res.json({ data });
})

app.listen( process.env.PORT || port, () => {
    console.log(`App listening on ${port}...`);
})