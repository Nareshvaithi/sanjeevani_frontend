import { useState, useEffect } from "react";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { sendOTP, validOTP } from "../../store/authSlice/ResetPasswordSlice";

const ForgotPasswordPopup = ({ forgotPass, setForgotPass }) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
 const dispatch=useDispatch()
  // Validation Schema
  const validationSchema = Yup.object({ 
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    otp: Yup.string()
      .when("showOtpInput", {
        is: true,
        then: Yup.string()
          .required("OTP is required")
          .matches(/^\d{4}$/, "OTP must be exactly 4 digits"),
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (showOtpInput) {
        console.log("OTP submitted:", values.otp);
        dispatch(validOTP(values.otp))
       
      } else {
        console.log("Email submitted:", values.email);
        dispatch(sendOTP(values.email))
        setShowOtpInput(true);
        setIsTimerRunning(true);
        formik.handleReset;
      }
    }
  });

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      setShowOtpInput(false);
      setForgotPass(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-end lg:items-center justify-center bg-black/20 p-5 z-[999]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-5 bg-white rounded-md w-1/3"
      >
        <div>
          <form method="POST" onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
              {!showOtpInput ? (
                <>
                  <TextField
                    label={"Enter Your Registered Email"}
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </>
              ) : (
                <>
                  <TextField
                    label={"Enter OTP"}
                    name="otp"
                    value={formik.values.otp}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                    helperText={formik.touched.otp && formik.errors.otp}
                  />
                  <FormHelperText>Time remaining: <b>{formatTime(timer)}</b> to OTP Expired</FormHelperText>
                </>
              )}
            </FormControl>
            <div className="pt-5 flex items-center gap-5 justify-center">
              <button type="submit" className="bg-buttonblue hover:bg-white text-white border hover:text-buttonblue border-buttonblue p-2 rounded-lg">
                {showOtpInput ? "Submit OTP" : "Send OTP"}
              </button>
              <button onClick={() => setForgotPass(false)} className="bg-red-500 hover:bg-white text-white border hover:text-red-500 border-red-500 p-2 rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default ForgotPasswordPopup;