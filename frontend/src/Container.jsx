import { LoadingSpinner } from "./components/LoadingSpinner";
import { Table } from "./components/Table";
import { useFetch } from "./hooks/useFetch";
import { useFetchHook } from "./hooks/useFetchHook";

export const Container = () => {
    const { info } = useFetch();
    const { stocksData } = useFetchHook();
    const { loading, data, lastActualizacion } = stocksData;
    console.log(lastActualizacion);

    // const { data, lastActualization, isLoading } = info;

    // let bullish;
    // let bearish;
    // if (data.length > 1) {
    //     bullish = data.slice(0, 5);
    //     bearish = data.slice(5);
    // }
    // // const columnTitles = ["Ticker", "Último precio", "Var. Diaria (%)"];
    const columnTitles = ["Ticker", "Último precio", "Var. Diaria (%)"];

    const bullishStonks = {
        caption: 'Bullish TOP 5',
        titles: columnTitles,
        stocks: data[1],
        color: 'text-success',
        animation: 'animation-text-success',
    };

    const bearishStonks = {
        caption: 'Bearish TOP 5',
        titles: columnTitles,
        stocks: data[0],
        color: 'text-danger',
        animation: 'animation-text-danger',
    }

    return (
        <>
            {
                loading && data.length === 0 ?
                (
                    <LoadingSpinner />
                ) : 
                (
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
                            La información se actualiza cada 20 minutos.
                            <br />
                            Última vez: { lastActualizacion }
                        </p>

                        {/* <div className="d-flex flex-column justify-content-around align-items-center d-md-none">
                            <Table {...bullishStonks} />
                            <Table {...bearishStonks} />
                        </div> */}

                        <div className="d-none d-md-flex justify-content-around align-items-center">
                            <Table {...bullishStonks} />
                            <Table {...bearishStonks} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
