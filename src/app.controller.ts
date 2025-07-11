import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  @ApiResponse({ status: 200, description: 'Welcome message' })
  getHello(): { message: string; version: string; documentation: string } {
    return {
      message: 'Welcome to NestJS API',
      version: '1.0.0',
      documentation: '/api'
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Health status' })
  getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  }
} 