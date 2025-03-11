import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { MdEmojiEvents } from "react-icons/md";
import { SelectEventList } from "../../store/adminSlices/EventsSlices";

const AdminStudentsEvents = () => {
  const currentMonth = format(new Date(), "MMMM");

  const events = useSelector(SelectEventList);

  return (
    <div className="pt-20 font-mainFont1">
      <div className="flex justify-evenly gap-8 px-4 ">
        <div className="border bg-white p-4 w-1/2 rounded-lg">
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-mainFont1">Upcoming Classes</p>
            <p className="text-lg">View ALL</p>
          </div>
          <hr />

          <div className="mt-4 font-mainFont1">
            {events.map((value) => {
              return value.events.map((data) => {
                if (data.month == currentMonth) {
                  return (
                    <>
                      {data.eventsList.map((events) => {
                        return (
                          <>
                          <div className="py-2">
                          <div className="flex justify-between shadow-md rounded-md px-4 bg-[#f3f4f6] py-2">
                            <div className="flex justify-center items-center gap-2">
                            <MdEmojiEvents size={40} className="text-[#000380]" />

                           <div>
                           <p className="text-xl text-gray-700 font-mainFont1">{events.eventName}</p>
                           <p className="text-gray-700 font-mainFont1">{events.remarks}</p>
                           </div>
                            </div>
                            <div>
                              <p className="text-gray-700">{events.eventDate}</p>
                              <p className="text-gray-700">{events.time}</p>
                              </div>
                            
                          </div>
                          </div>
                            
                          </>
                        );
                      })}
                    </>
                  );
                }
              });
            })}
          </div>
        </div>

        {/* Notice Board Section */}
        <div className="border bg-white p-4 w-1/2">
          <div className="flex justify-between items-center">
            <p className="text-lg">Notice Board</p>
            <p className="text-lg">View ALL</p>
          </div>
          <hr />
          {/* You can add logic to display notices similarly */}
          <div className="mt-4">
            <p>No new notices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentsEvents;
