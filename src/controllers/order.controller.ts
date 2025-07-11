import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto } from '../dto/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully', type: OrderResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request or invalid data' })
  create(@Body() createOrderDto: CreateOrderDto): OrderResponseDto {
    const order = this.orderService.create(createOrderDto);
    if (!order) {
      throw new BadRequestException('Invalid order data or product not found');
    }
    return order;
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [OrderResponseDto] })
  findAll(): OrderResponseDto[] {
    return this.orderService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of orders by user', type: [OrderResponseDto] })
  findByUserId(@Param('userId') userId: string): OrderResponseDto[] {
    return this.orderService.findByUserId(userId);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get orders by status' })
  @ApiParam({ name: 'status', description: 'Order status' })
  @ApiResponse({ status: 200, description: 'List of orders by status', type: [OrderResponseDto] })
  findByStatus(@Param('status') status: string): OrderResponseDto[] {
    return this.orderService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string): OrderResponseDto {
    const order = this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order (full update)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad request or invalid data' })
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto): OrderResponseDto {
    const order = this.orderService.update(id, updateOrderDto);
    if (!order) {
      throw new NotFoundException('Order not found or invalid data');
    }
    return order;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order (partial update)' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order updated successfully', type: OrderResponseDto })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  patch(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): OrderResponseDto {
    const order = this.orderService.patch(id, updateOrderDto);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  remove(@Param('id') id: string): { message: string } {
    const deleted = this.orderService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Order deleted successfully' };
  }
} 