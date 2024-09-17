import { IsEmail } from 'class-validator';

/**
 * SignInDto
 * @description A data transfer object that represents the sign in data
 * @property {string} email - The user's email
 */
export class SignInDto {
  @IsEmail()
  email: string;
}
