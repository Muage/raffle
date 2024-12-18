import { useState } from 'react'
import LeftNavBar from '../component/LeftNavBar'
import Content from '../component/Content'
import { BiMenu } from "react-icons/bi";
import ClassName from '../component/ClassName';

const MainPage = () => {

    const [isFirst, setIsFirst] = useState<boolean>(false)
    const [isNavOpen, setIsNavOpen] = useState<boolean>(true)
    const [className, setClassName] = useState<string>('')

    const toggleNav = () => {
        setIsNavOpen(state => !state)
    }

    return (
        <>
        {isFirst ? (
            <div>
                {!isNavOpen &&
                    <BiMenu className="btn-menu" size={30} onClick={toggleNav} />
                }

                <LeftNavBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
                <Content isNavOpen={isNavOpen} />
            </div>
        ) : (
            <ClassName className={className} setClassName={setClassName} />
        )}
        </>
    )
    
}

export default MainPage
