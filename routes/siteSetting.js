import express from "express";
import {
  getSiteSetting,
  updateSiteSetting,
} from "../controllers/siteSettingController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getSiteSetting);
router.put("/", upload.single("file"), updateSiteSetting);

export default router;