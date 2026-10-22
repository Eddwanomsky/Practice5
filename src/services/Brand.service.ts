import { getRepository } from 'typeorm';
import { Brand } from '../orm/entities/users/Brand';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class BrandService {
  private get brandRepository() {
    return getRepository(Brand);
  }

  async create(data: { name: string; country?: string }): Promise<Brand> {
    const brand = this.brandRepository.create(data);
    return await this.brandRepository.save(brand);
  }

  async list(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async getById(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new CustomError(404, 'General', `Brand with id ${id} not found.`);
    }
    return brand;
  }
}