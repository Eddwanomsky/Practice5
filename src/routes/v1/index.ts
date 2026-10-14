import { Router } from 'express';

import auth from './auth';
import users from './users';
import brands from './brands';
import cars from './cars';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/brands', brands);
router.use('/cars', cars);
export default router;
