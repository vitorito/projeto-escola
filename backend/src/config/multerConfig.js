import multer, { MulterError } from 'multer';
import { extname, resolve } from 'path';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const allowedFileTypes = ['image/jpg', 'image/jpeg'];

export default {
  fileFilter: (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(new MulterError(`File type must be one of these: ${allowedFileTypes}`));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = resolve(__dirname, '..', '..', 'uploads', 'images');
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const salt = generateRandomNumber(10000, 20000);
      const fileExtension = extname(file.originalname);
      const fileName = `${Date.now()}_${salt}${fileExtension}`;
      cb(null, fileName);
    },
  }),
};
