import { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view plugin
import "react-toastify/dist/ReactToastify.css"; // Toast styles

// Sample data
const attendanceData = ["2025-03-01", "2025-03-02", "2025-03-03", "2025-03-05"]; // Present dates
const joinDate = "2025-03-01"; // Join date
const currentDate = new Date().toISOString().split("T")[0]; // Current date

const AttendanceCalendar = () => {
  // Function to generate events based on attendance, join date, and current date
  const generateEvents = () => {
    const events = [];

    // Convert join date to a Date object
    const joinDateObj = new Date(joinDate);

    // Loop through each date from join date to current date
    for (let d = new Date(joinDateObj); d <= new Date(currentDate); d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];

      if (attendanceData.includes(dateStr)) {
        // Present date
        events.push({
          title: "Present",
          date: dateStr,
          backgroundColor: "green",
          textColor: "white",
        });
      } else {
        // Absent date
        events.push({
          title: "Absent",
          date: dateStr,
          backgroundColor: "red",
          textColor: "white",
        });
      }
    }

    return events;
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Calendar</h2>

      {/* FullCalendar Component */}
      <div className="w-full max-w-4xl">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={generateEvents()}
          eventContent={(eventInfo) => (
            <div className="flex items-center justify-center">
              <div
                className="p-1 rounded-full"
                style={{
                  backgroundColor: eventInfo.event.backgroundColor,
                  color: eventInfo.event.textColor,
                }}
              >
                {eventInfo.event.title}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;