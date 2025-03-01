import { useDispatch, useSelector } from "react-redux";
import { selectOpenSidebar, selectSmallLogo, setOpenSidebar } from "../../store/adminSlices/adminSidebarSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBellOn } from "react-icons/ci";
import { BiFullscreen } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";


const AdminTopBar = ()=>{
    const dispatch = useDispatch();
    const openSidebar = useSelector(selectOpenSidebar);
    const smallLogo = useSelector(selectSmallLogo);
    return (
        <section>
        <div 
            className={`hidden lg:block fixed ${openSidebar ? "translate-x-60" : "translate-x-0"} top-0 w-full h-auto bg-themeyellow py-2 px-5 transition-all duration-500 flex items-center ${openSidebar ? "pr-64" : "pr-5"}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div onClick={()=>{dispatch(setOpenSidebar(!openSidebar))}} className="w-fit cursor-pointer text-white bg-blue-500 p-1 text-xl rounded-md">
                        <GiHamburgerMenu/>
                    </div>
                    <div>
                        <input type="search" placeholder="Search here" className="p-1 px-4 w-60 outline-none rounded-md"/>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-full">
                            <CiBellOn/>
                        </div>
                        <div className="bg-white p-2 rounded-full">
                            <BiFullscreen/>
                        </div>
                        <div className="">
                            <div className="flex items-center gap-2">
                                <div className="bg-white p-2 rounded-2xl">
                                    <FaRegUserCircle/>
                                </div>
                                <div className="font-mainFont1">
                                    <h3 className="font-bold text-sm">Durga Ramkishnan</h3>
                                    <p className="p-0 text-sm text-buttonblue">Administrator</p>
                                </div>
                                <div className="text-2xl text-buttonblue">
                                    <MdKeyboardArrowDown/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`flex lg:hidden items-center justify-between bg-themedarkblue py-3 px-5 fixed top-0 left-0 w-screen`}>
            <div onClick={()=>{dispatch(setOpenSidebar(!openSidebar))}} className="text-themelightblue text-2xl">
                <GiHamburgerMenu/>
            </div>
            <div className="flex items-center justify-between gap-5">
                <div className="w-10">
                    <img src={smallLogo} alt="" className="w-full"/>
                </div>
                <div className="bg-white p-2 rounded-full">
                    <CiBellOn/>
                </div>
                <div className="bg-white p-2 rounded-2xl">
                    <FaRegUserCircle/>
                </div>
            </div>
        </div>
        </section>
    )
}

export default AdminTopBar;