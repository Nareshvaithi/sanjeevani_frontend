import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextProvide } from "../../Context";

function AdminAttendance() {
  const { month } = useContext(ContextProvide);
  const [days, setDays] = useState(30);
  const [selectedMonth, setSelectedMonth] = useState(month || "January");

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

  return (
    <div className="pt-20 w-full">
      <div>
        <div className="flex justify-center text-2xl gap-20">
          <p>Students Attendance Record</p>
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
                  <th className="border   ">
                    <label key={day} className="">
                     {day + 1}
                    </label>
                    </th>
                  ))}
                  <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-10">
                <td className="border">SSD001</td>
                <td className="border">Santhosh</td>
       
                
                 
                  {[...Array(days).keys()].map((day) => (
                        <td className="border">
                    <label key={day} className="">
                      <input type="checkbox" className="w-4 h-4 text-center"/>
                    </label>
                    </td>
                  ))}
             <td className="border"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAttendance;
