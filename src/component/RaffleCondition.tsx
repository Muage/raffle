import { RaffleInfo } from "../models/Raffle"
import { Entry } from "../models/Entry";
import { BiMinusCircle } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";

interface Props {
    entries: Entry[],
    raffleInfo: RaffleInfo,
    showBtnPlus: boolean,
    updateRaffleInfoList: (id: string, updateInfo: Partial<RaffleInfo>) => void,
    removeRaffleTitle: (id: string) => void,
    addRaffleTitle: () => void
}

const RaffleCondition = ({ entries, raffleInfo, showBtnPlus, updateRaffleInfoList, removeRaffleTitle, addRaffleTitle }: Props) => {

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
                {entries.map((entry, index) => (
                    <option key={entry.id} value={index + 1}>{index + 1}</option>
                ))}
            </select>
            <input type="text" value={raffleInfo.title} onChange={handleTitle} />
            <BiMinusCircle size={30} className="button btn-eraser" onClick={() => removeRaffleTitle(raffleInfo.id)} />
            {showBtnPlus && <BiPlusCircle className="button" size={30} onClick={addRaffleTitle} />}
        </div>
        </>
    )

}

export default RaffleCondition