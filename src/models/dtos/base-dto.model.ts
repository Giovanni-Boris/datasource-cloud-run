export class BaseDto {
  constructor() {}

  cleanEmptyKeys(): void {
    for (const key in this) {
      if (this[key as keyof this] === undefined) {
        delete this[key as keyof this];
      }
    }
  }
}
