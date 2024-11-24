import { Injectable } from "@nestjs/common";
import { ProductDto } from "src/models/dtos/product/requests/product-dto.model";
import { ProductEntity } from "src/models/entities/product/product.entity";
import { ListResponseDto } from "src/models/responses/list-response.dto";
import { ProductRepository } from "src/repositories/product/product.repository";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  saveProduct(product: ProductDto): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }

  getProducts(): Promise<ListResponseDto<ProductEntity>> {
    return this.productRepository.getProducts();
  }
}
