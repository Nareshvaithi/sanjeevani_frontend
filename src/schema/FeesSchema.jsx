import * as Yup from "yup";

const FeesValidationSchema = Yup.object().shape({
    student_id: Yup.string().required("Student ID is required"),
    fullName: Yup.string().required("Student Name is required"),
    batch_Id: Yup.string().required("Batch selection is required"),
    fees_type: Yup.string().oneOf(["Monthly", "Quarterly", "Yearly"], "Invalid Fees Type").required("Fees Type is required"),
    payment_type: Yup.string().oneOf(["Cash", "Card", "UPI","Bank Transfer"], "Invalid Payment Type").required("Payment Method is required"),
    amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be a positive value")
        .required("Amount is required"),
});

export default FeesValidationSchema;
