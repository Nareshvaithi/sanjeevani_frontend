import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollProcess } from "../../store/studentSlices/studentsEnrollmentSlice";
import { addStudentRecord } from "../../store/formSlices/RegisterFormSlice";
import logo from "../../assets/images/sanjeevani.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { selectPaymentRecord } from "../../store/studentSlices/PaymentReceiptSlice";
import { useOutletContext } from "react-router-dom";
import { ulid } from 'ulid';

function PaymentReceipt() {
    const fullUlid = ulid();
  const shortUlid = parseInt(fullUlid.slice(0, 6), 36);
  const dispatch = useDispatch();
 
 
  const studentDetails = useOutletContext();
 
  const paymentRecords=studentDetails.paymentRecords
  console.log("paymentRecords",paymentRecords)

  const receiptRef = useRef();
  const downloadReceipt = () => {
    const input = receiptRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Receipt_${day}_${month}_${year}.pdf`);
    });
  };
  const months = {
    1: "January", 
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return (
    <div className="flex justify-center">
      
      <div className="border shadow-lg py-4 px-2">
      <div
        ref={receiptRef}
        className="flex justify-center  px-6  border border-black py-4 "
      >
        <div>
          <div className="flex justify-center">
          <div className="w-40 object-cover flex justify-center ">
            <img src={logo} className="w-full h-full" alt="" />
          </div>
          </div>
          <div className="mt-4">
            <p className="text-center text-xl">
              Salmas Amar Enclave, Vigneshwar Nagar,{" "}
            </p>
            <p className="text-center text-xl">
              Balaji Nagar, Nanga Nallur, Chennai, Tamil Nadu 600 061.
            </p>
            <p className="text-center text-2xl mt-4 font-semibold">
              FEES RECEIPT
            </p>
            <div className="text-md">
              {/* <p>Receipt No: {paymentRecords.invoiceNumber}</p> */}
              <p>Date:{`${day}/${month}/${year}`}</p>
              {/* <div className="mt-4">
                <p>
                  Received with thanks from {`${studentDetails.fullName}`} for
                  the month of {`${months[today.getMonth() + 1]}`} for
                </p>
                <p>
                  Student Batch 1 an amount of ₹{" "}
                  {`${Math.floor(Number(paymentRecords.received_payment) / 100)}`}
                </p>
                <p>Payment Mode: {paymentRecords.paymentId ? "UPI" : "Cash"}</p>
              </div> */}
              <div className="mt-4">
                <p>Signature</p>
                <p>Durga Ramkishnan</p>
                <p>Sanjeevani school of dance</p>
                <p>1234567890</p>
              </div>
            </div>

          </div>
          
        </div>

      </div>
      <div className="flex justify-center gap-4">
                <button
                  onClick={downloadReceipt}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow curser-pointer"
                >
                  Download Receipt
                </button>
                {/* <button className="mt-4 px-4 py-2 bg-green-400 text-white rounded shadow curser-pointer" onClick={()=>dispatch(setEnrollProcess("userCredential"))}>Next</button> */}
              </div>
              </div>
    </div>
  );
}




export default PaymentReceipt