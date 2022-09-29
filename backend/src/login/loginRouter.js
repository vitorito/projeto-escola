import { Router } from 'express';
import asyncHandler from '../utils/asyncHandler';
import loginController from './loginController';

const router = new Router();

router.post('/login', asyncHandler(loginController.store));

export default router;
