import { motion } from "framer-motion";

const DeletePopup = ({name,showDel,setShowDel})=>{
    return(
        <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="absolute inset-0 flex items-end lg:items-center justify-center bg-black/10 p-5 z-[999]"
>
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-5 bg-white rounded-md w-full max-w-sm"
    >
        <h3 className="py-5 text-sm lg:text-lg">
            Are you sure you want to delete <span className="font-bold">&quot;{name}&quot;</span>?
        </h3>
        <div className="flex justify-center gap-5 items-center">
            <button
                onClick={() => setShowDel(false)}
                className="bg-red-500 hover:bg-white hover:text-red-500 border border-red-500 px-5 py-1 text-white transition-all duration-300"
            >
                Delete
            </button>
            <button
                onClick={() => setShowDel(false)}
                className="hover:bg-themeskyblue hover:text-white border border-themeskyblue px-5 py-1 text-themeskyblue transition-all duration-300"
            >
                Cancel
            </button>
        </div>
    </motion.div>
</motion.div>

)}
    
export default DeletePopup;