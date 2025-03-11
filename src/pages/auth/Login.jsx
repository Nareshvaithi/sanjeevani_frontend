import { useDispatch, useSelector } from "react-redux";
import { selectLoginImage, setLogin } from "../../store/authSlice/loginSlice";
import { TextField, FormControl, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { AccountCircle, Lock } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import { loginAdmin, loginUser } from "../../store/authSlice/AuthSlice";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";
import { fetchSingleStudent, selectSingleStudent } from "../../store/formSlices/StudentDetailsSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginImg = useSelector(selectLoginImage);
    const studentList = useSelector(selectAllStudents);
    const validationSchema = Yup.object({
        userName: Yup.string()
            .required("userName is required")
            .min(3, "userName must be at least 3 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });
    console.log(studentList);
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
            rememberMe: false, 
        },
        validationSchema,
        onSubmit: async (values) => {
            const resultAction = await dispatch(loginUser(values));
            
            if (loginUser.fulfilled.match(resultAction)) {
                console.log("Login Submitted:", values);
            alert('Login successfully');
            dispatch(setLogin());
            const user = studentList.find(({userName}) => userName === values.userName);
            const userId = user._id;
            console.log(userId);
            navigate(`/student/${userId}`);
            dispatch(fetchSingleStudent(userId));
            }else{
                const resultAction = await dispatch(loginAdmin(values));
                if(loginAdmin.fulfilled.match(resultAction)){
                    alert('Login successfully');
                    dispatch(setLogin());
                    navigate('/admin_dashboard');
                }else{
                    alert("user not found")
                }
               
            }
            
        },
        
    });

    return (
        <section className="flex justify-center items-center w-full h-auto lg:h-screen font-mainFont1">
            <div className="w-full lg:w-7/12 flex flex-col lg:flex-row gap-5 justify-between rounded-none lg:rounded-xl shadow-md shadow-black/20 ">
                {/* Left Side - Image */}
                <div className="w-full h-auto bg-themelightblue flex items-end rounded-none lg:rounded-xl lg:rounded-r-2xl">
                    <img src={loginImg} alt="Login" className="w-full h-fit object-contain" />
                </div>

                {/* Right Side - Login Form */}
                <form method="POST" className="w-full h-auto px-5 py-5 flex flex-col" onSubmit={formik.handleSubmit}>
                    {/* Heading */}
                    <div>
                        <h2 className="font-bold text-[22px]">Welcome to Sanjeevani Kathak School</h2>
                        <p className="text-sm text-gray-400">
                            Need an account? <span onClick={()=>{navigate('/student_registration')}} className="cursor-pointer text-themelightblue">Sign Up</span>
                        </p>
                    </div>

                    {/* Sign In Section */}
                    <div className="pt-5">
                        <h3 className="text-2xl font-bold">Sign in</h3>

                        <div className="flex flex-col items-center gap-5 pt-5">
                            {/* userName Field with Icon & Error Handling */}
                            <FormControl fullWidth>
                                <TextField
                                    label="userName"
                                    type="text"
                                    name="userName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.userName}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>

                            {/* Password Field with Icon & Error Handling */}
                            <FormControl fullWidth>
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </div>

                        {/* Remember Me & Forget Password */}
                        <div className="flex justify-between items-center pt-3">
                            {/* ✅ Correct Checkbox Usage */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        color="primary"
                                        checked={formik.values.rememberMe}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Remember me"
                            />
                            <p className="text-sm text-blue-500 cursor-pointer">Forgot Password?</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-auto w-full bg-themelightblue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
