import { getRepository } from 'typeorm';
import { Brand } from 'orm/entities/brands/Brand';
import { CreateBrandDto } from 'consts/dto/car.dto';

export class BrandService {
  private get brandRepository() {
    return getRepository(Brand);
  }

  async getAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async getOne(id: number): Promise<Brand | undefined> {
    return await this.brandRepository.findOne(id);
  }

  async create(dto: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepository.create(dto);
    return await this.brandRepository.save(brand);
  }
}