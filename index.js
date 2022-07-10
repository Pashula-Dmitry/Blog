import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';
import { registerValidation, loginValidation, postCreateValidation } from './validation.js';
import { PostController, UserController } from "./controllers/index.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.tvkdu.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => {
    console.log('DB is ok');
}).catch((err) => {
    console.log('DB error => ', err);
})


const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`,
    });
})


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/tags', PostController.getLastTags);

app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);





app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server is alive');
})
