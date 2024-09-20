import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * RefreshTokenDto
 * @description A data transfer object that represents the refresh token data
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token',
  })
  @IsString()
  refreshToken: string;
}
