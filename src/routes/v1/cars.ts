import { Router } from 'express';
import { createCar } from '../../controllers/cars/CarController';
import { list as listCars } from '../../controllers/cars/list';
import { validatorCreateCar } from '../../middleware/validation/car/validatorCreateCar';
import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.post('/', [checkJwt, validatorCreateCar], createCar);
router.get('/', [checkJwt], listCars);

export default router;