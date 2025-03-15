import { motion } from "framer-motion";
import { setOpenModuleFees } from "../../store/adminSlices/feesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { FormControl, Select, TextField, MenuItem, FormHelperText } from "@mui/material";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";
import FeesValidationSchema from "../../schema/FeesSchema";
import { showToast } from "../../store/tostifySlice";

const AddFees = () => {
    const dispatch = useDispatch();
    const studentsList = useSelector(selectAllStudents);

    const batchOptions = [...new Set(studentsList.map(({ batchID }) => batchID))];

    const formik = useFormik({
        initialValues: {
            student_id: "",
            fullName: "",
            batch_Id: "",
            fees_type: "Monthly",
            payment_type: "Cash",
            amount: "",
        },
        validationSchema: FeesValidationSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(showToast({ message: "Fees added successfully!", type: "success" }));
        },
    });

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-screen lg:w-1/2 h-screen bg-white shadow-lg z-50 overflow-y-auto rounded-none lg:rounded-l-xl"
        >
            <button
                onClick={() => dispatch(setOpenModuleFees(null))}
                className="absolute top-5 right-5 text-3xl font-bold cursor-pointer"
            >
                &times;
            </button>
            <div className="p-5 font-mainFont1">
                <h3 className="text-2xl pb-5">Add Student Fees</h3>
            </div>
            <form onSubmit={formik.handleSubmit} method="POST" className="px-5">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Student ID */}
                    <FormControl fullWidth error={formik.touched.student_id && Boolean(formik.errors.student_id)}>
                        <TextField
                            label="Student Id"
                            name="student_id"
                            id="student_id"
                            value={formik.values.student_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText>{formik.touched.student_id && formik.errors.student_id}</FormHelperText>
                    </FormControl>

                    {/* Student Name */}
                    <FormControl fullWidth error={formik.touched.fullName && Boolean(formik.errors.fullName)}>
                        <TextField
                            label="Student Name"
                            name="fullName"
                            id="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText>{formik.touched.fullName && formik.errors.fullName}</FormHelperText>
                    </FormControl>

                    {/* Batch Selection */}
                    <FormControl fullWidth error={formik.touched.batch_Id && Boolean(formik.errors.batch_Id)}>
                        <Select
                            name="batch_Id"
                            id="batch_Id"
                            value={formik.values.batch_Id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Select Batch
                            </MenuItem>
                            {batchOptions.map((batch) => (
                                <MenuItem key={batch} value={batch}>
                                    {batch}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.batch_Id && formik.errors.batch_Id}</FormHelperText>
                    </FormControl>

                    {/* Fees Type Selection */}
                    <FormControl fullWidth error={formik.touched.fees_type && Boolean(formik.errors.fees_type)}>
                        <Select
                            name="fees_type"
                            id="fees_type"
                            value={formik.values.fees_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Fees Type</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Quarterly">Quarterly</MenuItem>
                            <MenuItem value="Annually">Annually</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.fees_type && formik.errors.fees_type}</FormHelperText>
                    </FormControl>

                    {/* Payment Method Selection */}
                    <FormControl fullWidth error={formik.touched.payment_type && Boolean(formik.errors.payment_type)}>
                        <Select
                            name="payment_type"
                            id="payment_type"
                            value={formik.values.payment_type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Payment Method</MenuItem>
                            <MenuItem value="Cash">Cash</MenuItem>
                            <MenuItem value="Card">Card</MenuItem>
                            <MenuItem value="UPI">UPI</MenuItem>
                            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.payment_type && formik.errors.payment_type}</FormHelperText>
                    </FormControl>
                    {/* Fees Amount */}
                    <FormControl fullWidth error={formik.touched.amount && Boolean(formik.errors.amount)}>
                        <TextField
                            label="Fees Amount"
                            value={formik.values.amount}
                            name="amount"
                            id="amount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText>{formik.touched.amount && formik.errors.amount}</FormHelperText>
                    </FormControl>

                    {/* Buttons */}
                    <div className="flex items-center gap-5">
                        <button
                            type="submit"
                            className="bg-green-500 text-white hover:text-green-500 hover:bg-white border border-green-500 transition-all duration-500 px-5 py-2 rounded-lg"
                        >
                            Add Fees
                        </button>
                        <button
                            type="button"
                            onClick={() => dispatch(setOpenModuleFees(null))}
                            className="bg-red-500 text-white hover:text-red-500 hover:bg-white border border-red-500 transition-all duration-500 px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default AddFees;
