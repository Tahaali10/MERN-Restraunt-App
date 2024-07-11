import express from "express";
import send_reservation from "../controller/reservation.js";
import imageUpload from "../controller/image.js";
import { upload } from "../controller/image.js";

const router = express.Router();

router.post("/send", send_reservation);
router.post("/image",upload.single("image"),imageUpload)

export default router;
