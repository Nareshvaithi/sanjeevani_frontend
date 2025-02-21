import { useSelector } from "react-redux";
import { selectAdminSidebarData, selectLogo, selectOpenSidebar } from "../../store/adminSlice/adminSidebarSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

const AdminSideBar = ()=>{
    const sidebarData = useSelector(selectAdminSidebarData);
    const logo = useSelector(selectLogo);
    const openSidebar = useSelector(selectOpenSidebar);
    const [activeData,setActiveData] = useState(0);
    const [activeSublink,setActiveSublink] = useState(0);
    const [showSublinks,setShowSublinks] = useState(false);
    return(
        <div className={`sticky top-0 left-0 ${openSidebar ? "w-72" : "w-0"} text-nowrap bg-themedarkblue h-screen text-white transition-all duration-500 ease-in-out overflow-hidden`}>
            <div className="flex items-center justify-between pl-5">
                <div className="w-28">
                    <img src={logo} alt="" />
                </div>
            </div>
            <div className="w-full flex justify-start py-5">
                <div className="w-full">
                    {
                        sidebarData.map(({id,title,sublinks,icon},index)=>{
                            return <div onClick={()=>{
                                setActiveData(index);
                                }} key={id}>
                                <div className={`w-full px-5 text-xl py-2 flex justify-between items-center gap-3 cursor-pointer hover:bg-white hover:text-themedarkblue transition-colors duration-200 ${index === activeData ? "bg-white text-themedarkblue" : ""}`}>
                                        <div className="flex gap-3 items-center">
                                            <span>{icon}</span>
                                            <h2>{title}</h2>
                                        </div>
                                    <span onClick={()=>setShowSublinks(sublinks && !showSublinks)} className={`${sublinks ? "block" : "invisible"}`}><MdKeyboardArrowDown/></span>
                                </div>
                                <div className={`${showSublinks ? "py-2 h-auto" : "py-0 h-0 overflow-hidden"}`}>
                                {
                                    sublinks?.map(({id,title},subIndex)=>{
                                        return <div key={id} className="pl-10 pr-5 py-1 overflow-hidden">
                                            <div onClick={()=>setActiveSublink(subIndex)} className={`cursor-pointer py-1 rounded-lg px-2 ${activeSublink === subIndex ? "bg-blue-500 " : ""} overflow-hidden`}>
                                                {title}
                                            </div>
                                        </div>
                                    })
                                }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminSideBar;