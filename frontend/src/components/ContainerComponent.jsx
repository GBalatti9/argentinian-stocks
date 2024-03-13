import { useEffect, useState } from "react";
import { Table } from "./Table"
import { Title } from "./Title"

export const ContainerComponent = ({ data, view }) => {
    const [ orderData, setOrderData ] = useState([])

    const columnTitles = ["Acción", "Últ. precio", "Var. (%)"];

    useEffect(() => {
        if (view === 'general') {
            const dataSortered = data[2]?.sort((a, b) => {
                if (a.Ticker < b.Ticker) {
                    return -1;
                }
                if (a.Ticker > b.Ticker) {
                    return 1;
                }
                return 0;
            });

            return setOrderData(dataSortered);
        }

        if (view === 'bullish' && data.length >= 2) {
                const bullish = [...data[1], ...data[0]];

                return setOrderData(bullish)
        }

    }, [data, view]);

    return (
        <div className="fadeInTransition">
            {
                view === 'general'
                ? <Title
                    startText = { 'Todas las acciones del' }
                    colorText = { 'mercado argentino' }
                />
                : <Title 
                    startText = { 'Las cinco acciones' }
                    colorText = { 'más bullish y bearish' }
                    endText   = { 'del día' }
                    />
            }
            <div className="d-flex flex-column justify-content-around align-items-center">
                {
                    view === 'general' ? <Table stocks = { orderData } titles = { columnTitles } />
                    : 
                    <>
                    <Table stocks = { data[1] } titles = { columnTitles } />
                    <Table stocks = { data[0] } titles = { columnTitles } />
                    </>
                }
            </div>
            <div className="pb-2">
                <p className="italic text-center text-sm">*El mercado opera desde las 11:00 hasta las 17:00.</p>
            </div>
        </div>
    )
}
