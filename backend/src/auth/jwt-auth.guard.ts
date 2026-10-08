import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard ini digunakan untuk melindungi endpoint
 * yang membutuhkan login JWT.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}