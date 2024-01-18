import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Using this stocks when playwright doesnt work
import stocks from '../data/scrapedData.json';

const URL = 'http://localhost:3000/web-scrapping-api';
// const URL = 'https://argentinian-stocks-backend.onrender.com/web-scrapping-api';

export const useFetch = () => {
    const [ info, setInfo ] = useState({
        isLoading: true,
        lastActualization: '',
        data: []
    });

    const fetchApi = async (url) => {
        try {
            setInfo(( prevInfo ) => ({
                ...prevInfo,
                isLoading: true,
            }))

            const response = await fetch(url);
            if (!response.ok) {
                // If somehow the fetch response doesn't works then the stocks shown are gonna be the imported from '../data/scrapedData.json';
                setInfo(( prevInfo ) => ({
                    ...prevInfo,
                    isLoading: false,
                    lastActualization: format(new Date(), 'EEEE d MMM yyyy', { locale: es }),
                    data: stocks,
                }))
                console.error("USANDO STOCKS");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            console.log( data );
            let dataFromJson;

            // When the market is close data is undefined so to prevent an error the info is gonna be taken from stocks.json.
            if ( data === undefined ) {
                dataFromJson = stocks;
            }

            setInfo(( prevInfo ) => ({
                ...prevInfo,
                isLoading: false,
                lastActualization: format(new Date(), 'EEEE d MMM yyyy', { locale: es }),
                data: data === undefined ? dataFromJson : data,
            }))
        } catch (error) {
            // If somehow fetch doesn't works then the stocks shown are gonna be the imported from '../data/scrapedData.json';
            console.error('Error fetching data: ', error);
            setInfo(( prevInfo ) => ({
                ...prevInfo,
                isLoading: false,
                lastActualization: format(new Date(), 'EEEE d MMM yyyy', { locale: es }),
                data: stocks,
            }))
        }
    };

    useEffect(() => {
            fetchApi(URL);

            const intervalId = setInterval(() => {
                fetchApi(URL);
            }, 60000); 
            
            return () => clearInterval(intervalId);
    }, [])
    console.log(new Date().toString().split(' GMT')[0]);

    return {
        info,
        setInfo,
    }
}
