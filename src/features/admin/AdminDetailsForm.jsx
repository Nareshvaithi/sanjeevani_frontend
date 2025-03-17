import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAdminDetailsField, setAdminRegProcess } from "../../store/authSlice/adminAuthSlice";
import { useFormik } from "formik";
import { parse, differenceInYears } from "date-fns";
import { AdminRegSchema } from "../../schema/AdminRegSchema";

const AdminDetailsForm = () => {
    const fields = useSelector(selectAdminDetailsField);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            gender: '',
            dob: '',
            age: '',
            email: '',
            profile_picture: null,
        },
        validationSchema: AdminRegSchema,
        onSubmit: (values) => {
     
            dispatch(setAdminRegProcess('userCredentials'));
        },
    });

    const handleFileChange = (event) => {
        formik.setFieldValue("profile_picture", event.currentTarget.files[0]);
    };

    const calculateAge = (dob) => {
        if (!dob) return "";
        const birthDate = parse(dob, "yyyy-MM-dd", new Date());
        const age = differenceInYears(new Date(), birthDate);
        return age.toString();
    };

    const handleDobChange = (event) => {
        const dob = event.target.value;
        formik.setFieldValue("dob", dob); // Update the dob field
        const age = calculateAge(dob); // Calculate age
        formik.setFieldValue("age", age); // Set the calculated age
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg p-2 lg:p-8 max-w-4xl w-full">
                <h2 className="text-2xl font-bold text-themedarkblue text-center mb-5">
                    Sanjeevani Admin Registration Form
                </h2>
                <form
                    method="POST"
                    className="w-full h-full"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">

                    {fields.map((field) => {
                        if (field.type === 'select') {
                            return (
                                <div key={field.id} className="w-full">
                                <FormControl key={field.id} fullWidth error={formik.touched[field.name] && Boolean(formik.errors[field.name])}>
                                    <InputLabel>{field.label}</InputLabel>
                                    <Select
                                        label={field.label}
                                        name={field.name}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        {field.options.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched[field.name] && formik.errors[field.name] && (
                                        <FormHelperText>{formik.errors[field.name]}</FormHelperText>
                                    )}
                                </FormControl>
                                </div>
                            );
                        } else if (field.type === 'file') {
                            return (
                                <div key={field.id}>
                                <FormControl fullWidth error={formik.touched[field.name] && Boolean(formik.errors[field.name])}>
                                    <input
                                        type="file"
                                        id={field.name}
                                        name={field.name}
                                        onChange={handleFileChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched[field.name] && formik.errors[field.name] && (
                                        <FormHelperText>{formik.errors[field.name]}</FormHelperText>
                                    )}
                                </FormControl>
                                </div>
                            );
                        } else {
                            return (
                                <div key={field.id}>
                                <FormControl fullWidth error={formik.touched[field.name] && Boolean(formik.errors[field.name])}>
                                    <TextField
                                        label={field.label}
                                        type={field.type}
                                        name={field.name}
                                        value={formik.values[field.name]}
                                        onChange={field.name === 'dob' ? handleDobChange : formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        InputLabelProps={{
                                            shrink: field.type === 'date' ? true : undefined,
                                        }}
                                        InputProps={{
                                            readOnly: field.name === 'age', // Make age field read-only
                                        }}
                                    />
                                    {formik.touched[field.name] && formik.errors[field.name] && (
                                        <FormHelperText>{formik.errors[field.name]}</FormHelperText>
                                    )}
                                </FormControl>
                                </div>
                            );
                        }
                    })}
                    </div>
                    <div className="col-span-2 flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-themedarkblue text-white px-6 py-2 rounded-lg hover:bg-themelightblue transition duration-300"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDetailsForm;