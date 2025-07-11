import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  private products: Map<string, ProductResponseDto> = new Map();

  constructor() {
    // Initialize with some sample data
    const sampleProducts: ProductResponseDto[] = [
      {
        id: '1',
        name: 'Laptop',
        price: 999.99,
        description: 'High-performance laptop',
        category: 'Electronics',
        inStock: true,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      },
      {
        id: '2',
        name: 'Smartphone',
        price: 599.99,
        description: 'Latest smartphone model',
        category: 'Electronics',
        inStock: true,
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02')
      },
      {
        id: '3',
        name: 'Headphones',
        price: 199.99,
        description: 'Wireless noise-canceling headphones',
        category: 'Audio',
        inStock: false,
        createdAt: new Date('2023-01-03'),
        updatedAt: new Date('2023-01-03')
      }
    ];

    sampleProducts.forEach(product => this.products.set(product.id, product));
  }

  // GET all products
  findAll(): ProductResponseDto[] {
    return Array.from(this.products.values());
  }

  // GET products by category
  findByCategory(category: string): ProductResponseDto[] {
    return Array.from(this.products.values()).filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // GET product by ID
  findOne(id: string): ProductResponseDto | null {
    return this.products.get(id) || null;
  }

  // POST create new product
  create(createProductDto: CreateProductDto): ProductResponseDto {
    const id = Date.now().toString();
    const now = new Date();
    
    const newProduct: ProductResponseDto = {
      id,
      ...createProductDto,
      createdAt: now,
      updatedAt: now
    };

    this.products.set(id, newProduct);
    return newProduct;
  }

  // PUT update product (full update)
  update(id: string, updateProductDto: CreateProductDto): ProductResponseDto | null {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return null;
    }

    const updatedProduct: ProductResponseDto = {
      ...existingProduct,
      ...updateProductDto,
      updatedAt: new Date()
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // PATCH partial update product
  patch(id: string, updateProductDto: UpdateProductDto): ProductResponseDto | null {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return null;
    }

    const updatedProduct: ProductResponseDto = {
      ...existingProduct,
      ...updateProductDto,
      updatedAt: new Date()
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // DELETE product
  remove(id: string): boolean {
    return this.products.delete(id);
  }

  // GET products in stock
  findInStock(): ProductResponseDto[] {
    return Array.from(this.products.values()).filter(product => product.inStock);
  }
} 