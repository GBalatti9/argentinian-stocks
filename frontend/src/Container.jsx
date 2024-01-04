import { useEffect, useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Table } from "./components/Table";
import { useFetch } from "./hooks/useFetch";
import dataFromJson from './data/scrapedData.json';

export const Container = () => {
    const { info } = useFetch();
    const { data, lastActualization } = info;

    let bullish;
    let bearish;
    if (data.length > 1) {
        bullish = data.slice(0, 5);
        bearish = data.slice(5);
    }
    const columnTitles = ["Especie", "Último precio", "Var. Diaria (%)"];

    const bullishStonks = {
        caption: 'Bullish TOP 5',
        titles: columnTitles,
        stonks: bullish,
        color: 'text-success',
        animation: 'animation-text-success',
    };

    const bearishStonks = {
        caption: 'Bearish TOP 5',
        titles: columnTitles,
        stonks: bearish,
        color: 'text-danger',
        animation: 'animation-text-danger',
    }



    return (
        <>
            {
                data.length === 0 ?
                
                (
                    <LoadingSpinner />
                ) : (
                    <div style={{ 
                            height: '100vh', 
                            display: 'flex', 
                            flexDirection: 'column',
                            justifyContent: 'center' }}>
                        <video autoPlay loop muted style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
                            <source src="/spaceship.mp4" type="video/mp4" />
                            Your browser does not support the video.
                        </video>
                        <p className="text-center">
                            Última actualización:
                            {lastActualization}
                        </p>

                        <div className="d-flex flex-column justify-content-around align-items-center d-md-none">
                            <Table stonksReceived={bullishStonks} />
                            <Table stonksReceived={bearishStonks} />
                        </div>

                        <div className="d-none d-md-flex justify-content-around align-items-center">
                            <Table stonksReceived={bullishStonks} />
                            <Table stonksReceived={bearishStonks} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
