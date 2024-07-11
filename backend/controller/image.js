import express from "express";
import multer from "multer";
import { Image } from "../models/image.js";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            callback(null, true);
        } else {
            console.log("Error! Only jpg, jpeg & png Images are allowed.");
            callback(null, false)
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 2
    }
});

const imageUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            console.log(req.file)
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const newImage = new Image({
            image: req.file.path
        })
        await newImage.save();
        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newImage
        });
    } catch (error) {
        next(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}


// router.get('/images', async (req, res, next) => {
//     try {
//         const images = await Image.find();
//         res.json(images);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

export default imageUpload;
