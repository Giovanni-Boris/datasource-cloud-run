import { Logger } from "@nestjs/common";
import { BaseRepository } from "../base.repository";
import { ProductEntity } from "src/models/entities/product/product.entity";
import { ProductDto } from "src/models/dtos/product/requests/product-dto.model";
import { ErrorHandler } from "src/commons/utils/handle-errors";
import { ListResponseDto } from "src/models/responses/list-response.dto";

export class ProductRepository extends BaseRepository<ProductEntity> {
  readonly logger = new Logger(ProductRepository.name);

  async save(productDto: ProductDto): Promise<ProductEntity> {
    return this.em
      .transactional(async () => {
        const param = this.create(productDto);
        await this.em.persist(param).flush();
        return param;
      })
      .catch((err) => {
        this.logger.error(`Error save products: ${err.message}`);
        ErrorHandler.handleError(err, "params");
      });
  }

  async getProducts(): Promise<ListResponseDto<ProductEntity>> {
    const result = await this.find({}).catch((err) => {
      this.logger.error(`Error get products: ${err.message}`);
      return [];
    });
    return new ListResponseDto<ProductEntity>(result);
  }
}
