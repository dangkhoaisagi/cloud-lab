# Sử dụng Node.js làm môi trường
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file danh sách thư viện vào trước
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ source code frontend vào
COPY . .

# Khai báo cổng 5173 của Vite
EXPOSE 5173

# Lệnh khởi chạy Frontend (phải có --host để Docker có thể public port)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]