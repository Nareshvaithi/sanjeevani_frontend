import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { deleteStudentsEvents, SelectEventList, selectEvents } from "../../store/adminSlices/EventsSlices";
import { RiDeleteBinFill } from "react-icons/ri";
import ShowStudentEvents from "./ShowStudentEvents";
import ShowStudentNotice from "./ShowStudentNotice";

const StudentEvents = ()=>{
    return(
      <section className="pt-20 p-2 lg:p-5 font-mainFont1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ShowStudentEvents />
        <ShowStudentNotice />
      </div>
    </section>
    )
}


export default StudentEvents