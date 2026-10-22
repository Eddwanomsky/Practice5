import { Brand } from '../orm/entities/users/Brand';

export class BrandResponseDTO {
  id: number;
  name: string;
  country?: string;

  constructor(brand: Brand) {
    this.id = brand.id;
    this.name = brand.name;
    this.country = brand.country;
  }
}