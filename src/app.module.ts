import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ProductController,
    OrderController,
  ],
  providers: [
    AppService,
    UserService,
    ProductService,
    OrderService,
  ],
})
export class AppModule {} 