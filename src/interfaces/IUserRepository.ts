import { User } from '@prisma/client';

export interface IUserRepository {
  create(userData: CreateUserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};
