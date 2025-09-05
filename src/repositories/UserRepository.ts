import { prisma } from '../database/prisma';
import { CreateUserData, IUserRepository } from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  async create(userData: CreateUserData) {
    const user = await prisma.user.create({
      data: { ...userData },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}

export default new UserRepository();
