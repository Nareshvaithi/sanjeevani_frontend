import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { format } from "date-fns";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";
import axios from "axios";

function AdminAttendance() {
  const currentMonth = format(new Date(), "MMMM");
  const [days, setDays] = useState(30);
  const [attendanceData, setAttendanceData] = useState([]);
  let count=0

  const studentList = useSelector(selectAllStudents);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth || "January");

  const months = [
    { status: true, id: 1, month: "January", count: 31 },
    { status: true, id: 2, month: "February", count: 28 },
    { status: true, id: 3, month: "March", count: 31 },
    { status: false, id: 4, month: "April", count: 30 },
    { status: false, id: 5, month: "May", count: 31 },
    { status: false, id: 6, month: "June", count: 30 },
    { status: false, id: 7, month: "July", count: 31 },
    { status: true, id: 8, month: "August", count: 30 },
    { status: true, id: 9, month: "September", count: 31 },
    { status: true, id: 10, month: "October", count: 30 },
    { status: true, id: 11, month: "November", count: 31 },
    { status: true, id: 12, month: "December", count: 31 },
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

  const handleClick = async () => {
    try {

      await axios.post(
        "api-sanjeevani.tejusdigi.com/existingstudents",
        attendanceData
      );
     alert("Attendance Updated Sucessfully")
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChange = (studentId, fullName, _id, day, checked) => {

    if (checked) {
      const newObj = {
        _id: _id,
        studentId: studentId,
        fullName: fullName,
        attentanceStatus: checked,
        month: currentMonth,
      };
      setAttendanceData([...attendanceData, newObj]);
    } else {
      setAttendanceData(
        attendanceData.filter((status) => status.studentId !== studentId)
      );
    }
  };

  var cond;
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
                  <th className="border">
                    <label key={day} className="">
                      {day + 1}
                    </label>
                  </th>
                ))}
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((value) => {
                count=0
                return (
                  <>
                    <tr className="h-10">
                      <td className="border">{value.studentID}</td>
                      <td className="border">{value.fullName}</td>

                      {[...Array(days).keys()].map((day, index) => {
                        let cond = true;

                        const attendanceCells = value.attentance.map(
                          (detail) => {
                            if (detail.attentancemonth === selectedMonth) {
                              return detail.details.map((data, index1) => {
                             
                                if (data.day === index + 1) {
                                  cond = false;
                                  count=count+1
                                  return (
                                    <td key={index1} className="border">
                                      <label key={index1} className="">
                                        <input
                                          type="checkbox"
                                          checked={
                                            data.attentanceStatus
                                          } 
                                          className="w-4 h-4 text-center"
                                          onChange={(e) => {
                                            handleCheckboxChange(
                                              value.studentID,
                                              value.fullName,
                                              value._id,
                                              day,
                                              e.target.checked
                                            );
                                          }}
                                        />
                                      </label>
                                    </td>
                                  );
                                }

                                return null;
                              });
                            }

                            return null;
                          }
                        );

                        if (cond) {
                          return (
                            <td key={index} className="border">
                              <label key={index} className="">
                                <input
                                  type="checkbox"
                                  
                                  className="w-4 h-4 text-center"
                                  onChange={(e) => {
                                    handleCheckboxChange(
                                      value.studentID,
                                      value.fullName,
                                      value._id,
                                      day,
                                      e.target.checked
                                    );
                                  }}
                                />
                              </label>
                            </td>
                          );
                        }

              
                        return attendanceCells;
                      })}

                      <td className="border">{count}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <div
              className="border px-4 bg-blue-600 text-white py-1 text-xl rounded-md"
              onClick={() => handleClick()}
            >
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAttendance;
