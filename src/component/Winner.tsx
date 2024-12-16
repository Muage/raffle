interface Props {
    title: string,
    winners: string[],
}

const Winner = ({ title, winners }: Props) => {
    return (
        <>
        <h1>{title}</h1>
        <ul>
            {winners.map((winner, index) => 
                <li key={index}>
                    {winner}
                </li>
            )}
        </ul>
        </>
    )
}

export default Winner