import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
  res.json({ message: 'Backend dang hoat dong', endpoints: ['/api/hello', '/api/students'] });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend dang hoat dong' });
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Khong the lay danh sach sinh vien' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Khong tim thay sinh vien' });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ error: 'ID khong hop le hoac cap nhat that bai' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Khong tim thay sinh vien' });
    }

    res.json({ message: 'Da xoa sinh vien thanh cong' });
  } catch (error) {
    res.status(400).json({ error: 'ID khong hop le hoac xoa that bai' });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Thieu MONGODB_URI trong file .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Ket noi MongoDB Atlas thanh cong!');

    app.listen(port, () => {
      console.log(`Server dang chay tai http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Loi khoi dong:', error.message);
    process.exit(1);
  }
}

startServer();