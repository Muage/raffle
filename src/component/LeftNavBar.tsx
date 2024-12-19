import { Link } from 'react-router-dom'
import { BiMenu, BiX } from "react-icons/bi";
import '../assets/css/layout.css'
import { useEffect } from 'react';

interface Props {
    isNavOpen: boolean,
    setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggleNav: () => void,
}

const LeftNavBar = ({ isNavOpen, setIsNavOpen, toggleNav }: Props) => {

    const className = sessionStorage.getItem('class-name')

    useEffect(() => {
        if(className) {
            setIsNavOpen(true)
        }
    }, [])

    return (
        <>
        {!isNavOpen ? (
            <BiMenu className="btn-menu" size={30} onClick={toggleNav} />
        ) : (
            <div className={`left-nav-bar ${isNavOpen ? 'open' : 'colsed'}`}>
                {isNavOpen && 
                    <BiX className="btn-close" size={30} onClick={toggleNav} />
                }
                <ul>
                    <li><Link to="/entries">뽑기 인원 관리</Link></li>
                    <li><Link to="/raffle">뽑기판</Link></li>
                </ul>
            </div>
        )}
        </>
    )

}

export default LeftNavBar