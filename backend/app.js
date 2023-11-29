const express = require('express');
const cors = require('cors');
const { scrappWeb } = require('./helpers/webScrapping');

const app = express();

app.use(cors());
const PORT = 3000;

app.get('/web-scrapping-api', async (req, res) => {
    const data  = await scrappWeb();
    res.json({ data });
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}...`);
})