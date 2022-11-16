interface ITransactionDTO{
    userIdAccountRecipient:string
    amount:number   
    userIdAccountSender:string 
}

interface IGetTransactionByDateDTO{
    dateStart:Date,
    dateEnd:Date,
    user_id?:string,
    account_id?:string
}


export {ITransactionDTO,IGetTransactionByDateDTO}