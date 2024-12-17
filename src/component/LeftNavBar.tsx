import { Link } from 'react-router-dom'
import { BiX } from "react-icons/bi";
import '../assets/css/layout.css'

interface Props {
    isNavOpen: boolean,
    toggleNav: () => void,
}

const LeftNavBar = ({ isNavOpen, toggleNav }: Props) => {

    return (
        <div className={`left-nav-bar ${isNavOpen ? 'open' : 'colsed'}`}>
            {isNavOpen && 
                <BiX className="btn-close" size={30} onClick={toggleNav} />
            }
            <ul>
                <li><Link to="/">뽑기 인원 관리</Link></li>
                <li><Link to="/raffle">뽑기판</Link></li>
            </ul>
        </div>
    )

}

export default LeftNavBar