import { useEffect, useRef, useState } from "react"
import { BiPlusCircle } from "react-icons/bi"
import { Entry } from "../models/Entry"
import { v4 as uuid } from 'uuid'
import EntryItem from "./EntryItem"
import '../assets/css/entry.css'
import { Box, Grid2, TextField } from "@mui/material"

interface Props {
    entries: Entry[],
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
}

const className = '무도'

const EntriesManagement = ({ entries, setEntries }: Props) => {
    
    const inputEntry = useRef<HTMLInputElement>(null)
    const [name, setName] = useState<string>('')

    const insertEntry = (name: string) => {
        if(name.trim() !== '') {
            const newEntry: Entry = { id: uuid(), name: name }
            setEntries((prevEntries) => [...prevEntries, newEntry])
            setName('')
        } else {
            setName('')
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
            <h1>{className}반 친구들</h1>

            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {entries.map((entry) => (
                    <EntryItem key={entry.id} entry={entry} editEntry={editEntry} deleteEntry={deleteEntry} />
                ))}
            </Grid2>

            <div className="input-container">
                <TextField
                    label="새 친구 이름"
                    value={name}
                    ref={inputEntry}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {e.key == 'Enter' && insertEntry(name)}} />
                {/* <input
                    type="text"
                    value={name}
                    ref={inputEntry}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {e.key == 'Enter' && insertEntry(name)}} /> */}
                <BiPlusCircle className="button" size={30} onClick={() => insertEntry(name)} />
            </div>
        </Box>
    )

}

export default EntriesManagement