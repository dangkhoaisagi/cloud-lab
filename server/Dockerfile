# Câu 32: Khai báo Node.js Image
FROM node:22

# Câu 33: Thiết lập thư mục làm việc trong Container
WORKDIR /app

# Câu 34: Sao chép các file quản lý thư viện vào trước
COPY package*.json ./

# Câu 35: Cài đặt các package (thư viện)
RUN npm install

# Câu 36: Sao chép toàn bộ source code Backend vào Container
COPY . .

# Câu 37: Khai báo port 5000
EXPOSE 5000

# Câu 38: Lệnh khởi động Backend
CMD ["node", "server.js"]