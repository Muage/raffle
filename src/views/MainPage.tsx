import { useEffect, useState } from 'react'
import LeftNavBar from '../component/LeftNavBar'
import Content from '../component/Content'

const MainPage = () => {

    const className = sessionStorage.getItem('class-name')

    const [isNavOpen, setIsNavOpen] = useState<boolean>(true)

    const toggleNav = () => setIsNavOpen(state => !state)

    useEffect(() => {
        if(!className) {
            setIsNavOpen(false)
        }
    }, [])

    return (
        <div>
            {className && <LeftNavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} toggleNav={toggleNav} />}

            <Content isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        </div>
    )
    
}

export default MainPage
