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
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Product,
  })
  createProduct(
    @Body()
    product: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Get(':id')
  getProductId(@Param('id') id: string) {
    return this.productService.getProductId(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
