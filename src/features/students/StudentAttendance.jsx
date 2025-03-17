import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfDay, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => 0,
  getDay,
  locales: { "en-US": enUS },
});

const AttendanceCalendar = () => {
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const studentList = useSelector(selectAllStudents);

  useEffect(() => {
    const tempMarked = [];

    studentList.forEach((student) => {
      const joinDateObj = new Date(student.join_date);
      const currentDateObj = new Date();

      for (let d = new Date(joinDateObj); d <= currentDateObj; d.setDate(d.getDate() + 1)) {
        const dateStr = format(d, "yyyy-MM-dd");
        const attendanceRecord = student.attentance?.find((att) => att.attentancemonth === format(d, "MMMM"));
        const isPresent = attendanceRecord?.details?.some((entry) => entry.attentanceDate === dateStr && entry.attentanceStatus);

        if (isPresent) {
          tempMarked.push({
            type: "present",
            date: startOfDay(new Date(dateStr)),
          });
        } else {
          tempMarked.push({
            type: "absent",
            date: startOfDay(new Date(dateStr)),
          });
        }
      }
    });

    setMarkedDates(tempMarked);
  }, [studentList]);

  const handleSelectEvent = (event) => {
    if (event.type === "event") {
      setSelectedEvent(event.title);
    } else {
      setSelectedEvent("");
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    let color = "black";

    if (event.type === "present") {
      backgroundColor = "lightgreen";
      color = "green";
    } else if (event.type === "absent") {
      backgroundColor = "lightcoral";
      color = "red";
    }

    return {
      style: {
        backgroundColor,
        color,
        borderRadius: "5px",
        padding: "2px 5px",
        fontSize: "14px",
      },
    };
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Attendance Calendar</h2>
      <div className="w-full bg-white p-4 shadow-lg rounded-xl">
        <Calendar
          localizer={localizer}
          events={markedDates}
          startAccessor="date"
          endAccessor="date"
          defaultView="month"
          views={["month"]}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          components={{
            event: (props) => (
              <Tooltip title={props.event.title || props.event.type} arrow>
                <div>{props.event.title || props.event.type}</div>
              </Tooltip>
            ),
          }}
          style={{ height: 500 }}
        />
      </div>
      {selectedEvent && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md shadow-md">
          <strong>Event:</strong> {selectedEvent}
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;
