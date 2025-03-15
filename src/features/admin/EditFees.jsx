import { motion } from "framer-motion"

const EditFees = ()=>{
    return(
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl"
        >
            <div className="absolute left-5 top-5"></div>

        </motion.div>
    )
}

export default EditFees;