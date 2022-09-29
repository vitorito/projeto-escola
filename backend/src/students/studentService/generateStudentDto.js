export default (student) => ({
  id: student.user.id,
  name: student.user.name,
  email: student.user.email,
  enrollment: student.enrollment,
  age: student.age,
  profilePicUrl: student.profile_pic ? student.profile_pic.url : '',
});
