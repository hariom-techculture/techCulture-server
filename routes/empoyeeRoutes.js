import express from "express";
import multer from "multer";
const router = express.Router();
import { adminAuthorize, authenticateUser } from "../middlewares/authMiddleware.js";

import {createEmployee,deleteEmployee,getAllEmployees,getEmployeeById,updateEmployee} from "../controllers/employeeController.js";

const upload = multer({ dest: 'uploads/' });

router.post("/", authenticateUser, adminAuthorize, upload.single('file'), createEmployee);
router.get("/",  getAllEmployees);
router.get("/:id", authenticateUser, getEmployeeById);
router.put("/:id", authenticateUser, adminAuthorize, upload.single('file'), updateEmployee);
router.delete("/:id", authenticateUser, adminAuthorize, deleteEmployee);

export default router;