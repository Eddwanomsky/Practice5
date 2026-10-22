import { getRepository } from 'typeorm';
import { Car } from '../orm/entities/users/Car';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class CarService {
  private get carRepository() {
    return getRepository(Car);
  }

  async create(data: { model: string; price: number; year?: number; color?: string; brandId: number }): Promise<Car> {
    const car = this.carRepository.create(data);
    return await this.carRepository.save(car);
  }

  async list(): Promise<Car[]> {
    return await this.carRepository.find({ relations: ['brand'] });
  }

  async getById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id }, relations: ['brand'] });
    if (!car) {
      throw new CustomError(404, 'General', `Car with id ${id} not found.`);
    }
    return car;
  }

  async update(id: number, data: Partial<Car>): Promise<Car> {
    const car = await this.getById(id);
    Object.assign(car, data);
    return await this.carRepository.save(car);
  }

  async delete(id: number): Promise<void> {
    const car = await this.getById(id);
    await this.carRepository.remove(car);
  }
}