import { useState } from "react"
import { v4 as uuid } from 'uuid'
import { RaffleInfo } from "../models/Raffle"
import { Entry } from "../models/Entry"
import RaffleCondition from "./RaffleCondition"
import Winner from "./Winner"
import { BiPlusCircle } from "react-icons/bi"
import { BiShuffle } from "react-icons/bi";
import { Alert, Button, Grid2, Snackbar } from "@mui/material"
import '../assets/css/raffle.css'

interface Props {
    className: string,
    entries: Entry[],
    isNavOpen: boolean
}

const Raffle = ({ className, entries, isNavOpen }: Props) => {

    const [isValidation, setIsValidation] = useState<boolean>(true)
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
        let currentIndex = 0

        for(let raffleInfo of raffleInfoList) {
            sumWinNum += raffleInfo.winNum
        }

        if(sumWinNum <= entries.length) {
            const shuffledEntries = shuffle(entries.map((entry) => entry.name))

            setRaffleInfoList((prevList) => {
                return prevList.map((raffleInfo) => {
                    const winners = shuffledEntries.slice(currentIndex, currentIndex + raffleInfo.winNum)

                    currentIndex += raffleInfo.winNum

                    return { ...raffleInfo, winners: winners }
                })
            })
        } else {
            setIsValidation(false)
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
                    <div>
                        <Button className="btn-raffle">
                            조건 초기화
                        </Button>
                        <Button className="btn-raffle" endIcon={<BiShuffle />} onClick={raffle}>
                            뽑기
                        </Button>
                    </div>
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

            <Snackbar
                open={!isValidation}
                onClose={() => setIsValidation(true)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{ transform: isNavOpen ? 'translateX(265px)' : 'none' }}>
                <Alert severity="error" sx={{ display: "flex", alignItems: "center" }}>
                    당첨자 수가 추첨 대상보다 많습니다.
                </Alert>
            </Snackbar>
        </div>
    )

}

export default Raffle