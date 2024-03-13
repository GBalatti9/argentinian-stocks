
export const Title = ({ startText, colorText, endText }) => {
    return (
        <div className="p-3 mb-2 mx-2">
            {/* <h1 className="text-3xl font-bold">Las cinco acciones <span className="text-violet-500"> más bullish y bearish </span> del día</h1> */}
            <h1 className="text-3xl font-bold">{startText} <span className="text-violet-500"> {colorText} </span> { endText } </h1> 
        </div>
    )
}
