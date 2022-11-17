import { InMemoryUsersRepository } from "@module/users/repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "@shared/erros/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";


let inMemoryUsersRepository:InMemoryUsersRepository;
let createUserUseCase:CreateUserUseCase;

describe("Create user", () => {

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it("should be able to create a new user" , async ()=>{

      const user = {
        username:"jhondoe",
        password:"Abc12342"
      }

      const userCreated = await createUserUseCase.execute(user);

      expect(userCreated).toHaveProperty("id");

    });

    it("should not be able to create a new user with username that already exists", async () => {
      await expect(async ()=>{
        const user = {
          username:"jhondoe",
          password:"Abc12342"
        }

        await createUserUseCase.execute(user);

        await createUserUseCase.execute(user);

      }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a username with less than 3 digits", async () => {
      await expect(async ()=>{
        const user = {
          username:"jh",
          password:"Abc12342"
        }

        await createUserUseCase.execute(user);

      }).rejects.toBeInstanceOf(AppError);
    });

    it("must not be able to create a username with a password that is less than 8 characters long and has no uppercase and lowercase letters", async ()=>{
      await expect(async ()=>{
        const user = {
          username:"jhondoe",
          password:"123456789"
        }

        await createUserUseCase.execute(user)
      }).rejects.toBeInstanceOf(AppError);
    });

});