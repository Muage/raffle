import { useEffect, useState } from "react"
import Winner from "./Winner"
import { RaffleInfo } from "../models/Raffle"
import { BiMinusCircle } from "react-icons/bi";

interface Props {
    entries: string[],
    raffleInfo: RaffleInfo,
    updateRaffleInfoList: (id: string, updateInfo: Partial<RaffleInfo>) => void,
    removeRaffleTitle: (id: string) => void,
}

const RaffleTitle = ({ entries, raffleInfo, updateRaffleInfoList, removeRaffleTitle }: Props) => {

    const handleWinNum = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateRaffleInfoList(raffleInfo.id, { winNum: Number(event.target.value) })
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateRaffleInfoList(raffleInfo.id, { title: event.target.value })
    }

    return (
        <>
        <div className="content-title">
            <select value={raffleInfo.winNum} onChange={handleWinNum}>
                {entries.map((_, index) => (
                    <option key={index} value={index + 1}>{index + 1}</option>
                ))}
            </select>
            <input type="text" value={raffleInfo.title} onChange={handleTitle} />
            <BiMinusCircle size={30} onClick={() => removeRaffleTitle(raffleInfo.id)} />
        </div>
        {/* <Winner /> */}
        </>
    )

}

export default RaffleTitle