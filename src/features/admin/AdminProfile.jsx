import { motion } from "framer-motion"
const AdminProfile = ({openProfile,setOpenProfile})=>{
    return(
        <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl font-mainFont1"
      >
        <button onClick={()=>{setOpenProfile(null)}} className="text-3xl font-bold absolute right-5 top-5">
            &times;
        </button>
        <div>
            
        </div>
    </motion.div>
    )
}

export default AdminProfile;