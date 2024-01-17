import { useEffect, useState } from "react"

// Using this stocks when playwright doesnt work
import stocks from '../data/scrapedData.json';

// const URL = 'http://localhost:3000/web-scrapping-api';
const URL = 'https://argentinian-stocks-backend.onrender.com/web-scrapping-api';

export const useFetch = () => {
    const [ info, setInfo ] = useState({
        lastActualization: '',
        data: []
    });

    const fetchApi = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // If somehow the fetch response doesn't works then the stocks shown are gonna be the imported from '../data/scrapedData.json';
                setInfo({
                    lastActualization: new Date().toString().split(' GMT')[0],
                    data: stocks
                });

                console.error("USANDO STOCKS");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            let dataFromJson;

            // When the market is close data is undefined so to prevent an error the info is gonna be taken from stocks.json.
            if ( data === undefined ) {
                dataFromJson = stocks;
            }

            setInfo({
                lastActualization: new Date().toString().split(' GMT')[0],
                data: data === undefined ? dataFromJson : data
            });

        } catch (error) {
            // If somehow fetch doesn't works then the stocks shown are gonna be the imported from '../data/scrapedData.json';
            console.error('Error fetching data: ', error);
            setInfo({
                lastActualization: new Date().toString().split(' GMT')[0],
                data: stocks
            });
        }
    };

    useEffect(() => {
        try {
            
            console.log('dentro del useEffect');
            
            fetchApi(URL);
            
            const intervalId = setInterval(() => {
                fetchApi(URL);
            }, 60000); 
            
            return () => clearInterval(intervalId);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }, [])

    return {
        info,
        setInfo,
    }
}
