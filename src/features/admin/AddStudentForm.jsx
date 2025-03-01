

const AddStudentForm = ({isOpen,setIsOpen})=>{
    return(
        <div className="w-2/3 h-auto bg-white p-3">
            <form action="">
                <div className="flex items-center justify-between">
                    <div>Add Student Form</div>
                    <div onClick={()=>setIsOpen(false)} className="cursor-pointer">&times;</div>
                </div>
            </form>    
        </div>
    )
}

export default AddStudentForm;