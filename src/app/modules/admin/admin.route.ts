import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router()


router.get('/', AdminControllers.getAllAdmins)
router.get('/:id', AdminControllers.getSingleAdmin)
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema), 
  AdminControllers.updateAdmin)

router.delete('/:id', AdminControllers.deletedAdmin)

export const AdminRoutes = router



