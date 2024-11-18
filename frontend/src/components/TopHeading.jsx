export function TopHeading({label, subHeading}){
    return <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-xl">{label}</h1>
        <h3 className="font-normal text-xs">{subHeading}</h3>
    </div>
}