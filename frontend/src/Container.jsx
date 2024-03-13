import { useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { NavBar } from "./components/NavBar";
import { Table } from "./components/Table";
import { firebaseHook } from "./hooks/firebaseHook";
import { Title } from "./components/Title";
import { ContainerComponent } from "./components/ContainerComponent";

export const Container = () => {
    const [ table, setTable ] = useState('bullish');

    const { stocks } = firebaseHook();
    const { data, loading } = stocks;

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
                        <ContainerComponent data={ data } view = { table }/>
                    </div>
                )
            }
        </div>
    )
}