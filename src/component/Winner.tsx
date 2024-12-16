import { useEffect, useState } from "react"

interface Props {
    entries: string[],
    setEntries: (entries: string[]) => void
}

const Winner = ({ entries, setEntries }: Props) => {
    const [winNum, setWinNum] = useState<number>(1)
    const [raffleEntry, setRaffleEntry] = useState<string[]>([])

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
        setRaffleEntry(shuffle(entries).splice(0, winNum))
    }

    useEffect(() => {
        setEntries(entries.filter((entry) => !raffleEntry.includes(entry)))
    }, [raffleEntry])

    return (
        <>
        <div>
            <input type="number"
                value={winNum}
                min={1}
                max={entries.length}
                onChange={(e) => setWinNum(Number(e.target.value))} />
            <button onClick={raffle}>Raffle</button>
        </div>
        <div>
            <h1>당첨자</h1>
            <ul>
                {raffleEntry.map((entry, index) => 
                    <li key={index}>
                        {entry}
                    </li>
                )}
            </ul>
        </div>
        </>
    )
}

export default Winner