.populate() দিয়ে রেফারেন্স ডেটা নিয়ে আসা

EX:
const students = await Student.find()
  .populate('admissionSemester') // সেমিস্টারের ডেটা আনবে
  .populate({
    path: 'academicDepartment', // ডিপার্টমেন্ট আনবে
    populate: { path: 'academicFaculty' } // ডিপার্টমেন্টের ভেতরের  ফ্যাকাল্টি আনবে
  });
console.log(students);