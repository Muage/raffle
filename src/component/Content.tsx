import EntriesManagement from '../component/EntriesManagement'
import Raffle from './Raffle'
import ClassName from './ClassName'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Entry } from '../models/Entry'

interface Props {
    isNavOpen: boolean,
    setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// TODO: 임시 데이터로 개발 완료 시 삭제하고 useState 기본값은 []로 수정하기
const initEntry = [
    { id: uuid(), name: '유재석' },
    { id: uuid(), name: '박명수' },
    { id: uuid(), name: '정준하' },
    { id: uuid(), name: '정형돈' },
    { id: uuid(), name: '노홍철' },
    { id: uuid(), name: '하동훈' },
    { id: uuid(), name: '홍진경' },
    { id: uuid(), name: '황광희' },
    { id: uuid(), name: '김종국' },
    { id: uuid(), name: '송지효' },
    { id: uuid(), name: '지석진' },
]

const Content = ({ isNavOpen, setIsNavOpen }: Props) => {

    const getClassName = sessionStorage.getItem('class-name')

    const [className, setClassName] = useState<string>('')
    const [entries, setEntries] = useState<Entry[]>(initEntry)

    useEffect(() => {
        if(getClassName) {
            setClassName(getClassName)
        }
    }, [])

    return (
        <div className={`content ${isNavOpen ? 'shifted' : ''}`}>
            <Routes>
                <Route path="/"
                    element={
                        <ClassName
                            className={className}
                            setClassName={setClassName}
                            setIsNavOpen={setIsNavOpen} />
                    } />
                <Route path="/entries"
                    element={
                        <EntriesManagement
                            className={className}
                            entries={entries}
                            isNavOpen={isNavOpen}
                            setEntries={setEntries} />
                    } />
                <Route path="/raffle"
                    element={
                        <Raffle
                            className={className}
                            entries={entries}
                            isNavOpen={isNavOpen} />
                    } />
            </Routes>
        </div>
    )

}

export default Content
