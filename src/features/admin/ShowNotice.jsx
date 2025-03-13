const ShowNotice = ()=>{
    return(
        <div className="border bg-white p-4 w-1/2">
          <div className="flex justify-between items-center">
            <p className="text-lg">Notice Board</p>
            <p className="text-lg">View ALL</p>
          </div>
          <hr />
          
          <div className="mt-4">
            <p>No new notices.</p>
          </div>
        </div>
    )
}

export default ShowNotice;