const EnrollmentProgressbar = ()=>{
    return(
        <div className="flex justify-center items-center py-5">
        <div className="w-fit h-auto flex justify-center relative">
        <div className="w-auto grid grid-cols-4 gap-5">
                <div className="flex justify-center flex-col items-center">
                    <div className="px-3 py-1 bg-green-400 rounded-full text-xl text-white">1</div>
                    <p className="text-lg">Students Details</p>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <div className="px-3 py-1 bg-green-400 rounded-full text-xl text-white">2</div>
                    <p className="text-lg">Payment</p>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <div className="px-3 py-1 bg-green-400 rounded-full text-xl text-white">3</div>
                    <p className="text-lg">User Name</p>
                </div>
                <div className="flex justify-center flex-col items-center text-xl">
                    <div className="px-3 py-1 bg-green-400 rounded-full text-white">4</div>
                    <p className="text-lg">Confirmation</p>
                </div>
        </div>
        <div className="overflow-hidden absolute w-full translate-y-4 rounded-full -z-10">
            <div className="p-1 bg-green-400 -translate-x-[70%] transition-transform duration-1000"></div>
        </div>
        </div>
    </div>
    )
}

export default EnrollmentProgressbar;