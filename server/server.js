require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Bắt buộc: Cấu hình để Express có thể đọc được dữ liệu JSON gửi lên từ Client
app.use(express.json());

const port = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Ket noi MongoDB Atlas thanh cong!'))
  .catch((err) => console.log('Loi ket noi MongoDB:', err));

// [Câu 35] Tạo Model Student với các trường studentId, name, email
const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  email: String
});
const Student = mongoose.model('Student', studentSchema);

// [Câu 36] API GET /api/students: Lấy danh sách toàn bộ sinh viên
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// [Câu 37] API POST /api/students: Thêm một sinh viên mới
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: 'Khong the them sinh vien' });
  }
});

// [Câu 38] API PUT /api/students/:id : Cập nhật thông tin sinh viên
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: 'Khong the cap nhat' });
  }
});

// [Câu 39] API DELETE /api/students/:id : Xóa sinh viên
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Da xoa sinh vien thanh cong' });
  } catch (error) {
    res.status(400).json({ error: 'Khong the xoa' });
  }
});

// Lắng nghe server
app.listen(port, () => {
  console.log(`Server dang chay tai port ${port}`);
});