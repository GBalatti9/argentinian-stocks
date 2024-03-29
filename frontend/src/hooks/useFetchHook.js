import { useEffect, useState } from "react";

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8p1NQwc5SwV5vLe7tm02drGNYNlGXgIKq2MCB9_l-ZsBxPPfj8wnTU-x89p7_7zwL75h_s0DQf1o_/pub?output=csv';

export const useFetchHook = () => {

    const [stocksData, setStocksData] = useState({
        loading: false,
        data: [],
        lastActualizacion: ''
    });

    const fetchApi = async () => {

        try {
            setStocksData((prevData) => ({
                ...prevData,
                loading: true,
            }))

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Response error')
            }

            const data = await response.text();
            const formattedData = data.split('\n').slice(1).map((element) => {

                // De esta manera elimino el \r.
                const [ ticker, price, variation ] = element.split('\r')[0].split(',');
                return { ticker: ticker, price: parseFloat(price), variation: parseFloat(variation) }

            });

            const orderData = formattedData.sort((a, b) => a.variation - b.variation);

            const worstFive = orderData.slice(0, 5);
            const topFive = orderData.slice(-5).reverse();

            const stocksNeeded = [worstFive, topFive];

            const currentDate = new Date();
            const formattedDate = new Intl.DateTimeFormat('es-AR', {
                hour: '2-digit',
                minute: '2-digit',
            }).format(currentDate);

            setStocksData((prevData) => ({
                ...prevData,
                loading: false,
                data: stocksNeeded,
                lastActualizacion: formattedDate,
            }));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = () => {
            fetchApi();
            const intervalId = setInterval(fetchApi, 3 * 60 * 1000); 
            return () => clearInterval(intervalId); 
        };
    
        fetchData(); 
    }, []);

    return {
        stocksData,
    }
}
