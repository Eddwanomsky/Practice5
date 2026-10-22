import { Router } from 'express';
import { list, show, edit, destroy } from '../../controllers/users';
import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';

const router = Router();

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);
router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], show);
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], edit);
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], destroy);

export default router;