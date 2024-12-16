import Raffle from './Raffle'
import { Route, Routes } from 'react-router-dom'
import EntriesManagement from '../component/EntriesManagement'
import { useState } from 'react'

interface Props {
    isNavOpen: boolean,
}

const Content = ({ isNavOpen }: Props) => {

    const [entries, setEntries] = useState<string[]>(['유재석', '박명수', '정준하', '정형돈', '노홍철', '하동훈', '홍진경', '황광희', '김종국', '송지효', '지석진'])

    return (
        <>
        <div className={`content ${isNavOpen ? 'shifted' : ''}`}>
            <Routes>
                <Route path="/" element={<EntriesManagement entries={entries} setEntries={setEntries} />} />
                <Route path="/raffle" element={<Raffle entries={entries} setEntries={setEntries} />} />
            </Routes>
        </div>
        </>
    )

}

export default Content
