const { chromium } = require('playwright');
const fs = require('fs');

const scrappWeb = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://open.bymadata.com.ar/#/dashboard');

        const tableSelector = '.mat-table';

        await page.waitForSelector(tableSelector);

        const extractTableData = async (selector) => {
            return await page.$$eval(`${selector} tbody tr`, (rows) => {
                return rows.map((row) => {
                    const columns = Array.from(row.querySelectorAll('td'));
                    return columns.map((column) => column.textContent.trim());
                });
            });
        };

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
