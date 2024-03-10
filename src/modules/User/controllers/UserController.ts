import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";
import { UpdateUserService } from "../services/UpdateUserService";
import { DeleteUserService } from "../services/DeleteUserService";

class UserController {
  async create(request: Request, response: Response) {
    const { email, name, password, cpf, ddd, phone, phoneType, gender, birthDate, status, addresses, cards } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
        email, 
        name, 
        password, 
        cpf, 
        ddd, 
        phone, 
        phoneType, 
        gender, 
        birthDate, 
        status, 
        addresses, 
        cards,         
    });

    return response.status(201).json(user);
  }
  
  async list(request: Request, response: Response) {
    const listUsersService = container.resolve(ListUsersService);

    const usersList = await listUsersService.execute();

    return response.status(200).json(usersList);
  }

  async update(request: Request, response: Response) {
    const { email, name, password, cpf, ddd, phone, phoneType, gender, birthDate, status } = request.body;

    const { id } = request.params;

    const {addresses: userAddresses, cards: userCards} = request.body;

    const updateUserService = container.resolve(UpdateUserService);
    
    const user = await updateUserService.execute(id, {
      email, 
      name, 
      password, 
      cpf, 
      ddd, 
      phone, 
      phoneType, 
      gender, 
      birthDate, 
      status, 
      addresses: userAddresses, 
      cards: userCards,      
      id
    });
    return response.status(201).json(user);
  }
  
  async delete(request: Request, response: Response){
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(204).send();
  }
}

export { UserController };