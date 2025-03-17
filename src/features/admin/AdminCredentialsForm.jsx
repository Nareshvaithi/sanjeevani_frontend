import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAdminCredentialsField } from "../../store/authSlice/adminAuthSlice";
import { FormControl, TextField, FormHelperText, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { userCredentialSchema } from "../../schema/userCredentialsSchema";
import { useNavigate } from "react-router-dom";

const AdminCredentialsForm = () => {
    const fields = useSelector(selectAdminCredentialsField);
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState({});

    const handleTogglePassword = (fieldName) => {
        setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
    };

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: userCredentialSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
            navigate('/');
        },
    });

    return (
        <section className="w-full flex items-center justify-center px-2 font-mainFont1">
            <div className="w-full lg:w-1/3 text-center">
                <h2 className="py-5 text-themedarkblue text-2xl">Register Admin</h2>
                <form onSubmit={formik.handleSubmit} method="POST" className="w-full">
                    <div className="flex flex-col gap-5">
                        {fields.map((field) => (
                            <div key={field.id}>
                                <FormControl fullWidth error={formik.touched[field.name] && Boolean(formik.errors[field.name])}>
                                    <TextField
                                        name={field.name}
                                        label={field.label}
                                        type={field.type.includes("password") && showPassword[field.name] ? "text" : field.type}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        InputProps={field.type.includes("password") ? {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => handleTogglePassword(field.name)} edge="end">
                                                        {showPassword[field.name] ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        } : {}}
                                    />
                                    {formik.touched[field.name] && formik.errors[field.name] && (
                                        <FormHelperText>{formik.errors[field.name]}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                        ))}
                    </div>
                    <div className="py-5">
                        <Button
                            type="submit"
                            variant="contained"
                            className="bg-themedarkblue hover:bg-themelightblue"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AdminCredentialsForm;