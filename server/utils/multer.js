import multer, { diskStorage } from "multer";

export default multer({
  storage: diskStorage({}),
  fileFilter: (req, file, cb) => {
    // console.log(file);
    // if (!file.mimetype.match("image/jpeg|image/jpg|image/png|image/gif")) {
    //   //image/jpeg contains both jpeg and jpg
    //   cb(new Error("File is not supported"), false);
    //   return;
    // }
    // console.log(2)
    cb(null, true);
    // console.log(3);
  },
});
