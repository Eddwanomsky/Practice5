import { Request, Response, NextFunction } from 'express';
import { CarService } from 'services/CarService';

const carService = new CarService();

export const getCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cars = await carService.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};

export const getCarById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const car = await carService.getOne(Number(req.params.id));
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

export const createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const car = await carService.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    next(err);
  }
};

export const updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const car = await carService.update(Number(req.params.id), req.body);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

export const deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await carService.delete(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};