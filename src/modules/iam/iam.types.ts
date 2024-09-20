import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    description: "The user's access token",
  })
  accessToken: string;

  @ApiProperty({
    description: "The user's email",
  })
  email: string;
}
