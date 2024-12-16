interface Props {
    title: string,
    winners: string[],
}

const Winner = ({ title, winners }: Props) => {
    return (
        <>
        <div>
            <h1 className="title">{title}</h1>
            <ul>
                {winners.map((winner, index) => 
                    <li key={index}>
                        {winner}
                    </li>
                )}
            </ul>
        </div>
        </>
    )
}

export default Winner