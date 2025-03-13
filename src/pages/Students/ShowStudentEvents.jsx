import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { deleteStudentsEvents, SelectEventList, selectEvents } from "../../store/adminSlices/EventsSlices";
import { RiDeleteBinFill } from "react-icons/ri";

const ShowStudentEvents = ()=>{
    const dispatch = useDispatch();
    const sampleEvents = useSelector(SelectEventList);
    const formatDate = (date)=>{
      return date && format(new Date(date), 'dd MMMM yyyy');
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
    const handleDeleteEvent = (id)=>{
      console.log("delete")
      dispatch(deleteStudentsEvents(id));
      alert("success");
    }
    return(
        <div className="border bg-white p-4 w-full rounded-lg">
        <div className="flex justify-between items-center py-2">
          <p className="text-lg font-mainFont1">Upcoming Events</p>
          <p onClick={handleViewList} className="cursor-pointer text-sm text-buttonblue">View {viewList.content}</p>
        </div>
        <hr />
        <div className={`font-mainFont1 ${viewList.content === 'Less' ? "h-[350px] overflow-y-scroll" : "" }`}>
          {
            sampleEvents.length > 0 ? (sampleEvents.slice(viewList.count === 5 ? 0 : 0,viewList.count).reverse().map((event)=>{
              return <div key={event._id} className="py-3 flex gap-3 items-center">
                <div className="w-full odd:bg-buttonblue/10 border-b border-gray-200 even:bg-gray-100 p-3">
                  <div className="flex justify-between items-start">
                    <h2 className="text-wrap font-bold">{event?.title}</h2>
                    <p className="text-[14px] text-nowrap text-right">{formatDate(event?.date)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-500">{event.batch}</h3>
                    <p className="text-sm text-nowrap text-right text-gray-500">{`${event.starttime} - ${event.endtime}`}</p>
                  </div>
                  <div className="text-sm text-gray-700">{event.remarks}</div>
                </div>
              </div>
            })) : (<h2 className="py-3 text-2xl font-bold">No Event Found !!!</h2>)
          }
        </div>
      </div>
    )
}



export default ShowStudentEvents