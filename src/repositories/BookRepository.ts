import { CreateBookData, IBookRepository } from 'interfaces/IBookRepository';
import { prisma } from '../database/prisma';

class BookRepository implements IBookRepository {
  async create(bookData: CreateBookData) {
    const user = await prisma.book.create({
      data: { ...bookData },
    });
    return user;
  }
}

export default new BookRepository();
