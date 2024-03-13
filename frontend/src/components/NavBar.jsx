

export const NavBar = ({ fn, view }) => {
    console.log({ view });
    const handleClick = ({ target }) => {
        fn( target.value )
    }

    const menuItems = [
        { name: 'Bull & Bear', value: 'bullish' },
        { name: 'Panel General', value: 'general' },
    ]

    return (
        <nav className='mt-4'>
            <ul className='flex flex-row justify-around'>
                {
                    menuItems.map(( item ) => (                        
                <button 
                onClick={ handleClick }
                value={ item.value }
                className={`
                    transition-colors 
                    duration-300 
                    ease-in-out 
                    rounded 
                    text-violet-500 
                    px-2 py-1 
                    hover:bg-violet-500 
                    hover:text-white 
                    hover:border-violet-500
                    ${ view === item.value ? 'bg-violet-500 text-white border-violet-500' : '' }`
                    }> 
                    { item.name }
                </button>
                    ))
                }
            </ul>
        </nav>
    )
}
