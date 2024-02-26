

export const Table = ({ titles, stocks, caption, color, animation }) => {

    return (
        <div className="col-11 col-md-5">
            <div className="border rounded overflow-hidden bg-gray-50 shadow">
            <table className="table-fixed w-full text-center">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                    <tr>
                        {
                            titles.map((title, i) => (
                                <th className="p-3" key={title + i}>{title}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {
                        stocks?.map(( stock, i ) => (
                            <tr key={ stock + i } >
                                <td className="p-2">{ stock.ticker }</td>
                                <td>{ stock.price }</td>
                                <td className={`${ caption === 'Bullish TOP 5' 
                                                    ? `${animation}` 
                                                    : caption === 'Bearish TOP 5' 
                                                    ? `${ animation }` 
                                                    : '' }` }>
                                    { stock.variation }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}
