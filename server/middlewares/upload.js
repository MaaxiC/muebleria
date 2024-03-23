import multer from "multer";
import { __dirname } from "../utils.js";
import path from "path";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "./public/uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error");
  }
};

export const Upload = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).any();
