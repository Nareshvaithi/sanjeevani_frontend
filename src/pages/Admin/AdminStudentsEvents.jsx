import React, { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { MdEmojiEvents } from "react-icons/md";
import { SelectEventList, selectEvents } from "../../store/adminSlices/EventsSlices";
import { RiH1 } from "react-icons/ri";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
const AdminStudentsEvents = () => {
  const currentMonth = format(new Date(), "MMMM");
  const events = useSelector(SelectEventList);
  const sampleEvents = useSelector(selectEvents);
  const formatDate = (date)=>{
    return date && format(new Date(date), 'dd MMMM yyyy')
  }
  const [viewList,setViewList] = useState({
    content:'All',
    count:5,
  })
  console.log(viewList.count);
  const handleViewList = ()=>{
    if(viewList.count === 5){
      setViewList({
        content:'Less',
        count:sampleEvents.length
      })
    }
    else{
      setViewList({
        content:'All',
        count:5
      })
    }
  }
  return (
    <div className="pt-20 font-mainFont1">
      <div className="flex justify-evenly gap-8 px-4 ">
        <div className="border bg-white p-4 w-1/2 rounded-lg">
          <div className="flex justify-between items-center py-2">
            <p className="text-lg font-mainFont1">Upcoming Classes</p>
            <p onClick={handleViewList} className="cursor-pointer text-sm text-buttonblue">View {viewList.content}</p>
          </div>
          <hr />
          <div className={`font-mainFont1 ${viewList.content === 'Less' ? "h-[350px] overflow-y-scroll" : "" }`}>
            {
              sampleEvents.length > 0 ? (sampleEvents.slice(viewList.count === 5 ? 0 : 0,viewList.count).map((event)=>{
                return <div key={event.id} className="py-3 flex gap-3 items-center">
                  <div className="w-full odd:bg-buttonblue/10 border-b border-gray-200 even:bg-gray-100 p-3">
                    <div className="flex justify-between items-start">
                      <h2 className="text-wrap font-bold">{event?.title}</h2>
                      <p className="text-[14px] text-nowrap text-right">{formatDate(event?.date)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm text-gray-500">{event.batch}</h3>
                      <p className="text-sm text-nowrap text-right text-gray-500">{`${event.starttime} - ${event.endtime}`}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-3">
                      <div className="text-green-600 text-xl"><MdModeEditOutline/></div>
                      <div className="text-red-600 text-xl"><RiDeleteBinFill/></div>
                    </div>
                  </div>
                </div>
              })) : (<h2 className="py-3 text-2xl font-bold">No Event Found !!!</h2>)
            }
          </div>
        </div>
        <div className="border bg-white p-4 w-1/2">
          <div className="flex justify-between items-center">
            <p className="text-lg">Notice Board</p>
            <p className="text-lg">View ALL</p>
          </div>
          <hr />
          
          <div className="mt-4">
            <p>No new notices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentsEvents;
