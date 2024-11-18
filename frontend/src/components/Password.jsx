export function Password({label, placeholder, onChange}){
    return <div>
        <div className = "flex flex-col gap-2" >
        <div className="text-sm font-medium px-2 ">{label}</div>
        <input onChange = {onChange} type="password" placeholder={placeholder} className="text-sm px-2 py-2 border-[1px] rounded-md
        w-[20vw]"/>
        </div>
    </div>
}