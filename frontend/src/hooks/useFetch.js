import { useEffect, useState } from "react"

// Using this stocks when playwright doesnt work
import stocks from '../data/scrapedData.json';

const URL = 'http://localhost:3000/web-scrapping-api';

export const useFetch = () => {

    const [info, setInfo] = useState({
        lastActualization: '',
        data: []
    });

    console.log({ info });

    const fetchApi = async (url) => {
        try {
            const response = await fetch(url);
            console.log({ response });
            if (!response.ok) {
                // If somehow fetch doesn't works then the stocks shown are gonna be the imported from '../data/scrapedData.json';
                setInfo({
                    lastActualization: new Date().toString().split(' GMT')[0],
                    data: stocks
                });

                console.error("USANDO STOCKS");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();

            console.log("DATA API: ",{ data });
            
            setInfo({
                lastActualization: new Date().toString().split(' GMT')[0],
                data
            });

            console.log('Datos actualizados:', new Date());
            console.log('Data:', info.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchApi(URL);

        const intervalId = setInterval(() => {
            fetchApi(URL);
        }, 60000); 

        return () => clearInterval(intervalId);
    }, [])

    return {
        info,
    }
}
