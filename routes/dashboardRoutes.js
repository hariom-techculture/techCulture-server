import express from 'express';
import {authenticateUser,adminAuthorize} from "../middlewares/authMiddleware.js"
import {
    getUserCount,
    getJobPostCount,
    getJobApplicationCount,
    getEnquiryCount,
    getContactCount,
    getRecentApplications,
    getRecentEnquiries,
    getActivityStats
} from '../controllers/dashboardController.js';

const router = express.Router();

// Count endpoints
router.get("/user/count", authenticateUser, adminAuthorize, getUserCount);
router.get(
  "/job-post/count",
  authenticateUser,
  adminAuthorize,
  getJobPostCount
);
router.get(
  "/job-application/count",
  authenticateUser,
  adminAuthorize,
  getJobApplicationCount
);
router.get("/enquiry/count", authenticateUser, adminAuthorize, getContactCount);
router.get("/contact/count", authenticateUser, adminAuthorize, getContactCount);

// Recent items endpoints
router.get(
  "/job-application/recent",
  authenticateUser,
  adminAuthorize,
  getRecentApplications
);
router.get(
  "/enquiry/recent",
  authenticateUser,
  adminAuthorize,
  getRecentEnquiries
);

// Activity stats
router.get(
  "/stats/activity",
  authenticateUser,
  adminAuthorize,
  getActivityStats
);

export default router;
