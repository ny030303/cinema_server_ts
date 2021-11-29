import multer from 'multer';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null,'./public/images/users')},
  filename: function (req, file, cb) { cb(null, `${Date.now()}_${file.originalname}`) }
});
let localFormDataUpload = multer({storage: storage});

export default localFormDataUpload;