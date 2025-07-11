import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Laptop' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Product description', example: 'High-performance laptop' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product category', example: 'Electronics' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Product in stock', example: true })
  @IsBoolean()
  inStock: boolean;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Laptop', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Product price', example: 999.99, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ description: 'Product description', example: 'High-performance laptop', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Product category', example: 'Electronics', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Product in stock', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}

export class ProductResponseDto {
  @ApiProperty({ description: 'Product ID' })
  id: string;

  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Product description' })
  description: string;

  @ApiProperty({ description: 'Product category' })
  category: string;

  @ApiProperty({ description: 'Product in stock' })
  inStock: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 