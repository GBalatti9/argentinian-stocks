

export const Table = ({  caption = '', stocks, titles  }) => {

    stocks?.forEach((stock) => {
        console.log(stock.Precio);
    })

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
                                <td className={`${ 
                                                    stock.Variacion === 0 ? 'text-black' :
                                                    stock.Variacion > 0 ? 'text-green-700' :
                                                    stock.Variacion < 0 ? 'text-red-700' : ''}` }>
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