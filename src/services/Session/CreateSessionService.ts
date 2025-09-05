import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUserRepository } from 'interfaces/IUserRepository';

export default class CreateSessionService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário ou senha inválida');
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new Error('Usuário ou senha inválida');
    }

    const jwtSecret = process.env.JWT_SECRET || '';

    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: '2m',
    });

    return { token, user: { ...user, password: undefined } };
  }
}
