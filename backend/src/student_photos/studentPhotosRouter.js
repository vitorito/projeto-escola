import { Router } from 'express';
import { hasAnyRole, loginRequired } from '../middlewares/authManager';
import userRoles from '../users/userRoles';
import asyncHandler from '../utils/asyncHandler';
import uploadController from './studentPhotosController';

const router = new Router();

router.post(
  '/students/photo',
  asyncHandler(loginRequired),
  hasAnyRole(userRoles.STUDENT),
  asyncHandler(uploadController.store),
);

export default router;
