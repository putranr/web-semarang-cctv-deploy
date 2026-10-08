import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma.service.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,

    private readonly jwtService: JwtService,
  ) {}

  /**
   * Mengecek apakah email dan password
   * yang diberikan cocok dengan User di database.
   */
  async validateUser(
    email: string,
    password: string,
  ) {
    /**
     * Cari user berdasarkan email.
     */
    const user =
      await this.prisma.db.orm.public.User.first({
        email,
      });

    /**
     * User tidak ditemukan.
     */
    if (!user) {
      return null;
    }

    /**
     * Bandingkan password dari request
     * dengan password hash di database.
     */
    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password,
      );

    /**
     * Password salah.
     */
    if (!passwordMatches) {
      return null;
    }

    /**
     * Password tidak kita teruskan
     * ke bagian authentication.
     */
    return user;
  }

  /**
   * Login admin.
   */
  async login(
    email: string,
    password: string,
  ) {
    const user = await this.validateUser(
      email,
      password,
    );

    /**
     * Email atau password salah.
     */
    if (!user) {
      throw new UnauthorizedException(
        'Email atau password salah',
      );
    }

    /**
     * Payload yang disimpan di dalam JWT.
     *
     * sub = subject / ID user.
     */
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    /**
     * Buat access token.
     */
    const accessToken =
      this.jwtService.sign(payload);

    /**
     * Jangan pernah mengembalikan password
     * ke frontend.
     */
    return {
      access_token: accessToken,

      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    };
  }
}