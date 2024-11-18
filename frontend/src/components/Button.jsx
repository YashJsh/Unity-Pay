import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function Button({label, onClick}){
    return <motion.div whileHover={{
            scale: 0.9,}} > 
        <button onClick = {onClick} className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 " >
            {label}
        </button>
    </motion.div>
}

export function SendButton({label, onClick, to}){
    return <motion.div whileHover={{
        scale: 0.9}} > 
        <button onClick = {onClick} className="px-4 w-[20vw] py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 " >
            <Link to={to}>{label}</Link>
        </button>
    </motion.div>
}