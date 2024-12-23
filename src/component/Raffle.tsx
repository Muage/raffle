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
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

interface Props {
    className: string,
    entries: Entry[],
    isNavOpen: boolean
}

const Raffle = ({ className, entries, isNavOpen }: Props) => {

    const navigate = useNavigate()

    const [isValidation, setIsValidation] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
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

    const handleRaffle = () => {
        raffle

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            navigate('/winner')
        }, 3000)
    }

    const handleResetCondition = () => {
        setRaffleInfoList([{ id: uuid(), title: '', winNum: 1, winners: [] }])
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
            {isLoading ? (
                <Loading />
            ) : (
                <>
                <h1>{className}반 친구들</h1>

                <Grid2 container spacing={2} columns={7}>
                    {entries.map((entry) => (
                        <Grid2 key={entry.id} size={1} alignItems="center">
                            <div className="name-container">
                                <img src="images/star.png" alt="Star" width={30} />
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
                            <Button className="btn-reset" onClick={handleResetCondition}>
                                조건 초기화
                            </Button>
                            <Button className="btn-raffle" endIcon={<BiShuffle />} onClick={handleRaffle}>
                                뽑기
                            </Button>
                        </div>
                    }
                </div>

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
                </>
            )}
        </div>
    )

}

export default Raffle