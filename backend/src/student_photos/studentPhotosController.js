/* eslint-disable camelcase */
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import studentPhotoService from './studentPhotoService';

const upload = multer(multerConfig).single('file');

const store = function (req, res) {
  return upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json(err.code);
    }
    const { filename: file_name, originalname: original_name } = req.file;
    const { userId } = req;
    const photo = await studentPhotoService.createPhoto(userId, {
      file_name,
      original_name,
    });
    return res.json(photo);
  });
};

export default {
  store,
};
