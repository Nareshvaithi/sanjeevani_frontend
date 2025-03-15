import { useDispatch, useSelector } from "react-redux";
import { deleteStudentsNotice, fetchStudentsNotice, SelectNoticeList } from "../../store/adminSlices/NoticeSlice";
import { LuNotebookPen } from "react-icons/lu";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

const ShowNotice = () => {
  const noticeList = useSelector(SelectNoticeList);
 const dispatch=useDispatch()
  const handleClick=(id)=>{
    dispatch(deleteStudentsNotice(id))
    alert("Delete Sucessfully")
    dispatch(fetchStudentsNotice())
  }
  return (
    <div className="border bg-white p-4 w-1/2">
      <div className="flex justify-between items-center py-2">
        <p className="text-lg">Notice Board</p>
        <p className="text-sm text-blue-600">View All</p>
      </div>
      <hr />

      <div className="mt-4">
        <div>
        {noticeList.length > 0 ? (
  [...noticeList].reverse().map((value, index) => (
    <div key={index} className="flex items-center gap-4">
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
    <div>
    <p className="text-red-600 text-xl" onClick={()=>handleClick(value._id)}>
    <RiDeleteBinFill />
  </p>
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

export default ShowNotice;
