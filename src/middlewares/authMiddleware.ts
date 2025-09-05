import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || '';

export function AuthMiddleware() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({ message: 'Header inválido' });
    }

    const [prefix, token] = authHeader?.split(' ');

    if (prefix != 'Bearer' || !token) {
      console.log(prefix);

      return response.status(401).json({ message: 'Token mal formatado' });
    }

    try {
      const decode = jwt.verify(token, jwtSecret) as { userId: string };
      request.userId = decode.userId;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'jwt expired':
            return response.status(401).json({ message: 'token expirado' });
          default:
            return response.status(401).json({ message: 'token inválido' });
        }
      }
    }
  };
}
