import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const uplaod = multer({ storage });

export default uplaod;
