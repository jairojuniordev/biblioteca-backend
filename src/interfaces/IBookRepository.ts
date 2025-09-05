import { Book } from "generated/prisma";

export interface IBookRepository {
  create(userData: CreateBookData): Promise<Book>;
}

export type CreateBookData = {
  title: string;
  authorId: string;
  imageUrl: string;
};
