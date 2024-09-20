import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

/**
 * SignInDto
 * @description A data transfer object that represents the sign in data
 */
export class SignInDto {
  @ApiProperty({
    description: "The user's email",
    example: 'jakub.jurena@gmail.com',
  })
  @IsEmail()
  email: string;
}
