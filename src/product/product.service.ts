import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}
  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async create(
    product: Product,
  ): Promise<Product> {
    const res = await this.productModel.create(
      product,
    );
    return res;
  }
}
