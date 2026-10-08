import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

/**
 * Data yang boleh dikirim ketika login.
 */
export class LoginDto {
  /**
   * Email admin.
   */
  @IsEmail()
  email: string;

  /**
   * Password minimal 8 karakter.
   */
  @IsString()
  @MinLength(8)
  password: string;
}