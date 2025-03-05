import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Month view plugin
import "react-toastify/dist/ReactToastify.css"; // Toast styles

// Sample data
const attendance = ["2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04"]; // Present dates
const eventsData = [{ date: "2025-03-04", title: "Dance competition" }]; // Custom events
const joinDate = "2025-03-01"; // Join date
const currentDate = new Date().toISOString().split("T")[0]; // Current date

const AttendanceCalendar = () => {
  const [events, setEvents] = useState([]); // Store combined events

  // Combine attendance and events data
  useEffect(() => {
    const combinedEvents = [];

    // Convert join date to a Date object
    const joinDateObj = new Date(joinDate);

    // Loop through each date from join date to current date
    for (let d = new Date(joinDateObj); d <= new Date(currentDate); d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];

      // Check if the date is in the attendance array
      if (attendance.includes(dateStr)) {
        combinedEvents.push({
          title: "Present",
          date: dateStr,
          backgroundColor: "transparent", // No background color
          textColor: "green", // Green text for the tick
          className: "present", // Custom class for styling
        });
      } else {
        // Check if the date is in the events array
        const event = eventsData.find((event) => event.date === dateStr);
        if (event) {
          combinedEvents.push({
            title: event.title, // Full event title
            date: dateStr,
            backgroundColor: "blue",
            textColor: "white",
          });
        } else {
          // Mark as absent if not in attendance or events
          combinedEvents.push({
            title: "Absent",
            date: dateStr,
            backgroundColor: "transparent", // No background color
            textColor: "red", // Red text for the cross
            className: "absent", // Custom class for styling
          });
        }
      }
    }

    setEvents(combinedEvents);
  }, [attendance, eventsData, joinDate, currentDate]);

  // Handle adding an event (e.g., marking a date as present)
  const handleAddEvent = (date) => {
    const newEvent = {
      title: "Present",
      date: date,
      backgroundColor: "transparent",
      textColor: "green",
      className: "present",
    };

    // Update local state
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    // Log the updated events (you can replace this with an API call later)
    console.log("Updated Events:", updatedEvents);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Attendance Calendar</h2>

      {/* FullCalendar Component */}
      <div className="w-full max-w-4xl">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate={currentDate} // Set initial date to current date
          events={events}
          dateClick={(arg) => handleAddEvent(arg.dateStr)} // Add event on date click
          eventContent={(eventInfo) => {
            // Custom rendering for attendance indicators
            if (eventInfo.event.className === "present" || eventInfo.event.className === "absent") {
              return (
                <div className="absolute top-1 right-1 text-lg">
                  {eventInfo.event.className === "present" ? "✔" : "✘"}
                </div>
              );
            }
            // Default rendering for custom events
            return (
              <div className="p-1 rounded-full" style={{ backgroundColor: eventInfo.event.backgroundColor, color: eventInfo.event.textColor }}>
                {eventInfo.event.title}
              </div>
            );
          }}
          dayCellContent={(cellInfo) => {
            // Add the date number to the cell
            return <div className="text-left p-1">{cellInfo.dayNumberText}</div>;
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;