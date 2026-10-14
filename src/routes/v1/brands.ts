import { Router } from 'express';
import { getBrands, createBrand } from 'controllers/brands/BrandController';

const router = Router();

router.get('/', getBrands);
router.post('/', createBrand);

export default router;