import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { format } from "date-fns";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";


function AdminAttendance() {
  const currentMonth=format(new Date(), "MMMM");
  const [days, setDays] = useState(30);
  const [attendanceData, setAttendanceData] = useState({});
  const studentList=useSelector(selectAllStudents)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth || "January");

  const months = [
    {status:true, id: 1, month: "January", count: 31 },
    {status:true, id: 2, month: "February", count: 28 },
    {status:true, id: 3, month: "March", count: 31 },
    {status:false, id: 4, month: "April", count: 30 },
    {status:false, id: 5, month: "May", count: 31 },
    {status:false, id: 6, month: "June", count: 30 },
    {status:false, id: 7, month: "July", count: 31 },
    {status:true, id: 8, month: "August", count: 30 },
    {status:true, id: 9, month: "September", count: 31 },
    {status:true, id: 10, month: "October", count: 30 },
    {status:true, id: 11, month: "November", count: 31 },
    {status:true, id: 12, month: "December", count: 31 },
  ];
  useEffect(() => {
  
    months.map((value) => {
      if (selectedMonth == value.month) {
        setDays(value.count);
      }
    });
  }, [selectedMonth]);
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleClick=()=>{
    // console.log()
  }

  return (
    <div className="pt-20 w-full">
      <div>
        <div className="flex justify-evenly items-center gap-20">
          <p className="text-2xl">Students Attendance Record</p>
          <div className="">
            <select onChange={handleMonthChange} value={selectedMonth}>
              {months.map((value) => {
                return (
                  <>
                    <option value={value.month} key={value.month}>
                      {value.month}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          
        </div>
        <div className="mt-10 p-4 bg-white ">
          <table
            border="1"
            className="p-4 text-center"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead className="border  text-center bg-[#000380] text-white">
              <tr className="w-full border">
                <th className="border px-10">ID</th>
                <th className="border px-16">Name</th>
               
                {[...Array(days).keys()].map((day) => (
                  <th key={day} className="border   ">
                    <label  className="">
                     {day + 1}
                    </label>
                    </th>
                  ))}
                  <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
             {studentList.map((value)=>{
              
               return <>
               <tr className="h-10">
                <td className="border">{value.studentID}</td>
                <td className="border">{value.fullName}</td>          
                  {[...Array(days).keys()].map((day) => (
                        <td key={day} className="border">
                    <label key={day} className="">
                      <input type="checkbox" checked={attendanceData[student.studentID]?.[day] || false}  className="w-4 h-4 text-center"/>
                    </label>
                    </td>
                  ))}
             <td className="border"></td>
              </tr></>
             })}

              
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <div className="border px-4 bg-blue-600 text-white py-1 text-xl rounded-md" onClick={()=>handleClick()}><button type="submit">Save</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAttendance;
