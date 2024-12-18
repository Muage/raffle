import { RaffleInfo } from "../models/Raffle"
import { Entry } from "../models/Entry";
import { BiMinusCircle } from "react-icons/bi";
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
    entries: Entry[],
    raffleInfo: RaffleInfo,
    updateRaffleInfoList: (id: string, updateInfo: Partial<RaffleInfo>) => void,
    removeRaffleTitle: (id: string) => void,
}

const ITEM_HEIGHT = 50
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    }
}

const RaffleCondition = ({ entries, raffleInfo, updateRaffleInfoList, removeRaffleTitle }: Props) => {

    const handleWinNum = (event: SelectChangeEvent<number>) => {
        updateRaffleInfoList(raffleInfo.id, { winNum: Number(event.target.value) })
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateRaffleInfoList(raffleInfo.id, { title: event.target.value })
    }

    return (
        <>
        <Box
            className="content-condition"
            sx={{ 
                height: 60,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" }
            }}>
            <Select
                className="content-select"
                value={raffleInfo.winNum}
                onChange={handleWinNum}
                size="small"
                MenuProps={MenuProps}
                sx={{
                    minWidth: 110,
                    borderRight: "1px solid #ced4da",
                }}>
                {entries.map((entry, index) => (
                    <MenuItem key={entry.id} value={index + 1} className="content-select-item">{index + 1}</MenuItem>
                ))}
            </Select>
            <TextField
                value={raffleInfo.title}
                onChange={handleTitle}
                className="content-input"
                size="small"
                placeholder="제목" />
            <BiMinusCircle size={30} className="button btn-eraser" onClick={() => removeRaffleTitle(raffleInfo.id)} />
        </Box>
        </>
    )

}

export default RaffleCondition