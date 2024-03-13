import { useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { NavBar } from "./components/NavBar";
import { Table } from "./components/Table";
import { firebaseHook } from "./hooks/firebaseHook";
import { Title } from "./components/Title";

export const Container = () => {
    const [ table, setTable ] = useState('bullish');

    console.log({ table });

    const { stocks } = firebaseHook();
    const { data, loading } = stocks;

    const columnTitles = ["Acción", "Últ. precio", "Var. (%)"];

    const orderDataByName = data[2]?.sort((a, b) => {
        if (a.Ticker < b.Ticker) {
            return -1;
        }
        if (a.Ticker > b.Ticker) {
            return 1;
        }
        return 0;
    });

    const bullishStonks = {
        caption: 'Bullish TOP 5',
        titles: columnTitles,
        stocks: data[1],
    };

    const bearishStonks = {
        caption: 'Bearish TOP 5',
        titles: columnTitles,
        stocks: data[0],
    }

    const switchTable = ( tableToSwitch ) => {
        setTable( tableToSwitch );
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
                        <NavBar fn = { switchTable } view = { table } />
                        <div className="fadeInTransition">
                            {
                                table === 'general' 
                                    ? <div className="fadeInTransition"> 
                                        <Title 
                                            startText={'Todas las acciones del'} 
                                            colorText={'mercado argentino'}
                                            /> 
                                            <div className="d-flex flex-column justify-content-around align-items-center">
                                                <Table stocks={ orderDataByName } titles={ columnTitles } />
                                            </div>
                                            <div className="pb-2">
                                                <p className="italic text-center text-sm">*El mercado opera desde las 11:00 hasta las 17:00.</p>
                                            </div>
                                        </div>
                                    : <div className="fadeInTransition">
                                            <Title 
                                                startText={'Las cinco acciones'} 
                                                colorText={'más bullish y bearish'} 
                                                endText={'del día'} />
                                            <div className="d-flex flex-column justify-content-around align-items-center">
                                                <Table {...bullishStonks} />
                                                <Table {...bearishStonks} />
                                            </div>
                                            <div className="pb-2">
                                                <p className="italic text-center text-sm">*El mercado opera desde las 11:00 hasta las 17:00.</p>
                                            </div>
                                        </div>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}