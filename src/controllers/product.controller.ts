import { Body, Controller, Post, Get } from "@nestjs/common";
import { ProductDto } from "src/models/dtos/product/requests/product-dto.model";
import { ProductEntity } from "src/models/entities/product/product.entity";
import { ListResponseDto } from "src/models/responses/list-response.dto";
import { ProductService } from "src/services/product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  saveProduct(@Body() product: ProductDto): Promise<ProductEntity> {
    return this.productService.saveProduct(product);
  }

  @Get()
  getProducts(): Promise<ListResponseDto<ProductEntity>> {
    return this.productService.getProducts();
  }
}
