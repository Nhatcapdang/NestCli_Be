import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schemas';
import { CreateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) {}
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  async createBook(
    @Body()
    book: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(book);
  }
}
