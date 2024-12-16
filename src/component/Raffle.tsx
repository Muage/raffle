import { useEffect, useState } from "react"
import RaffleCondition from "./RaffleCondition"
import { RaffleInfo } from "../models/Raffle"
import { v4 as uuid } from 'uuid'
import '../assets/css/raffle.css'
import { BiPlusCircle } from "react-icons/bi";
import { Entry } from "../models/Entry"
import Winner from "./Winner"

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
        const shuffledEntries = shuffle(entries.map((entry) => entry.name)) // 참가자 이름 shuffle
        let currentIndex = 0                                                // 현재 참가자 인덱스 추적

        setRaffleInfoList((prevList) => {
            return prevList.map((raffleInfo) => {
                const availableSlots = shuffledEntries.slice(currentIndex, currentIndex + raffleInfo.winNum)

                if (availableSlots.length < raffleInfo.winNum) {
                    console.warn(`Raffle "${raffleInfo.title}"의 winNum이 참가자 수를 초과했습니다.`)
                }

                currentIndex += raffleInfo.winNum                   // 현재 인덱스를 사용한 만큼 이동

                return { ...raffleInfo, winners: availableSlots }   // 해당 Raffle의 당첨자 설정
                
            })
        })
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

    // useEffect(() => {
    //     setEntries(entries.filter((entry) => !raffleEntry.includes(entry)))
    // }, [raffleEntry])

    return (
        <>
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

        {raffleInfoList.map((raffleInfo) => (
            <RaffleCondition
                key={raffleInfo.id}
                entries={entries}
                raffleInfo={raffleInfo}
                updateRaffleInfoList={updateRaffleInfoList}
                removeRaffleTitle={removeRaffleTitle} />
        ))}
        {raffleInfoList.length < 5 && <BiPlusCircle size={30} onClick={addRaffleTitle} />}
        {raffleInfoList.length > 0 && <button onClick={raffle}>Raffle</button>}
        
        {raffleInfoList.map((raffleInfo) => {
            if(raffleInfo.title !== '' && raffleInfo.winners.length > 0) {
                return <Winner key={raffleInfo.id} title={raffleInfo.title} winners={raffleInfo.winners} />
            } else {
                return <div>추첨 제목을 정해주세요!</div>
            }
        })}
        </>
    )
}

export default Raffle