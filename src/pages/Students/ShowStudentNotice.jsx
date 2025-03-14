import { useDispatch, useSelector } from "react-redux";
import { deleteStudentsNotice, fetchStudentsNotice, SelectNoticeList } from "../../store/adminSlices/NoticeSlice";
import { LuNotebookPen } from "react-icons/lu";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState } from "react";

const ShowStudentNotice = () => {
       const [viewList,setViewList] = useState({
            content:'All',
            count:5,
          })
  const noticeList = useSelector(SelectNoticeList);

 

  const handleViewList = ()=>{
     
      if(viewList.count === 5){
        setViewList({
          content:'Less',
          count:noticeList.length
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
    <div className="border bg-white p-4 w-full">
      <div className="flex justify-between items-center py-2">
        <p className="text-lg">Notice Board</p>
        <p onClick={handleViewList} className="cursor-pointer text-sm text-buttonblue">View {viewList.content}</p>
      </div>
      <hr />

      <div className="mt-4">
        <div>
        {noticeList.length > 0 ? (noticeList.slice(viewList.count === 5 ? 0 : 0,viewList.count).reverse().map((value, index) => (
    <div className="flex items-center gap-4">
    <div key={index} className="w-full flex items-center gap-4 border bg-slate-300 shadow-lg p-4 text-gray-800 rounded-md mb-2">
      <p className="text-[#000380]">
        <LuNotebookPen size={40} />
      </p>
      <div className="flex items-center justify-end gap-60">
        <div>
          <p className="text-xl font-bold">{value.notice}</p>
          <p>{value.remark}</p>
        </div>
      </div>
      
    </div>
   
  </div>
  ))
) : (
  <p>No new notices.</p>
)}

        </div>
        <p className={`${noticeList ? "hidden" : "block"}`}>No new notices.</p>
      </div>
    </div>
  );
};




export default ShowStudentNotice