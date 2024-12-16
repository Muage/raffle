import { useEffect, useState } from "react"
import RaffleCondition from "./RaffleCondition"
import { RaffleInfo } from "../models/Raffle"
import { v4 as uuid } from 'uuid'
import '../assets/css/raffle.css'
import { BiPlusCircle } from "react-icons/bi";
import { Entry } from "../models/Entry"

interface Props {
    entries: Entry[],
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
}

const Raffle = ({ entries, setEntries }: Props) => {
    const [raffleInfoList, setRaffleInfoList] = useState<RaffleInfo[]>([{ id: uuid(), title: '', winNum: 1, winners: [] }])
    const [raffleEntry, setRaffleEntry] = useState<string[]>([])

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
        // setRaffleEntry(shuffle(entries).splice(0, raffleInfo.winNum))
        console.log(raffleInfoList)
    }

    const updateRaffleInfoList = (id: string, updateInfo: Partial<RaffleInfo>) => {
        setRaffleInfoList((prevList) =>
            prevList.map((raffleInfo) => 
                id === raffleInfo.id ? { ...raffleInfo, ...updateInfo } : raffleInfo
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
        {/* <Winner /> */}
        </>
    )
}

export default Raffle