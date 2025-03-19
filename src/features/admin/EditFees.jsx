import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { setOpenModuleFees } from "../../store/adminSlices/feesSlice";

const EditFees = ()=>{
    const dispatch = useDispatch();
    return(
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl"
        >
            <div onClick={()=>{dispatch(setOpenModuleFees(null))}} className="absolute right-5 top-5 text-3xl cursor-pointer">&times;</div>

        </motion.div>
    )
}

export default EditFees;