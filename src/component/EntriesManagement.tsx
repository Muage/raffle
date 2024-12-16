import { useEffect, useRef, useState } from "react"
import { BiPlusCircle } from "react-icons/bi";
import { Entry } from "../models/Entry";
import { v4 as uuid } from 'uuid'
import EntryItem from "./EntryItem";

interface Props {
    entries: Entry[],
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
}

const EntriesManagement = ({ entries, setEntries }: Props) => {
    
    const inputEntry = useRef<HTMLInputElement>(null)
    const [name, setName] = useState<string>('')

    const columns = 2
    const rows = Array.from(
        { length: Math.ceil(entries.length / columns) },
        (_, index) =>  entries.slice(index * columns, index * columns + columns)
    )

    const insertEntry = (name: string) => {
        if(name.trim() !== '') {
            const newEntry: Entry = { id: uuid(), name: name, winStatus: false }
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
        <>
        <div>
            <h1>추첨 대상 목록</h1>
            <table>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((entry) => (
                                <EntryItem key={entry.id} entry={entry} editEntry={editEntry} deleteEntry={deleteEntry} />
                            ))} 
                        </tr>
                    ))}
                </tbody>
            </table>
            <input
                type="text"
                value={name}
                ref={inputEntry}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {e.key == 'Enter' && insertEntry(name)}} />
            <BiPlusCircle className="button" size={30} onClick={() => insertEntry(name)} />
        </div>
        </>
    )

}

export default EntriesManagement