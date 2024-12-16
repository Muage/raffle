import { useState } from 'react'
import LeftNavBar from '../component/LeftNavBar'
import Content from '../component/Content'

const MainPage = () => {

    const [isNavOpen, setIsNavOpen] = useState<boolean>(true)

    const toggleNav = () => {
        setIsNavOpen(state => !state)
    }

    return (
        <>
        <div className=''>
            {!isNavOpen &&
                <button className="btn-menu" onClick={toggleNav}>☰</button>
            }

            <LeftNavBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
            <Content isNavOpen={isNavOpen} />
        </div>
        </>
    )
    
}

export default MainPage
