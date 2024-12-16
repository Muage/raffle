import { useState } from "react"
import { v4 as uuid } from 'uuid'
import { RaffleInfo } from "../models/Raffle"
import { Entry } from "../models/Entry"
import RaffleCondition from "./RaffleCondition"
import Winner from "./Winner"
import { BiPlusCircle } from "react-icons/bi"
import '../assets/css/raffle.css'

interface Props {
    entries: Entry[],
}

const Raffle = ({ entries }: Props) => {

    const [raffleInfoList, setRaffleInfoList] = useState<RaffleInfo[]>([{ id: uuid(), title: '', winNum: 1, winners: [] }])

    const columns = 7
    const rows = Array.from(
        { length: Math.ceil(entries.length / columns) },
        (_, index) =>  entries.slice(index * columns, index * columns + columns)
    )

    // Fisher-Yates Shuffle
    const shuffle = (arr: string[]) => {
        const array = [...arr]

        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    const raffle = () => {
        let sumWinNum = 0
        for(let raffleInfo of raffleInfoList) {
            sumWinNum += raffleInfo.winNum
        }

        if(sumWinNum <= entries.length) {
            const shuffledEntries = shuffle(entries.map((entry) => entry.name)) // 참가자 이름 shuffle
            let currentIndex = 0                                                // 현재 참가자 인덱스 추적

            setRaffleInfoList((prevList) => {
                return prevList.map((raffleInfo) => {
                    const winners = shuffledEntries.slice(currentIndex, currentIndex + raffleInfo.winNum)

                    currentIndex += raffleInfo.winNum           // 현재 인덱스를 사용한 만큼 이동

                    return { ...raffleInfo, winners: winners }  // 해당 Raffle의 당첨자 설정
                })
            })
        } else {
            // TODO: toast "당첨자 수가 추첨 대상보다 많습니다."
            console.warn(`${sumWinNum}, ${entries.length}`)
        }
    }

    const updateRaffleInfoList = (id: string, updateInfo: Partial<RaffleInfo>) => {
        setRaffleInfoList((prevList) =>
            prevList.map((raffleInfo) => {
                if(id === raffleInfo.id) {
                    return { ...raffleInfo, ...updateInfo }
                } else {
                    return raffleInfo
                }
            }
        ))
    }

    const addRaffleTitle = () => {
        setRaffleInfoList((prevList) => [...prevList, { id: uuid(), title: '', winNum: 1, winners: [] }])
    }

    const removeRaffleTitle = (id: string) => {
        setRaffleInfoList((prevList) => prevList.filter((raffleInfo) => id !== raffleInfo.id))
    }

    return (
        <>
        <div className="center-container">
            <div>
                <h1>추첨 대상</h1>
                <table>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((entry, index) => (
                                    <td key={index}>
                                        <img src="images/favicon144.png" width={15}/>
                                        {entry.name}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="raffle-condition-container">
                {raffleInfoList.map((raffleInfo, index) => (
                    <RaffleCondition
                        key={raffleInfo.id}
                        entries={entries}
                        raffleInfo={raffleInfo}
                        showBtnPlus={index === raffleInfoList.length - 1}
                        updateRaffleInfoList={updateRaffleInfoList}
                        removeRaffleTitle={removeRaffleTitle}
                        addRaffleTitle={addRaffleTitle} />
                ))}
                {raffleInfoList.length < 1 && <BiPlusCircle className="button" size={30} onClick={addRaffleTitle} />}
                {raffleInfoList.length > 0 && <button onClick={raffle}>Raffle</button>}
            </div>

            <div className="winners-container">
                {raffleInfoList.map((raffleInfo) => {
                    if(raffleInfo.title !== '') {
                        return <Winner key={raffleInfo.id} title={raffleInfo.title} winners={raffleInfo.winners} />
                    }
                })}
            </div>
        </div>
        </>
    )

}

export default Raffle