export const CalculateTotalFees = (array)=>{
    if(array){
        const totalPaymentArray = [...new Set(array.map(({paymentTotal})=> paymentTotal))];
        const TotalPayments = totalPaymentArray.reduce((acc, curr) => acc + curr, 0);

        return TotalPayments;
    }
    else return 0;
}