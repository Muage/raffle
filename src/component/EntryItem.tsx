import { useEffect, useRef, useState } from "react"
import { BiSave } from "react-icons/bi";
import { BiSolidEditAlt } from "react-icons/bi";
import { BiSolidEraser } from "react-icons/bi";
import { Entry } from "../models/Entry";
import { Card, CardContent, Grid2 } from "@mui/material";

interface Props {
    entry: Entry,
    editEntry: (newEntry: Entry) => void,
    deleteEntry: (id: string) => void
}

const EntryItem = ({ entry, editEntry, deleteEntry }: Props) => {

    const inputEntry = useRef<HTMLInputElement>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleEditKeyDown = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            editEntry({ ...entry, name: entry.name })
            setIsEdit(false)
        }
    }

    useEffect(() => {
        if (isEdit && inputEntry.current) {
            inputEntry.current.focus()
        }
    }, [isEdit])

    return (
        <Grid2 size={3}>
            <Card variant="outlined">
                <CardContent className="entry-item">
                    <div className="entry-item-left">
                        {isEdit ? (
                            <input
                                type="text"
                                className="entry-input"
                                value={entry.name}
                                ref={inputEntry}
                                onChange={(e) => {editEntry({ ...entry, name: e.target.value })}}
                                onKeyDown={handleEditKeyDown}
                                onBlur={() => setIsEdit(false)} />
                        ) : (
                            <div className="entry-name">
                                {entry.name}
                            </div>
                        )}
                    </div>
                    <div className="entry-item-right">
                        {isEdit ? (
                            <BiSave className="button" size={30} onClick={() => setIsEdit(false)} />
                        ) : (
                            <BiSolidEditAlt className="button" size={30} onClick={() => setIsEdit(true)} />
                        )}
                    </div>
                    <BiSolidEraser className="button btn-eraser" size={30} onClick={() => deleteEntry(entry.id)} />
                </CardContent>
            </Card>
        </Grid2>
    )

}

export default EntryItem