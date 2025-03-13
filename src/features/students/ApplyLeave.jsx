import { differenceInDays, parseISO } from "date-fns";
import InputField from "../../components/Common/InputMUI";
import { CiCalendarDate } from "react-icons/ci";
import { MdReportProblem } from "react-icons/md";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {addStudent} from "../../store/adminSlices/adminStudentsSlice"

const ApplyLeave = ()=>{
    
    const dispatch=useDispatch()

    const formik = useFormik({
        initialValues:{
            fromDate:"",
            toDate:"",
            reason:"",
        },
        onSubmit:(values)=>{
            values.leaveStatus=true
            console.log(values);
            // dispatch(addStudent(values))
            dispatch(addStudent(values))
            alert("success")
        }
    })
    const TotalNoOfDaysLeave = Number(differenceInDays(parseISO(formik.values.toDate),parseISO(formik.values.fromDate))) || 0;
    
    return(
        <section className="bg-gray-100 w-full h-auto">
            <div className="px-2 lg:px-5 w-full py-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-medium text-gray-600">Apply Leave!</h2>
                    <p className="text-sm font-bold">Home / Apply Leave</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-10" method="POST">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <InputField name={"fromDate"} icon={<CiCalendarDate/>} label={"From Date"} type="date" value={formik.values.fromDate} onChange={formik.handleChange}/>
                        <InputField name={"toDate"} icon={<CiCalendarDate/>} label={"To Date"} type="date" value={formik.values.toDate} onChange={formik.handleChange}/>
                        <InputField name={"reason"} icon={<MdReportProblem/>} label={"Leave Reason"} type="text" value={formik.values.reason} onChange={formik.handleChange}/>
                    </div>
                    <div className="py-5">
                        <button type="submit" className="py-2 rounded-lg px-5 bg-themeyellow hover:text-themeyellow hover:bg-white border border-themeyellow transition-colors duration-500 text-white">Apply Leave</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ApplyLeave;