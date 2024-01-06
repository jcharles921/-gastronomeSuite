import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// VALIDATION FOR SIGNUP
export class SignUpDto {
  @ApiProperty({ description: 'The name of the user', type: String })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'The email of the user', type: String })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  @ApiProperty({ description: 'The password of the user', type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @ApiProperty({ description: 'Type of user', type: String })
  role: number;
}
