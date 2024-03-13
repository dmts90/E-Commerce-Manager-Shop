import express from "express";
import multer from "multer";
const router = express.Router();
import path from "path";

//Create storage destination and filename of the file uploaded

const storage = multer.diskStorage({
  //Handle destination of file to uploads folder
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    //rename file and add extention
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.memetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({
  storage,
  filFilter: function (req, file, cb) {
    //Validate image uploaded to be of appropriate
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`${req.file.path}`);
});

export default router;
