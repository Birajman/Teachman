const multer = require('multer')
let myStrong = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = 'public/uploads';
        cb(false, path)
    },
    filename: (req, file, cb) =>{
        let name = Date.now()+file.originalname;
        cb(false, name)
    }
})

const imageFilter = (req, file, cb) => {
    let parts = file.originalname.split(".");
    let ext = parts.pop();
    let allowed = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp']
    if(allowed.includes(ext.toLowerCase())){
        cb(false, true)
    }else{
        cb(true,false)
    }

}
const uploader = multer({
    storage: myStrong,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1024*1024*10
    }
})

module.exports = uploader