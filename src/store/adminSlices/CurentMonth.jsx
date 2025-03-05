import { createSlice } from "@reduxjs/toolkit";
const today = new Date();
const month={
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
const initialValue = month[today.getMonth() + 1]
const monthSlice = createSlice({
  name: "month",
  initialState: initialValue,
  reducers: {}
});

export default monthSlice.reducer;
