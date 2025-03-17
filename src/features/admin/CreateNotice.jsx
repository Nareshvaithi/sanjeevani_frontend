import { FormControl, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { addStudentsNotice, fetchStudentsNotice } from "../../store/adminSlices/NoticeSlice";

const validationSchema = yup.object().shape({
    notice: yup.string().min(5, 'Minimum 5 characters required').required("Notice title is required"),
    remark: yup.string().min(5, 'Minimum 5 characters required').required("Notice remark is required"),
});

const CreateNotice = () => {

    const dispatch=useDispatch()
    const formik = useFormik({
        initialValues: {
            notice: '',
            remark: ''
        },
        validationSchema, 
        onSubmit: async(values) => {

            await dispatch(addStudentsNotice(values))
<<<<<<< HEAD
        dispatch(showToast({ message: "Notice Create Successfully!", type: "success" }));
=======
>>>>>>> refs/remotes/origin/main
            dispatch(fetchStudentsNotice())
            formik.resetForm()
        }
    });

    return (
        <section className="pt-10">
            <div className="bg-white px-3 py-3 rounded-lg w-full">
                <h1 className="titleText">Create Notice</h1>
                <form className="flex flex-col gap-5 py-5" onSubmit={formik.handleSubmit}>
                    <div>
                        <FormControl fullWidth>
                            <TextField
                                label="Title"
                                name="notice"
                                value={formik.values.notice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                error={Boolean(formik.errors.notice && formik.touched.notice)} // Fix
                                helperText={formik.touched.notice && formik.errors.notice} // Fix
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <TextField
                                label="Remark"
                                name="remark"
                                value={formik.values.remark}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                error={Boolean(formik.errors.remark && formik.touched.remark)} // Fix
                                helperText={formik.touched.remark && formik.errors.remark} // Fix
                            />
                        </FormControl>
                    </div>
                    <div className="w-full">
                        <button 
                            type="submit" 
                            className="bg-buttonblue hover:bg-white text-white hover:text-buttonblue border border-buttonblue transition-all duration-500 w-full py-2"
                        >
                            Post Notice
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateNotice;
