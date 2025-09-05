import { Request, Response } from 'express';
import UserRepository from 'repositories/UserRepository';
import CreateSessionService from 'services/Session/CreateSessionService';

class CreateSessionController {
  async handle(request: Request, response: Response) {
    const createSessionService = new CreateSessionService(UserRepository);
    try {
      const { token, user } = await createSessionService.execute(request.body);
      return response.json({ token, user });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response
        .status(400)
        .json({ message: 'Houve um erro, por favor, tente novamente' });
    }
  }
}

export default new CreateSessionController();
