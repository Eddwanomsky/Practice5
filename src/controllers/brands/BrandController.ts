import { Request, Response, NextFunction } from 'express';
import { BrandService } from 'services/BrandService';

const brandService = new BrandService();

export const getBrands = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const brands = await brandService.getAll();
    res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
};

export const createBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const brand = await brandService.create(req.body);
    res.status(201).json(brand);
  } catch (err) {
    next(err);
  }
};