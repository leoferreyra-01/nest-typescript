import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto, OrderResponseDto, OrderItemResponseDto } from '../dto/order.dto';
import { ProductService } from './product.service';

@Injectable()
export class OrderService {
  private orders: Map<string, OrderResponseDto> = new Map();

  constructor(private readonly productService: ProductService) {
    // Initialize with some sample data
    const sampleOrders: OrderResponseDto[] = [
      {
        id: '1',
        userId: '1',
        products: [
          {
            productId: '1',
            quantity: 1,
            price: 999.99
          }
        ],
        total: 999.99,
        status: 'delivered',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      },
      {
        id: '2',
        userId: '2',
        products: [
          {
            productId: '2',
            quantity: 1,
            price: 599.99
          },
          {
            productId: '3',
            quantity: 2,
            price: 199.99
          }
        ],
        total: 999.97,
        status: 'processing',
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02')
      }
    ];

    sampleOrders.forEach(order => this.orders.set(order.id, order));
  }

  // GET all orders
  findAll(): OrderResponseDto[] {
    return Array.from(this.orders.values());
  }

  // GET orders by user ID
  findByUserId(userId: string): OrderResponseDto[] {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  // GET order by ID
  findOne(id: string): OrderResponseDto | null {
    return this.orders.get(id) || null;
  }

  // POST create new order
  create(createOrderDto: CreateOrderDto): OrderResponseDto | null {
    const id = Date.now().toString();
    const now = new Date();
    
    // Calculate total and validate products
    let total = 0;
    const products: OrderItemResponseDto[] = [];

    for (const item of createOrderDto.products) {
      const product = this.productService.findOne(item.productId);
      if (!product) {
        return null; // Product not found
      }
      
      products.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
      
      total += product.price * item.quantity;
    }

    const newOrder: OrderResponseDto = {
      id,
      userId: createOrderDto.userId,
      products,
      total,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };

    this.orders.set(id, newOrder);
    return newOrder;
  }

  // PUT update order (full update)
  update(id: string, updateOrderDto: CreateOrderDto): OrderResponseDto | null {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) {
      return null;
    }

    // Calculate total and validate products
    let total = 0;
    const products: OrderItemResponseDto[] = [];

    for (const item of updateOrderDto.products) {
      const product = this.productService.findOne(item.productId);
      if (!product) {
        return null; // Product not found
      }
      
      products.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
      
      total += product.price * item.quantity;
    }

    const updatedOrder: OrderResponseDto = {
      ...existingOrder,
      userId: updateOrderDto.userId,
      products,
      total,
      updatedAt: new Date()
    };

    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // PATCH partial update order
  patch(id: string, updateOrderDto: UpdateOrderDto): OrderResponseDto | null {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) {
      return null;
    }

    const updatedOrder: OrderResponseDto = {
      ...existingOrder,
      ...updateOrderDto,
      updatedAt: new Date()
    };

    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // DELETE order
  remove(id: string): boolean {
    return this.orders.delete(id);
  }

  // GET orders by status
  findByStatus(status: string): OrderResponseDto[] {
    return Array.from(this.orders.values()).filter(
      order => order.status === status
    );
  }
} 