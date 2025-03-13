import { useDispatch, useSelector } from "react-redux";
import { selectEventFields } from "../../store/adminSlices/addEventsSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";
import { addEvent, selectEvents } from "../../store/adminSlices/EventsSlices";
import { useState } from "react";



const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  batch: Yup.string().required("Batch is required"),
  date: Yup.date().required("Date is required"),
  starttime: Yup.string().required("Start time is required"),
  endtime: Yup.string()
    .required("End time is required")
    .test("is-after-start", "End time must be after Start time", function (value) {
      const { starttime } = this.parent;
      return starttime && value ? starttime < value : true;
    }),
});

const CreateEvent = ()=>{
    const eventsFields = useSelector(selectEventFields);
    const studentList = useSelector(selectAllStudents);
    const eventlist = useSelector(SelectEventList);
    const eventlist = useSelector(selectEvents);
    const [openEditEvent,setOpenEditEvent] = useState(false);
    const dispatch = useDispatch()
    const uniqueBatches = studentList?.length 
        ? ["Everyone", ...new Set(studentList.map(({ batchID }) => batchID))] 
        : ["Everyone"];
    const formik = useFormik({
      initialValues: {
        title: "",
        batch: "",
        date: "",
        starttime: "",
        endtime: "",
      },
      validationSchema,
      onSubmit: (values) => {
        console.log("Form Submitted:", values);
        dispatch(addStudentsEvents(values));
        alert("sucess")
        // formik.handleReset();
      },
    });
    return(
        <section className="pt-10">
            <div className="bg-white lg:px-3 py-3 rounded-lg w-full">
          <h1 className="titleText">Create Event</h1>
          <form className="flex flex-col gap-5 py-5" onSubmit={formik.handleSubmit}>
            {eventsFields.map((field) => (
              <div key={field?.id}>
                <FormControl fullWidth>
                  {field?.type === "text" ||
                  field?.type === "date" ||
                  field?.type === "time" ? (
                    <TextField
                        label={field?.lable}
                        type={field?.type}
                        name={field?.name}
                        value={formik.values[field?.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field?.name] && Boolean(formik.errors[field?.name])}
                        helperText={formik.touched[field?.name] && formik.errors[field?.name]}
                        InputLabelProps={{ shrink: true }} 
                    />

                  ) : field?.type === "select" ? (
                    <>
                      <InputLabel>{field?.lable}</InputLabel>
                      <Select
                        name={field?.name}
                        value={formik.values[field?.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field?.name] && Boolean(formik.errors[field?.name])}
                      >
                        {uniqueBatches.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched[field?.name] && formik.errors[field?.name] && (
                        <FormHelperText error>{formik.errors[field?.name]}</FormHelperText>
                      )}
                    </>
                  ) : null}
                </FormControl>
              </div>
            ))}
            <div className="w-full">
                <button type="submit" className="bg-buttonblue hover:bg-white text-white hover:text-buttonblue border border-buttonblue transition-all duration-500 w-full py-2">Post Event</button>
            </div>
          </form>
        </div>
        </section>
    )
}

export default CreateEvent;