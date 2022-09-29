import { Router } from 'express';
import { hasAnyRole, loginRequired } from '../middlewares/authManager';
import userRoles from '../users/userRoles';
import asyncHandler from '../utils/asyncHandler';
import studentController from './studentController';

const router = new Router();

router.get(
  '/students',
  asyncHandler(studentController.index),
);

router.get(
  '/students/:id',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN, userRoles.STUDENT]),
  asyncHandler(studentController.show),
);

router.post(
  '/students',
  asyncHandler(studentController.store),
);

router.patch(
  '/students/:id',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN]),
  asyncHandler(studentController.update),
);

router.delete(
  '/students/:id',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN]),
  asyncHandler(studentController.deleteStudent),
);

export default router;
