import multer from 'multer';
import path from 'path';


const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const fileType = path.extname(file.originalname).toLowerCase();
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject the file
        }
    }
});