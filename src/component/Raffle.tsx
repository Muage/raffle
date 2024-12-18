import { useState } from "react"
import { v4 as uuid } from 'uuid'
import { RaffleInfo } from "../models/Raffle"
import { Entry } from "../models/Entry"
import RaffleCondition from "./RaffleCondition"
import Winner from "./Winner"
import { BiPlusCircle } from "react-icons/bi"
import { BiShuffle } from "react-icons/bi";
import { Button, Grid2 } from "@mui/material"
import '../assets/css/raffle.css'

interface Props {
    className: string,
    entries: Entry[],
}

const Raffle = ({ className, entries }: Props) => {

    const [raffleInfoList, setRaffleInfoList] = useState<RaffleInfo[]>([{ id: uuid(), title: '', winNum: 1, winners: [] }])

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
        <div>
            <h1>{className}반 친구들</h1>

            <Grid2 container spacing={2} columns={7}>
                {entries.map((entry) => (
                    <Grid2 key={entry.id} size={1} alignItems="center">
                        <div className="name-container">
                            <img src="images/star.png" width={30} />
                            <span className="name">{entry.name}</span>
                        </div>
                    </Grid2>
                ))}
            </Grid2>

            <div className="raffle-condition-container">
                {raffleInfoList.map((raffleInfo) => (
                    <RaffleCondition
                        key={raffleInfo.id}
                        entries={entries}
                        raffleInfo={raffleInfo}
                        updateRaffleInfoList={updateRaffleInfoList}
                        removeRaffleTitle={removeRaffleTitle} />
                ))}
                <BiPlusCircle className="button" size={30} onClick={addRaffleTitle} />
                {raffleInfoList.length > 0 &&
                    <Button
                        endIcon={<BiShuffle />}
                        onClick={raffle}
                        sx={{
                            backgroundColor: "#999",
                            color: "#fff",
                            padding: "10px 30px",
                            '&:hover': {
                                backgroundColor: "#3c388e"
                            }
                        }}>
                        <span>뽑기</span>
                    </Button>
                }
            </div>

                {/* TODO: modal로 변경 예정 */}
            {/* <div className="winners-container">
                {raffleInfoList.map((raffleInfo) => {
                    if(raffleInfo.title !== '') {
                        return <Winner key={raffleInfo.id} title={raffleInfo.title} winners={raffleInfo.winners} />
                    }
                })}
            </div> */}
        </div>
        </>
    )

}

export default Raffle