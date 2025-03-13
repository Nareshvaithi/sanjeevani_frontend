import ShowEvents from "../../features/admin/ShowEvents";
import ShowNotice from "../../features/admin/ShowNotice";


const AdminStudentsEvents = () => {

  return (
    <div className="pt-20 font-mainFont1">
      <div className="flex justify-evenly gap-8 px-4 ">
          <ShowEvents/>
          <ShowNotice/>
      </div>
    </div>
  );
};

export default AdminStudentsEvents;
