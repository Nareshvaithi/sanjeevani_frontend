import {motion} from "framer-motion";
import { setOpenModuleFees } from "../../store/adminSlices/feesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { FormControl, Select, TextField } from "@mui/material";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";

const AddFees = ()=>{
    
    const dispatch = useDispatch();
    const studentsList = useSelector(selectAllStudents);
    const batchOptions = [...new Set(studentsList.map(({batchId}) => batchId))];
    console.log(batchOptions);
    const formik = useFormik({
        initialValues:{
            student_id:'',
            fullName:'',
            batch_Id:'',
            fees_type:'Monthly',
            payment_type:'Cash',
            amount:'',
        }
    });
    return (
        <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl"
        >
            <button onClick={()=>dispatch(setOpenModuleFees(null))} className="absolute top-5 right-5 text-3xl font-bold cursor-pointer">
                &times;
            </button>
            <div className="p-5 font-mainFont1">
                <h3 className="text-2xl pb-5">Add Student Fees</h3>
            </div>
            <form method="POST" className="px-5">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <FormControl fullWidth>
                            <TextField
                                label={"Student Id"}
                                value={formik.values.student_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <TextField
                                label={"Student Name"}
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <Select

                        />
                    </div>
                </div>
            </form>
            
        </motion.div>
    )
}

export default AddFees;