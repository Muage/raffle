import { useState } from "react"
import { BiSave } from "react-icons/bi";
import { BiSolidEditAlt } from "react-icons/bi";
import { BiSolidEraser } from "react-icons/bi";
import { Entry } from "../models/Entry";

interface Props {
    entry: Entry,
    editEntry: (newEntry: Entry) => void,
    deleteEntry: (id: string) => void
}

const EntryItem = ({ entry, editEntry, deleteEntry }: Props) => {

    const [isEdit, setIsEdit] = useState<boolean>(false)

    return (
        <td>
            <div className="entry-item">
                {isEdit ? (
                    <>
                    <input
                        type="text"
                        value={entry.name}
                        onChange={(e) => {editEntry({ ...entry, name: e.target.value })}}
                    />
                    <BiSave className="button" size={30} onClick={() => setIsEdit(false)} />
                    </>
                ) : (
                    <>
                    {entry.name}
                    <BiSolidEditAlt className="button" size={30} onClick={() => setIsEdit(true)} />
                    </>
                )}
                <BiSolidEraser className="button btn-eraser" size={30} onClick={() => deleteEntry(entry.id)} />
            </div>
        </td>
    )

}

export default EntryItem