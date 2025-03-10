import { useNavigate } from "react-router-dom";

const QuickBox = ({title,icon,count,link})=>{
    const navigate = useNavigate();
    return(
        <div onClick={()=>{navigate(link ? link : '')}} className="bg-white p-10 flex justify-between rounded-xl">
            <div>
                <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
                <p className="font-bold text-xl">{count}</p>
            </div>
            <div className="w-12">
                <img src={icon} alt="" />
            </div>
        </div>
    )
}

export default QuickBox;