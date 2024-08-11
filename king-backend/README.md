# The backend of King Website

> Đây là dự án thiết kế backend của website King, với thiết kế chức năng cơ bản.

- Xác thực: Đăng nhập, Đăng ký, Đăng xuất.

- Tài khoản: Lấy - Cập nhật thông tin người dùng.

- Sản phẩm: CRUD Ảnh.

## Công nghệ sử dụng:

- NodeJS, ExpressJS, MongoDB, JSON Web Tokens, Mongoose, Cloudinary.

### Xác thực

- `POST /auth/register`: Đăng ký người dùng.

```json
{
  "username": "example", // Yêu cầu
  "email": "example@gmail.com", // Yêu cầu
  "password": "12345678" // Yêu cầu
}
```

- `POST /auth/login`: Khi đăng nhập, access token sẽ tự động được tạo và refresh token sẽ tự động được lưu trong cookie.

```json
{
  "email": "example@gmail.com", // Yêu cầu
  "password": "12345678" // Yêu cầu
}
```

- `POST /auth/logout`: Khi bạn đăng xuất, máy chủ sẽ tự động xóa cookie refresh token.

- `POST /auth/refreshtoken`: Làm mới token khi access token hết hạn.

### Account

- `GET /account/uid`: Lấy thông tin người dùng.

- `PUT /account/uid`: Cập nhật thông tin người dùng đã đăng nhập (Bắt buộc xác thực).

### Pin

- `POST /pin`: Tạo một hình ảnh (Bắt buộc phải xác thực).

```json
  // Nên sử dụng form-data
  "title": "", // Yêu cầu
  "category": "", // Yêu cầu
  "description": "",
  "thumbnail": "" // Yêu cầu
```

- `PUT /pin/:pid`: Cập nhật hình ảnh (Bắt buộc xác thực).

- `DELETE /pin/:pid`: Xóa hình ảnh (Bắt buộc phải xác thực).

- `GET /pin/?title=''&category=''&page=''&limit=''`: Lấy danh sách tất cả hình ảnh.

- `GET /pin/:pid`: Lấy thông tin về một hình ảnh.
