
export const Title = ({ text }) => {
    return (
        <div className="p-3 mb-8 sm:mb-4 mx-2">
            {/* <h1 className="text-3xl font-bold">Las cinco acciones <span className="text-violet-500"> más bullish y bearish </span> del día</h1> */}
            <h1 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: text }}/> 
        </div>
    )
}
