// uploadMiddleware.js
const multer = require('multer');

// Cấu hình multer để lưu trữ file trong thư mục "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // Tạo tên file mới bằng cách kết hợp timestamp và tên file gốc
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// Hạn chế loại file cho phép upload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpeg, png, gif) are allowed!'), false);
  }
};

// Khởi tạo middleware multer
const uploadMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
