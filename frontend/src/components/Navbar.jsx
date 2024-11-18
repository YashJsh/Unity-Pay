import { Button2 } from "./Button2"
import { Link } from "react-router-dom"

export function Navbar({label, label2, label3, to, to2, to3}){
    return (
        <div className = "flex h-[8vh] justify-between px-[3vw] text-center py-[1.5vh] border-b-[1px]">
            <h1 className = "text-lg font-semibold">Unity Pay</h1>
            <div className="flex items-center justify-center gap-5">
                <Link to={to2} className="text-sm font-medium">{label2}</Link>
                <Link to={to3} className="text-sm font-medium">{label3}</Link>
                <Button2 label = {label} to = {to}/>
            </div>
        </div>
    )

}