
export const Table = ({ stonksReceived }) => {

    const { titles, stonks, caption, color, animation } = stonksReceived;

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
                        stonks.map((element, i) => (
                            <tr key={i}>
                                {
                                    element.map((el, j) => (
                                        <td key={el + j} className={`${j === 2 ? `${animation}` : ''}`}> {el} </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
