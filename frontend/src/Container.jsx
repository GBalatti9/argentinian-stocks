import { useEffect, useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Table } from "./components/Table";
import { useFetch } from "./hooks/useFetch"

export const Container = () => {
    const { info } = useFetch();
    const { data, lastActualization } = info;

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (data.length === 0) {
                setShowMessage(true);
            }
        }, 15000);

        return () => clearTimeout(timeoutId);
    }, [data]);

    const bullish = data.slice(0, 5);
    const bearish = data.slice(5);
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
                data.length === 0 && !showMessage ? (
                    <LoadingSpinner />
                ) :
                    <div className="d-flex flex-column justify-content-center" style={{
                        height: '100vh',
                    }}>
                        {
                            showMessage ? (
                                <h3 className="text-center">
                                    The stock market is closed :(
                                    <br />
                                    <span>Bearish...</span>
                                </h3>
                            )
                                : (
                                    <>
                                        <video autoPlay loop muted style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
                                            <source src="/spaceship.mp4" type="video/mp4" />
                                            Your browser does not support the video.
                                        </video>
                                        <p className="text-center"> 
                                            Última actualización: 
                                            { lastActualization } 
                                        </p>

                                        <div className="d-flex flex-column justify-content-around align-items-center d-md-none">
                                            <Table stonksReceived = { bullishStonks } />
                                            <Table stonksReceived = { bearishStonks } />
                                        </div>

                                        <div className="d-none d-md-flex justify-content-around align-items-center">
                                            <Table stonksReceived = { bullishStonks } />
                                            <Table stonksReceived = { bearishStonks } />
                                        </div>
                                    </>
                                )
                        }
                    </div>
            }
        </>
    )
}
