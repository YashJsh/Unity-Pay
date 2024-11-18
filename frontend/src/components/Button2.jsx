import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function Button2({label, to}){
    return <motion.div whileHover={{
        scale: 0.9}} > 
        <button className="px-4 py-2 text-sm font-medium text-center text-black bg-slate-200 rounded-lg hover:bg-slate-200 focus:outline-none  dark:bg-slate-200 dark:hover:bg-slate-300">
            <Link to={to}>{label}</Link>
        </button>
    </motion.div>
}

export function ButtonBlue2({label, to}){
    return <motion.div whileHover={{
        scale: 0.9}} > 
        <button className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 ">
            <Link to={to}>{label}</Link>
        </button>
    </motion.div>
}