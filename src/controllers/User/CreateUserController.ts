import { Request, Response } from 'express';
import UserRepository from 'repositories/UserRepository';
import CreateUserService from 'services/User/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserService = new CreateUserService(UserRepository);

    try {
      const user = await createUserService.execute(request.body);
      return response.status(201).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response
        .status(400)
        .json({ message: 'Houve um erro desconhecido' });
    }
  }
}

export default new CreateUserController();
