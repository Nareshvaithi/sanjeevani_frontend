import { useDispatch, useSelector } from "react-redux";
import { selectAdminSidebarData, selectBreadCrumb, selectLogo, selectOpenSidebar, setBreadCrumb, setOpenSidebar } from "../../store/adminSlices/adminSidebarSlice";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AdminSideBar = () => {
   
  const navigate = useNavigate();
  const sidebarData = useSelector(selectAdminSidebarData);
  const logo = useSelector(selectLogo);
  const dispatch = useDispatch();
  const openSidebar = useSelector(selectOpenSidebar);
  const [activeMenu, setActiveMenu] = useState(null); // Track active main menu
  const [activeSublink, setActiveSublink] = useState(null); // Track active sublink

  const handleMainClick = (index, to, hasSublinks, bread) => {
    if (hasSublinks) {
      // Toggle submenu visibility
      setActiveMenu(activeMenu === index ? null : index);
    } else if (to) {
      // Navigate directly if no sublinks
      navigate(to);
      dispatch(setBreadCrumb({ bread }));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        dispatch(setOpenSidebar(false));
      } else {
        dispatch(setOpenSidebar(true));
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);


  return (
    <section>
      <div className={`hidden lg:block fixed top-0 left-0 ${openSidebar ? "w-60" : "w-0"} text-nowrap bg-themedarkblue h-screen text-white transition-all duration-500 ease-in-out overflow-hidden font-mainFont1`}>
        <div className="flex items-center justify-between pl-5 py-3">
          <div className="w-28">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="w-full flex justify-start py-5">
          <div className="w-full">
            {sidebarData.map(({ id, title, sublinks, icon, to, bread }, index) => (
              <div key={id}>
                {/* Main Sidebar Item */}
                <div
                  onClick={() => handleMainClick(index, to, !!sublinks, bread)}
                  className={`relative group overflow-hidden w-full px-5 text-lg py-2 flex justify-between items-center gap-3 cursor-pointer hover:scale-110 hover:bg-white hover:text-themedarkblue transition-color duration-500 ${index === activeMenu ? "bg-white text-themedarkblue" : ""}`}
                >
                  <div className="flex gap-3 items-center">
                    <span>{icon}</span>
                    <h2>{title}</h2>
                  </div>

                  {/* Toggle Icon */}
                  {sublinks && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent main click
                        setActiveMenu(activeMenu === index ? null : index);
                      }}
                      className="cursor-pointer"
                    >
                      <MdKeyboardArrowDown className={`${activeMenu === index ? "rotate-[120]" : "-rotate-90"} transition-transform duration-300 text-2xl`} />
                    </span>
                  )}
                  <div className={`absolute left-0 transition-all z-10 duration-200 rounded-full ${index === activeMenu ? "w-1 h-full bg-buttonblue" : ""}`}></div>
                </div>

                {/* Sublinks Section */}
                <div className={`overflow-hidden transition-all duration-700 pt-2 pl-3 pr-2 ${activeMenu === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  {sublinks?.map(({ id, title, to, subBread }, subIndex) => (
                    <div
                      key={id}
                      onClick={() => {
                        setActiveSublink(subIndex);
                        navigate(to);
                        dispatch(setBreadCrumb({ bread, subBread }));
                      }}
                      className={`w-full py-2 cursor-pointer rounded-lg px-5 transition-colors duration-300 ${activeSublink === subIndex ? "bg-blue-500 text-white" : "hover:bg-blue-600 my-1"}`}
                    >
                      {title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`block lg:hidden z-50 fixed overflow-hidden top-[63px] w-screen h-screen ${openSidebar ? "translate-x-0" : "-translate-x-[100%]"} transition-transform duration-700`}>
        <div className={`w-3/4 h-full bg-themedarkblue transition-all duration-700 ease-in-out`}>
          {sidebarData.map(({ id, title, sublinks, icon, to, bread }, index) => (
            <div key={id}>
              {/* Main Sidebar Item */}
              <div
                onClick={() => handleMainClick(index, to, !!sublinks, bread)}
                className={`w-full px-5 text-lg py-2 flex justify-between items-center gap-3 cursor-pointer hover:bg-white text-white hover:text-themedarkblue transition-colors duration-200 ${
                  index === activeMenu ? "text-themedarkblue" : "text-gray-200"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <span>{icon}</span>
                  <h2>{title}</h2>
                </div>

                {/* Toggle Icon */}
                {sublinks && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent main click
                      setActiveMenu(activeMenu === index ? null : index);
                    }}
                    className="cursor-pointer"
                  >
                    <MdKeyboardArrowDown className={`${activeMenu === index ? "rotate-[45]" : "-rotate-90"} transition-transform duration-300 text-2xl`} />
                  </span>
                )}
              </div>

              {/* Sublinks Section */}
              <div className={`overflow-hidden transition-all duration-700 pt-2 pl-3 pr-2 ${activeMenu === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                {sublinks?.map(({ id, title, to, subBread }, subIndex) => (
                  <div
                    key={id}
                    onClick={() => {
                      window.scrollTo(0,0)
                      setActiveSublink(subIndex);
                      navigate(to);
                      dispatch(setBreadCrumb({ bread, subBread }));
                      dispatch(setOpenSidebar(false));
                    }}
                    className={`w-full py-2 cursor-pointer rounded-lg px-5 transition-colors duration-300 ${
                      activeSublink === subIndex
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-600 hover:text-white text-gray-300 my-1"
                    }`}
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSideBar;