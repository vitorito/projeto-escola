import findStudentByUserId from '../students/studentService/findStudentByUserId';
import StudentPhoto from './StudentPhoto';

const generatePhotoDto = (photo) => ({
  id: photo.id,
  file_name: photo.file_name,
  url: photo.url,
});

const createPhoto = async (userId, photo) => {
  const student = await findStudentByUserId(userId);
  const photoData = {
    student_id: student.id,
    file_name: photo.file_name,
    original_name: photo.original_name,
  };
  return StudentPhoto.create(photoData);
};

export default {
  createPhoto,
  generatePhotoDto,
};
