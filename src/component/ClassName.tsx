interface Props {
    className: string,
    setClassName: React.Dispatch<React.SetStateAction<string>>
}

const ClassName = ({ className, setClassName }: Props) => {

    return (
        <>
        <h2>반 이름을 작성해주세요!</h2>
        <input type="text" placeholder="" value={className} onChange={(e) => setClassName(e.target.value)} /> 반
        </>
    )
}

export default ClassName