import { BadRequestException, HttpStatus, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

export class ErrorHandler {
  private static readonly logger = new Logger(ErrorHandler.name);

  static handleError(err: HttpException | UniqueConstraintViolationException, entity: string): never {
    if (err instanceof UniqueConstraintViolationException) {
      this.logger.error(`UniqueConstraintViolationException: ${err.message}`);
      const regex = /Key \(([^)]+)\)=\(([^)]+)\) already exists\./;

      const match = regex.exec(err?.message);
      if (match && match[1]) {
        const field = match[1];
        throw new HttpException(`Already exists an ${entity} with ${field}`, HttpStatus.BAD_REQUEST);
      } else {
        //@ts-ignore
        throw new HttpException(err?.detail, HttpStatus.BAD_REQUEST);
      }
    }
    if (err instanceof NotFoundException) {
      this.logger.error(`NotFoundException: ${err.message}`);
      throw err;
    } else if (err.name === "ValidationError") {
      this.logger.error(`ValidationError: ${err.message}`);
      throw new BadRequestException(err.message);
    } else if (err instanceof BadRequestException) {
      this.logger.error(`BadRequestException: ${err.message}`);
      throw new BadRequestException(err.message);
    } else if (err.name === "ConnectionError") {
      this.logger.error(`ConnectionError: ${err.message}`);
      throw new InternalServerErrorException("Database connection error");
    } else if (err instanceof Error) {
      this.logger.error(`Error: ${err.message}`);
      throw new InternalServerErrorException(err.message);
    } else {
      this.logger.error(`Unexpected error: ${err}`);
      throw new InternalServerErrorException("An unexpected error occurred");
    }
  }
}
