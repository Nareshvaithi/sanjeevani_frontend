import CreateEvent from "../../features/admin/CreateEvent";
import CreateNotice from "../../features/admin/CreateNotice";

const AddEventAndNotice = () => {

  return (
    <section className="pt-20 p-2 lg:p-5 font-mainFont1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CreateEvent/>
        <CreateNotice/>
      </div>
    </section>
  );
};

export default AddEventAndNotice;
