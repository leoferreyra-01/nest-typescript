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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto, ProductResponseDto } from '../dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createProductDto: CreateProductDto): ProductResponseDto {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [ProductResponseDto] })
  findAll(): ProductResponseDto[] {
    return this.productService.findAll();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category' })
  @ApiParam({ name: 'category', description: 'Product category' })
  @ApiResponse({ status: 200, description: 'List of products by category', type: [ProductResponseDto] })
  findByCategory(@Param('category') category: string): ProductResponseDto[] {
    return this.productService.findByCategory(category);
  }

  @Get('in-stock')
  @ApiOperation({ summary: 'Get products in stock' })
  @ApiResponse({ status: 200, description: 'List of products in stock', type: [ProductResponseDto] })
  findInStock(): ProductResponseDto[] {
    return this.productService.findInStock();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string): ProductResponseDto {
    const product = this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product (full update)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto): ProductResponseDto {
    const product = this.productService.update(id, updateProductDto);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product (partial update)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  patch(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): ProductResponseDto {
    const product = this.productService.patch(id, updateProductDto);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string): { message: string } {
    const deleted = this.productService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
} 