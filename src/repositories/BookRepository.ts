import { CreateBookData, findBoookData, IBookRepository } from 'interfaces/IBookRepository';
import { prisma } from '../database/prisma';

class BookRepository implements IBookRepository {
  async create(bookData: CreateBookData) {
    const book = await prisma.book.create({
      data: { ...bookData },
    });
    return book;
  }

  async findByTitle({ title, authorId }: findBoookData) {
    const book = await prisma.book.findFirst({
      where: {
        authorId,
        title
      }
    });
    return book;
  }
}

export default new BookRepository();
