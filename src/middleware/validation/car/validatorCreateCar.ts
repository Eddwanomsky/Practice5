import { Request, Response, NextFunction } from 'express';
import { isEmpty, isInt, isFloat } from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateCar = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { model, price, brandId } = req.body;

  if (!model || isEmpty(String(model).trim())) {
    return next(new CustomError(400, 'Validation', 'Car model is required.'));
  }

  if (price === undefined || !isFloat(String(price), { gt: 0 })) {
    return next(new CustomError(400, 'Validation', 'Price must be a number greater than 0.'));
  }

  if (!brandId || !isInt(String(brandId), { min: 1 })) {
    return next(new CustomError(400, 'Validation', 'Valid brandId is required.'));
  }

  return next();
};