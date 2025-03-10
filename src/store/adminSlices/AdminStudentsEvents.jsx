import React from 'react'
import { useSelector } from 'react-redux'
import { SelectEventList } from './EventsSlices'

function AdminStudentsEvents() {
      const eventList=useSelector(SelectEventList)
      console.log("eventList",eventList)
  return (
    <div className='pt-20'>

      <div className='flex justify-evenly '>
       <div className='border  bg-white'>
            <div className='flex justify-evenly gap-40 px-4'>
            <p className='text-lg'>Upcoming Classes</p>
            <p className='text-lg'>View ALL</p>
            </div>
            <hr></hr>
            
            
            </div>    
       <div className='border bg-white'>
       <div className='flex justify-evenly gap-40 px-4'>
            <p className='text-lg'>Notice Board</p>
            <p className='text-lg'>View ALL</p>
            </div>
            <hr></hr>
            
            </div>    
      </div>
    </div>
  )
}

export default AdminStudentsEvents