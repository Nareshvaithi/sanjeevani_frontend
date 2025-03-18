import axios from "axios";
import React, { useEffect, useState } from "react";
import { parse,format } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

import { useDispatch } from "react-redux";
import { addPayment, fetchSingleStudent, setSingleStudentRecord } from "../../store/formSlices/StudentDetailsSlice";
import { showToast } from "../../store/tostifySlice";
import PaymentReceipt from "./PaymentReceipt";
import { showPaymentReceipt } from "../../store/studentSlices/PaymentReceiptSlice";
import { ulid } from 'ulid';

function StudentsPayFees() {
    const [show,setShow]=useState(false)
  const fullUlid = ulid();
  const shortUlid = parseInt(fullUlid.slice(0, 6), 36);
  const dispatch=useDispatch()
  const API_URL = import.meta.env.VITE_API_URL;
  const studentDetails = useOutletContext();
  const { error, isLoading, Razorpay } = useRazorpay();
  const [data, setData] = useState([]);

  useEffect(() => {
    const payment = async () => {
      const response = await axios.get(`${API_URL}/payments/paymentsall`);
      setData(response.data);
    };
    payment();
  }, []);

const handlePayment=async()=>{
  let id;
  if (data.age > 18) {
    data.map((value) => {
      if (value.plan == "Adult") id = value._id;
    });
  } else {
    data.map((value) => {
      if (value.plan == "Child") id = value._id;
    });
  }
  if (!id) throw new Error("Payment plan not found");
  const paidPayment = await axios.get(`${API_URL}/payments?_id=${id}`);
  console.log(paidPayment.data)
  const orderDetails={received_payment:paidPayment.data.amount,paymentOderID:paidPayment.data.id,_id:studentDetails._id}
  const handler = (response) => {
    const order = {
      ...orderDetails,
      paymentId: response.razorpay_payment_id,
    };
    dispatch(
      addPayment({
        ...orderDetails,
        paymentId: response.razorpay_payment_id,
      })
    
    );
    // dispatch(showPaymentReceipt({...orderDetails,
    //   paymentId: response.razorpay_payment_id,
    //  }))
    dispatch(showToast({ message: "Payment successfully!", type: "success" }));
 setShow(true)
    dispatch(fetchSingleStudent(studentDetails?._id))
     
  };

  const razorpayInstance = new Razorpay({
    ...paidPayment.data,
    key: "rzp_test_Rk1g9fTmim96jn",
    handler,
  });

  razorpayInstance.open();

}

    const parseAndFormatDate = (dateString) => {
    
      const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
      
     
      if (!isNaN(parsedDate)) {
        return format(parsedDate, "dd/MM/yyyy");
      }
      return "";
    };
  return (
    <div className=" p-4">
     
              <section title="Payment Details">
          <div className="flex justify-between items-center ">
            <h2 className="text-xl">Payment Details</h2>
            <h2 className="border bg-themeyellow text-white px-4 py-1 rounded-md cursor-pointer" onClick={handlePayment}>Fee Pay</h2>
          </div>
          <div className="mt-2">
            <table
              border="1"
              className="p-4 text-center text-gray-600"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead className="">
                <tr className="bg-[#000380] text-white h-14">
                  <th className="border">S.No</th>
                  <th className="border">Batch</th>
                  <th className="border">Fees Type</th>
                  <th className="border">Invoice No</th>
                  <th className="border">Paid Date</th>
                  <th className="border">Amount</th>
                  <th className="border">Payment Type</th>
                  <th className="border">Payment OrderID</th>
                  <th className="border">PaymentID</th>
                  <th className="border">Status</th>
                </tr>
              </thead>
              <tbody>
                {studentDetails.paymentRecords
                  ? studentDetails.paymentRecords.map((value, index) => {
                      const formattedDate = value.paid_date
                        ? parseAndFormatDate(value.paid_date)
                        : "";
                      return (
                        <>
                          <tr className="h-10">
                            <td className="border">{index + 1}</td>
                            <td className="border">{studentDetails.batchID}</td>
                            <td className="border">Monthly</td>
                            <td className="border">{value.invoiceNumber}</td>
                            <td className="border">{formattedDate}</td>
                            <td className="border">{value.received_payment ? value.received_payment : 0}</td>
                            <td className="border">{value.paymentId ? "UPI" : "Cash"}</td>
                            <td className="border">{value.paymentOderID ? value.paymentOderID : "cash"}</td>
                            <td className="border">{value.paymentId ? value.paymentId : "Cash"}</td>
                            <td className="border">{value.payment_status ? "Paid" : "unpaid"}</td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </section>
        <div className={`${show ? "block" : "hidden"} absolute top-20 left-1/3 bg-white `}>
            <PaymentReceipt show={show} setShow={setShow}  />
      </div>
    </div>
  );
}

export default StudentsPayFees;
