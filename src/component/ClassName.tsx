import { Alert, Button, Snackbar } from "@mui/material"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
    className: string,
    setClassName: React.Dispatch<React.SetStateAction<string>>,
    setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ClassName = ({ className, setClassName, setIsNavOpen }: Props) => {

    const navigate = useNavigate()

    const inputClass = useRef<HTMLInputElement>(null)
    const [isValidation, setIsValidation] = useState<boolean>(true)

    const handleIsFirst = () => {
        if(className.trim() !== '') {
            setIsValidation(true)
            setIsNavOpen(true)
            sessionStorage.setItem('class-name', className)
            navigate('/entries')
        } else {
            setClassName('')
            setIsValidation(false)
            inputClass.current?.focus()
        }
    }

    return (
        <div className="container-class">
            <h2>반 이름을 작성해주세요!</h2>

            <div className="row-input">
                <input
                    type="text"
                    placeholder="무한도전"
                    className="input-class"
                    value={className}
                    ref={inputClass}
                    onChange={(e) => setClassName(e.target.value)}
                    onKeyDown={(e) => {e.key === 'Enter' && handleIsFirst()}} />
                <span>반</span>
            </div>

            <div className="row-btn">
                <Button
                    className="btn-start"
                    variant="outlined"
                    onClick={handleIsFirst}>
                    <span>뽑기 하러 가기</span>
                </Button>
            </div>

            <Snackbar
                open={!isValidation}
                onClose={() => setIsValidation(true)}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Alert severity="error" sx={{ display: "flex", alignItems: "center" }}>
                    반 이름을 입력해주세요.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ClassName