import { useEffect, useState } from "react"

import stocks from '../data/scrapedData.json';

// const URL = 'http://localhost:3000/web-scrapping-api';

export const useFetch = () => {

    const [info, setInfo] = useState({
        lastActualization: '',
        data: []
    });


    // const fetchApi = async (url) => {
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const { data } = await response.json();

    //         console.log({ data });
    //         setInfo({
    //             lastActualization: new Date().toString().split(' GMT')[0],
    //             data,
    //         });

    //         console.log('Datos actualizados:', new Date());
    //         console.log('Dara:', info.data);

    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    useEffect(() => {
        setInfo({
            lastActualization: new Date().toString().split(' GMT')[0],
            data: stocks
        })
        // fetchApi(URL);

        // const intervalId = setInterval(() => {
        //     fetchApi(URL);
        // }, 60000); 

        // return () => clearInterval(intervalId);
    }, [])

    return {
        info,
    }
}
