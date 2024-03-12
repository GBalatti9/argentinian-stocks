

export const NavBar = ({ fn }) => {

    const handleClick = ({ target }) => {
        fn( target.value )
    }
    return (
        <nav className='mt-4'>
            <ul className='flex flex-row justify-around'>
                <button 
                onClick={ handleClick }
                value='bullish'
                className="transition-colors duration-300 ease-in-out rounded text-violet-500 p-1 hover:bg-violet-500 hover:text-white hover:border-violet-500"> 
                    Bull & Bear 
                </button>
                <button 
                onClick={ handleClick }
                value='general'
                className="transition-colors duration-300 ease-in-out rounded text-violet-500 p-1 hover:bg-violet-500 hover:text-white hover:border-violet-500"> 
                    Panel General 
                </button>
            </ul>
        </nav>
    )
}
