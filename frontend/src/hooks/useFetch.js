import { useEffect, useState } from "react"

const URL = 'http://localhost:3000/web-scrapping-api';

export const useFetch = () => {

    const [ info, setInfo ] = useState({
        lastActualization: '',
        data: []
    });

    const fetchApi = async (url) => {
        try {
            const response = await fetch(url);
            const { data } = await response.json();
            setInfo({
                lastActualization: new Date().toString().split(' GMT')[0],
                data,
            });

            console.log('Datos actualizados:', new Date());

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
