import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schemas';
import {
  CreateProductDto,
  UpdateProductDto,
} from './dto';

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
  async createProduct(
    @Body()
    product: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(
      product,
    );
  }

  @Get(':id')
  async getProductId(@Param('id') id: string) {
    return this.productService.getProductId(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(
      id,
      product,
    );
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
