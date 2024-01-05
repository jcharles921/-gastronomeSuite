import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// VALIDATION FOR LOGIN
export class LoginDto {
  @ApiProperty({ description: 'The email of the user', type: String })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @ApiProperty({ description: 'The password of the user', type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
