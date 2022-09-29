require('dotenv').config();

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { resolve } from 'path';
import './database';
import loginRouter from './login/loginRouter';
import errorHandler from './middlewares/errorHandler';
import studentsRouter from './students/studentRouter';
import uploadRouter from './student_photos/studentPhotosRouter';
import adminRouter from './users/userRouter';

const app = express();

const staticFilesPath = resolve(__dirname, '..', 'uploads');
app.use(express.static(staticFilesPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(helmet());

app.use(studentsRouter);
app.use(adminRouter);
app.use(loginRouter);
app.use(uploadRouter);

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
