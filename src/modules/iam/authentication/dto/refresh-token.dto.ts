import { IsString } from 'class-validator';

/**
 * RefreshTokenDto
 * @description A data transfer object that represents the refresh token data
 * @property {string} email - The user's email
 */
export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
