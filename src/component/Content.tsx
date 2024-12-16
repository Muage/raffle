import Raffle from './Raffle'
import { Route, Routes } from 'react-router-dom'
import EntriesManagement from '../component/EntriesManagement'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Entry } from '../models/Entry'

interface Props {
    isNavOpen: boolean,
}

// TODO: 임시 데이터로 개발 완료 시 삭제하고 useState 기본값은 []로 수정하기
const initEntry = [
    { id: uuid(), name: '유재석', winStatus: false },
    { id: uuid(), name: '박명수', winStatus: false },
    { id: uuid(), name: '정준하', winStatus: false },
    { id: uuid(), name: '정형돈', winStatus: false },
    { id: uuid(), name: '노홍철', winStatus: false },
    { id: uuid(), name: '하동훈', winStatus: false },
    { id: uuid(), name: '홍진경', winStatus: false },
    { id: uuid(), name: '황광희', winStatus: false },
    { id: uuid(), name: '김종국', winStatus: false },
    { id: uuid(), name: '송지효', winStatus: false },
    { id: uuid(), name: '지석진', winStatus: false },
]

const Content = ({ isNavOpen }: Props) => {

    const [entries, setEntries] = useState<Entry[]>(initEntry)

    return (
        <>
        <div className={`content ${isNavOpen ? 'shifted' : ''}`}>
            <Routes>
                <Route path="/" element={<EntriesManagement entries={entries} setEntries={setEntries} />} />
                <Route path="/raffle" element={<Raffle entries={entries} />} />
            </Routes>
        </div>
        </>
    )

}

export default Content
