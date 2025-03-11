
import React, { useEffect, useState } from "react";
import { createContext } from "react";


export const ContextProvide = createContext();
const initialValue = {
      month:false,
      setMonth:()=>{},

}
    function Context(props) {
      const [month,setMonth]=useState(false)
      useEffect(()=>{
            const today = new Date();
            const months={
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
                setMonth(months[today.getMonth() + 1])
            
      },[])
  

      return (
            <ContextProvide.Provider
            value={{month,setMonth}}
          >
            {props.children}
          </ContextProvide.Provider>
      )
    }
    
    export default Context