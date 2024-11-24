import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { BaseDto } from "../../base-dto.model";

export class ProductDto extends BaseDto {
  @IsString()
  codigo!: string;

  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  cantidad!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precioUnitario!: number;

  @IsString()
  categoria: string;
}
