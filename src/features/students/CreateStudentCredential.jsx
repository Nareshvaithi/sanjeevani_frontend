import { useState } from "react";
import { useFormik } from "formik";
import { TextField, FormControl, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userCredentialSchema } from "../../schema/userCredentialsSchema";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";
import { addStudentRecord } from "../../store/formSlices/RegisterFormSlice";

const CreateStudentCredentials = () => {
    const dispatch = useDispatch();
    const studentRecords = useSelector((state) => state.studentRecord);
    console.log(studentRecords);

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm_password: false,
    });

    const handleTogglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: userCredentialSchema,
        onSubmit: (values) => {
            console.log(values);
            dispatch(addStudentRecord(values));
            console.log("dispatch after");
            dispatch(setEnrollProcess('confirm'));
        }
    });

    const fields = {
        userName: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
        confirm_password: { label: "Confirm Password", type: "password" },
    };

    return (
        <section className="w-full flex flex-col items-center justify-center px-2">
            <h2 className="text-themedarkblue text-2xl">Register Student</h2>
            <form method="POST" onSubmit={formik.handleSubmit} className="w-full lg:w-1/3">
                {Object.keys(fields).map((field) => (
                    <div key={field} className="py-3">
                        <FormControl fullWidth>
                            <TextField
                                label={fields[field].label}
                                type={field.includes("password") && showPassword[field] ? "text" : fields[field].type}
                                name={field}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={field.includes("password") ? {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleTogglePassword(field)} edge="end">
                                                {showPassword[field] ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                } : {}}
                            />
                        </FormControl>
                        {formik.touched[field] && <span className="text-sm text-red-500">{formik.errors[field]}</span>}
                    </div>
                ))}
                <div className="flex justify-center py-5 gap-5">
                    <button type="submit" className="text-center py-2 px-5 rounded-lg bg-themelightblue text-white text-xl">Register</button>
                    <button type="button" onClick={formik.resetForm} className="text-center py-2 px-5 rounded-lg bg-green-400 text-white text-xl">Reset</button>
                </div>
            </form>
        </section>
    );
};

export default CreateStudentCredentials;
