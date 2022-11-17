import { prismaDb } from "..";
import { hash } from 'bcryptjs';

async function main (){
    const password = hash('John1232332',8);
    const amount = 20;
    const userCredit = await prismaDb.users.create({
        data:{
            username:'johndoecredited',
            password:String(password),
            account:{
                create:{
                    balance:100
                }
            }
        }
    });

    const userDebit = await prismaDb.users.create({
        data:{
            username:"johndebited",
            password:String(password),
            account:{
                create:{
                    balance:100
                }
            }
        }
    });

    await prismaDb.$transaction([
        prismaDb.accounts.update({
            data:{balance:{decrement:amount}},
            where:{id:userCredit.account_id}
        }),
        prismaDb.accounts.update({
            data:{balance:{increment:amount}},
            where:{id:userDebit.account_id}
        }),
        prismaDb.transactions.create({
            data:{
                value:amount,
                debited_account_id:userCredit.account_id,
                credited_account_id:userDebit.account_id
            }
        })
    ]);
}

main();