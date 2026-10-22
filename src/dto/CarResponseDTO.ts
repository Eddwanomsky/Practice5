import { Car } from '../orm/entities/users/Car';
import { BrandResponseDTO } from './BrandResponseDTO';

export class CarResponseDTO {
  id: number;
  modelName: string; // Перейменовуємо для клієнта (model -> modelName)
  price: number;
  year?: number;
  color?: string;
  brand?: BrandResponseDTO;

  constructor(car: Car) {
    this.id = car.id;
    this.modelName = car.model;
    this.price = Number(car.price);
    this.year = car.year;
    this.color = car.color;
    if (car.brand) {
      this.brand = new BrandResponseDTO(car.brand);
    }
  }
}