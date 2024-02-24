

export const Table = ({ titles, stocks, caption, color, animation }) => {

    return (
        <div className="col-11 col-md-5">
            <table className="table table-dark table-striped-columns caption-top text-center">
                <caption>
                    <h3 className="text-dark text-center">{ caption }</h3>
                </caption>
                <thead>
                    <tr>
                        {
                            titles.map((title, i) => (
                                <th key={title + i}>{title}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks?.map(( stock, i ) => (
                            <tr key={ stock + i }>
                                <td>{ stock.ticker }</td>
                                <td>{ stock.price }</td>
                                <td className={`${ caption === 'Bullish TOP 5' 
                                                    ? `${animation}` 
                                                    : caption === 'Bearish TOP 5' 
                                                    ? `${ animation }` 
                                                    : '' }`}>
                                    { stock.variation }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
