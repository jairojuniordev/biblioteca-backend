import bcrypt from 'bcryptjs';

import { CreateUserData, IUserRepository } from 'interfaces/IUserRepository';

export default class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: CreateUserData) {
    if (!name || !email || !password) {
      throw new Error('Nome, email e senha são obrigatório!');
    }

    const existsUser = await this.userRepository.findByEmail(email);

    if (existsUser) {
      throw new Error('Usário já existe');
    }

    const hashPassword = await bcrypt.hash(password, 8);

    try {
      const user = await this.userRepository.create({
        name,
        email,
        password: hashPassword,
      });
      return { ...user, password: undefined };
    } catch {
      throw new Error('Houve um erro, tente novamente');
    }
  }
}
