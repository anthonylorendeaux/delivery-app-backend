import multer from "multer";
import path from "path";
import Logger from "../utils/logger";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"))
    },
    filename: function(req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
  });

  const multerFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  }

  const upload = multer({storage: storage, fileFilter: multerFilter});

  export default upload;