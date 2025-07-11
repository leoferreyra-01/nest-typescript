import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User age', example: 30 })
  @IsNumber()
  @Min(0)
  age: number;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'User age', example: 30, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  age?: number;
}

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User age' })
  age: number;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 