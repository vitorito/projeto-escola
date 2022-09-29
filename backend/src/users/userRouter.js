import { Router } from 'express';
import { hasAnyRole, loginRequired } from '../middlewares/authManager';
import userRoles from './userRoles';
import asyncHandler from '../utils/asyncHandler';
import userController from './userController';

const router = new Router();

router.get(
  '/users',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN]),
  asyncHandler(userController.index),
);

router.get(
  '/users/:id',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN]),
  asyncHandler(userController.show),
);

router.patch(
  '/users/:id',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN]),
  asyncHandler(userController.update),
);

router.post(
  '/users',
  // asyncHandler(loginRequired),
  // hasAnyRole([userRoles.ADMIN]),
  asyncHandler(userController.store),
);

router.delete(
  '/users/:id',
  asyncHandler(loginRequired),
  hasAnyRole([userRoles.ADMIN]),
  asyncHandler(userController.deleteUser),
);

export default router;
