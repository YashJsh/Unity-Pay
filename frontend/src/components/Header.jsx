
import { ButtonBlue2 } from "./Button2"

export function Header({label, label2, to}){
    return <div className = "flex h-[8vh] justify-between px-[3vw] text-center py-[1.5vh]  border-b-[1px]">
        <h1 className = "text-lg font-semibold">{label}</h1>
        <ButtonBlue2 label = {label2} to = {to}/>
    </div>
}