import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useOutletContext } from 'react-router-dom';

function StudentsPayFees() {
  const API_URL = import.meta.env.VITE_API_URL;
const studentDetails=useOutletContext()

const [data, setData] = useState([]);
console.log(studentDetails)
  useEffect(()=>{
    const payment=async()=>{
      const response=await axios.get(`${API_URL}/payments/paymentsall`)
    setData(response.data)
    let id
    if(values.age>18){
      data.map((value)=>{
        if(value.plan=="Adult")
        id=value._id
      })
    }else{
      data.map((value)=>{
        if(value.plan=="Child")
        id=value._id
      })

    }
    
    }
    payment()
  },[])
  return (
    <div>
      <h1>Payment </h1>
    </div>
  )
}

export default StudentsPayFees