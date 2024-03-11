import { LoadingSpinner } from "./components/LoadingSpinner";
import { Table } from "./components/Table";
import { firebaseHook } from "./hooks/firebaseHook";

export const Container = () => {
    const { stocks } = firebaseHook();
    const { data, loading } = stocks;

    const columnTitles = ["Acción", "Últ. precio", "Var. (%)"];

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
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            {
                loading && data.length === 0 ?
                (
                        <LoadingSpinner />
                ) : 
                (
                        <div className="mx-auto w-96 d-flex flex-col justify-center">
                            <div className="p-3 my-8 sm:my-4 mx-2">
                                <h1 className="text-3xl font-bold">Las cinco acciones <span className="text-violet-500"> más bullish y bearish </span> del día</h1>
                            </div>
                            <div className="d-flex flex-column justify-content-around align-items-center">
                                <Table {...bullishStonks} />
                                <Table {...bearishStonks} />
                            </div>
                        </div>
                )
            }
        </div>
    )
}