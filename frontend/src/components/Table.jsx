

export const Table = ({  caption, stocks, titles  }) => {

    return (
        <div className="col-11 mb-4">
            <div className="border rounded overflow-hidden bg-gray-50 shadow">
            <table className="table-fixed w-full text-center">
                <thead className="bg-gray-700 border-b-2 border-gray-200">
                    <tr>
                        {
                            titles.map((title, i) => (
                                <th className="p-3 text-white font-medium" key={title + i}>{title}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {
                        stocks?.map(( stock, i ) => (
                            <tr key={ stock + i } >
                                <td className="p-2 font-semibold">{ stock.Ticker }</td>
                                <td>{ stock.Precio }</td>
                                <td className={`${ caption === 'Bullish TOP 5' 
                                                    ? `text-green-700` 
                                                    : caption === 'Bearish TOP 5' 
                                                    ? `text-red-700` 
                                                    : '' }` }>
                                    { stock.Variacion }
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