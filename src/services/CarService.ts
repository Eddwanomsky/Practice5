import { getRepository } from 'typeorm';
import { Car } from 'orm/entities/cars/Car';
import { CreateCarDto } from 'consts/dto/car.dto';

export class CarService {
  private get carRepository() {
    return getRepository(Car);
  }

  async getAll(): Promise<Car[]> {
    return await this.carRepository.find({
      relations: ['brand'],
    });
  }

  async getOne(id: number): Promise<Car | undefined> {
    return await this.carRepository.findOne(id, {
      relations: ['brand'],
    });
  }

  async create(dto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(dto);
    return await this.carRepository.save(car);
  }

  async update(id: number, dto: Partial<CreateCarDto>): Promise<Car | undefined> {
    await this.carRepository.update(id, dto);
    return this.getOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}