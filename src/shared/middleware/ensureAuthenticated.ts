import { UnauthorizedError } from '../../shared/helpers/apiErrors';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('JWT token inexistente!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const { id, role } = decoded as ITokenPayload;

    request.user = {
      id,
      role,
    };

    return next();
  } catch {
    throw new UnauthorizedError('Invalid JWT token');
  }
}

export function ensureAdmin(request: Request, response: Response, next: NextFunction): void {
  if (request.user.role !== 'admin') {
    throw new UnauthorizedError('Acesso negado');
  }

  return next();
}
