import { InMemoryUsersRepository } from "@module/users/repositories/in-memory/InMemoryUsersRepository";
import { ICreateUserDTO } from "@module/users/UserDTO/ICreateUserDTO";
import { AppError } from "@shared/erros/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let inMemoryUsersRepository:InMemoryUsersRepository;
let authenticateUserUseCase:AuthenticateUserUseCase;
let createUserUseCase:CreateUserUseCase;

describe("Authenticate User", ()=>{
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    });

    it("should be able to authenticate an user", async () => {
        const user:ICreateUserDTO = {
            username:"jhondoe",
            password:"Abc1234567"
        }

        await createUserUseCase.execute(user);

        const responseAuthenticate = await authenticateUserUseCase.execute(user);

        expect(responseAuthenticate).toHaveProperty("token");
    });

    it("should not be able to authenticate an non existent user",async () =>{
        await expect(async ()=>{
            await authenticateUserUseCase.execute({
                username:"jhon",
                password:"Abc1234567"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", async () =>{
        await expect(async () =>{
            const user:ICreateUserDTO = {
                username:"jhondoe",
                password:"Abc1234567"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                username:user.username,
                password:'incorrectPassword'
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});