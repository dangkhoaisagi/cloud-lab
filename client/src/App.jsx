import { useState, useEffect } from 'react';
import './App.css'; // Gọi file CSS vào để làm đẹp

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = { studentId, name, email };

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        alert('🎉 Thêm sinh viên thành công!');
        fetchStudents();
        setStudentId('');
        setName('');
        setEmail('');
      }
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="header-title">👨‍🎓 Quản lý Sinh viên</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Mã số sinh viên..."
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Họ và tên..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="input-field"
              placeholder="Địa chỉ Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            + Thêm Mới Sinh Viên
          </button>
        </form>
      </div>

      <div className="card">
        <table className="student-table">
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ và Tên</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td><strong>{student.studentId}</strong></td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;