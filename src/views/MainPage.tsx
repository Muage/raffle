import { useState } from 'react'
import LeftNavBar from '../component/LeftNavBar'
import Content from '../component/Content'
import { BiMenu } from "react-icons/bi";

const MainPage = () => {

    const [isNavOpen, setIsNavOpen] = useState<boolean>(true)

    const toggleNav = () => {
        setIsNavOpen(state => !state)
    }

    return (
        <>
        <div className=''>
            {!isNavOpen &&
                <BiMenu className="btn-menu" size={30} onClick={toggleNav} />
            }

            <LeftNavBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
            <Content isNavOpen={isNavOpen} />
        </div>
        </>
    )
    
}

export default MainPage
