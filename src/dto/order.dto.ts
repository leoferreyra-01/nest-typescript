import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsArray, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ description: 'Product ID', example: '1' })
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Quantity', example: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID', example: '1' })
  @IsString()
  userId: string;

  @ApiProperty({ 
    description: 'Order items', 
    type: [OrderItemDto],
    example: [{ productId: '1', quantity: 1 }]
  })
  @IsArray()
  @Type(() => OrderItemDto)
  products: OrderItemDto[];
}

export class UpdateOrderDto {
  @ApiProperty({ 
    description: 'Order status', 
    example: 'processing',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    required: false
  })
  @IsOptional()
  @IsIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export class OrderItemResponseDto {
  @ApiProperty({ description: 'Product ID' })
  productId: string;

  @ApiProperty({ description: 'Quantity' })
  quantity: number;

  @ApiProperty({ description: 'Price' })
  price: number;
}

export class OrderResponseDto {
  @ApiProperty({ description: 'Order ID' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Order items', type: [OrderItemResponseDto] })
  products: OrderItemResponseDto[];

  @ApiProperty({ description: 'Total amount' })
  total: number;

  @ApiProperty({ description: 'Order status' })
  status: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 