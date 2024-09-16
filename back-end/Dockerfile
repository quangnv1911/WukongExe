# Bước 1: Sử dụng hình ảnh Node.js chính thức làm base image
FROM node:20-alpine AS build-stage

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install --frozen-lockfile

# Sao chép toàn bộ mã nguồn
COPY . .

# Bước 2: Tạo hình ảnh sản phẩm cuối cùng để chạy ứng dụng
FROM node:20-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép các tệp cần thiết từ bước build
COPY --from=build-stage /app /app

# Expose port mà ứng dụng sẽ chạy trên
EXPOSE 3008

# Chạy ứng dụng
CMD ["node", "index.js"]
