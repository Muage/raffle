import { useEffect, useRef, useState } from "react"
import { BiPlusCircle } from "react-icons/bi"
import { Entry } from "../models/Entry"
import { v4 as uuid } from 'uuid'
import EntryItem from "./EntryItem"
import '../assets/css/entry.css'
import { Alert, Box, Grid2, Snackbar, TextField } from "@mui/material"

interface Props {
    className: string,
    entries: Entry[],
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
}

const EntriesManagement = ({ className, entries, setEntries }: Props) => {
    
    const inputEntry = useRef<HTMLInputElement>(null)
    const [name, setName] = useState<string>('')
    const [isValidation, setIsValidation] = useState<boolean>(true)

    const insertEntry = (name: string) => {
        if(name.trim() !== '') {
            setIsValidation(true)
            const newEntry: Entry = { id: uuid(), name: name }
            setEntries((prevEntries) => [...prevEntries, newEntry])
            setName('')
        } else {
            setName('')
            setIsValidation(false)
            inputEntry.current?.focus()
        }
    }

    const editEntry = (newEntry: Entry) => {
        setEntries(entries.map((entry) => {
            if(entry.id === newEntry.id) {
                return newEntry
            } else {
                return entry
            }
        }))
    }

    const deleteEntry = (id: string) => {
        setEntries(entries.filter((entry) => entry.id !== id))
    }

    return (
        <Box>
            <Grid2 className="container" container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid2>
                    <h1>{className}반 친구들</h1>
                </Grid2>
                <Grid2 offset={'auto'}>
                    <TextField
                        label="새 친구 이름"
                        value={name}
                        inputRef={inputEntry}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {e.key == 'Enter' && insertEntry(name)}}
                        sx={{
                            "&.Mui-focused fieldset": { borderWidth: "500px" },
                            "& .MuiOutlinedInput-notchedOutline legend": { width: "110px" }
                        }} />
                </Grid2>
                <Grid2>
                    <BiPlusCircle className="button" size={30} onClick={() => insertEntry(name)} />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2} columns={4}>
                {entries.map((entry) => (
                    <EntryItem key={entry.id} entry={entry} editEntry={editEntry} deleteEntry={deleteEntry} />
                ))}
            </Grid2>

            <Snackbar
                open={!isValidation}
                onClose={() => setIsValidation(true)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert severity="error" sx={{ display: "flex", alignItems: "center" }}>
                    이름을 입력해주세요.
                </Alert>
            </Snackbar>
        </Box>
    )

}

export default EntriesManagement