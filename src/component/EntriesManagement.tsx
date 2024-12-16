import { useEffect, useRef, useState } from "react"
import { BiSolidEditAlt } from "react-icons/bi";
import { BiSolidEraser } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";

interface Props {
    entries: string[],
    setEntries: (entries: string[]) => void,
}

const EntriesManagement = ({ entries, setEntries }: Props) => {
    
    const inputEntry = useRef<HTMLInputElement>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [newEntry, setNewEntry] = useState<string>('')

    const columns = 2
    const rows = Array.from(
        { length: Math.ceil(entries.length / columns) },
        (_, index) =>  entries.slice(index * columns, index * columns + columns)
    )

    const insertEntry = (entry: string) => {
        if(entry.trim() !== '') {
            setEntries([...entries, entry])
            setNewEntry('')
        } else {
            setNewEntry('')
            inputEntry.current?.focus()
        }
    }

    const deleteEntry = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index))
    }

    const editEntry = (index: number) => {
        console.log('TODO HERE')
    }

    useEffect(() => {
        console.log(entries)
    }, [entries])

    return (
        <>
        <div>
            <h1>추첨 대상 목록</h1>
            <table>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((entry, index) => (
                                <td key={index}>
                                    {entry}
                                    <BiSolidEditAlt className="button" size={30} onClick={() => editEntry(rowIndex * columns + index)} />
                                    <BiSolidEraser className="button" size={30} onClick={() => deleteEntry(rowIndex * columns + index)} />
                                </td>
                            ))} 
                        </tr>
                    ))}
                </tbody>
            </table>
            <input
                type="text"
                value={newEntry}
                ref={inputEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onKeyDown={(e) => {e.key == 'Enter' && insertEntry(newEntry)}} />
            <BiPlusCircle className="button" size={30} onClick={() => insertEntry(newEntry)} />
        </div>
        </>
    )

}

export default EntriesManagement