export function EntryField({label, placeholder, onChange, height}){
    return <div className = "flex flex-col gap-2" >
        <div className="text-sm font-medium px-2 ">{label}</div>
        <input onChange = {onChange} type="text " placeholder={placeholder} className={`text-sm px-2 py-2 border-[1px] rounded-lg ${height}
        w-[20vw]`} />
        </div>
}

