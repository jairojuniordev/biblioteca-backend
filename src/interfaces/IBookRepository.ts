import { Book } from "generated/prisma";

export interface IBookRepository {
  create(userData: CreateBookData): Promise<Book>;
  findByTitle({ title, authorId }: findBoookData): Promise<Book | null>
}

export type CreateBookData = {
  title: string;
  authorId: string;
  imageUrl: string;
};

export type findBoookData = {
  title: string;
  authorId: string;
};
