import {motion} from "framer-motion"

export function Welcome({label}){
    return (
        <div className="flex flex-col items-center jus ctify-center gap-2 mb-3">
            <motion.h1 whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }} className="title font-light text-lg">Hey </motion.h1>
            <motion.h1 whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}className="title font-semibold text-6xl">Welcome Back</motion.h1>
            <motion.h1 whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}className="title font-normal text-2xl">{label}</motion.h1>
        </div>
    )
}