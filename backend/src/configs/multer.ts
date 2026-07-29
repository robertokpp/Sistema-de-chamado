import multer from "multer";
import path from "node:path";

const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar");
  },
  filename: function (req, file, cb) {
    const userId = req.user?.id;

    if (!userId) {
      return cb(new Error("Não foi possível realizar o upload da imagem"), "");
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Formato de arquivo não permitido"), "");
    }

    const extName = path.extname(file.originalname);
    cb(null, `${userId}${extName}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});
