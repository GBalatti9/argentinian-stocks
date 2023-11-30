const { chromium } = require('playwright');
const fs = require('fs');

const scrappWeb = async () => {
    
    try {
        console.log("Open browser...");
        const browser = await chromium.launch();
        console.log("Open page...");
        const page = await browser.newPage();
        console.log("Navigation to the page...");
        await page.goto('https://open.bymadata.com.ar/#/dashboard', { timeout: 120000 });
        const tableSelector = '.mat-table';
        
        console.log('Waiting for the table selector...');
        await page.waitForSelector(tableSelector, { timeout: 60000 });

        const extractTableData = async (selector) => {
            return await page.$$eval(`${selector} tbody tr`, (rows) => {
                return rows.map((row) => {
                    const columns = Array.from(row.querySelectorAll('td'));
                    return columns.map((column) => column.textContent.trim());
                });
            });
        };
        
        console.log('Extracting table data...');
        const data = await extractTableData(tableSelector);
        return data;
    } catch (error) {
        console.log(error);
    } finally {
        await browser.close();
    }
};

module.exports = {
    scrappWeb,
}
