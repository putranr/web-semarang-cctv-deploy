import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import type { Request } from 'express';

type AuthenticatedRequest =
  Request & {
    user?: {
      userId: number;
      email: string;
      role: string;
    };
  };

@Injectable()
export class AdminGuard
  implements CanActivate
{
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request =
      context.switchToHttp().getRequest<AuthenticatedRequest>();

    /**
     * JwtStrategy sudah menempelkan
     * user ke request.
     */
    const user = request.user;

    /**
     * Pastikan role adalah admin.
     */
    if (
      !user ||
      user.role !== 'admin'
    ) {
      throw new ForbiddenException(
        'Akses hanya untuk admin',
      );
    }

    return true;
  }
}