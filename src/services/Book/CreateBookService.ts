import { CreateBookData, IBookRepository } from 'interfaces/IBookRepository';


export default class CreateBookService {
  constructor(private bookReposioty: IBookRepository) { }

  async execute({ title, authorId, imageUrl }: CreateBookData) {
    if (!title || !imageUrl) {
      throw new Error('titulo e url da image são obrigatórios!');
    }

    const bookIsExists = !!await this.bookReposioty.findByTitle({
      title,
      authorId
    });

    if (bookIsExists) {
      throw new Error('Você já possui um livro com esse titulo');
    }

    try {
      const book = await this.bookReposioty.create({
        title, authorId, imageUrl
      });
      return book
    } catch {
      throw new Error('Houve um erro, tente novamente');
    }
  }
}
