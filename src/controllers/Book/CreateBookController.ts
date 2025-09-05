import { Request, Response } from 'express';
import BookRepository from 'repositories/BookRepository';
import CreateBookService from 'services/Book/CreateBookService';

class CreateBookController {
  async handle(request: Request, response: Response) {
    const createBookService = new CreateBookService(BookRepository);

    try {
      const book = await createBookService.execute({
        ...request.body,
        authorId: request.userId
      });
      return response.status(201).json({ book });
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

export default new CreateBookController();
