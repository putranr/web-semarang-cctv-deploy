import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

/**
 * Bentuk payload yang kita masukkan
 * ke dalam JWT.
 */
type JwtPayload = {
  sub: number;
  email: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env['JWT_SECRET'];

    /**
     * Kalau JWT_SECRET tidak ditemukan,
     * hentikan aplikasi supaya konfigurasi
     * tidak berjalan secara tidak aman.
     */
    if (!secret) {
      throw new Error(
        'JWT_SECRET belum diatur di file .env',
      );
    }

    super({
      /**
       * JWT diambil dari:
       *
       * Authorization: Bearer <token>
       */
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      /**
       * Token yang sudah expired ditolak.
       */
      ignoreExpiration: false,

      /**
       * Secret untuk memverifikasi signature JWT.
       */
      secretOrKey: secret,
    });
  }

  /**
   * Method ini dijalankan setelah JWT
   * berhasil diverifikasi.
   */
  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}