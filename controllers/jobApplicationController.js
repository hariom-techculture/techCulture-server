import jobApplicationModel from "../models/jobApplicationModel.js";
import {deleteFromCloudinary,uploadToCloudinary} from "../config/cloudinaryService.js"

// create 
export const createJobApplication = async (req, res) => {
    try {
        const { jobId, name, email, phone, coverLetter, portfolioUrl, additionalInfo="" } = req.body;

        if (!jobId || !name || !email || !phone) {
          return res
            .status(400)
            .json({ message: "Please provide all required fields" });
        }

        if(!req.file){
            return res.status(400).json({ message: "Please provide a resume" });
        }

        
        const existingApplication = await jobApplicationModel.findOne({
          jobId,
          email,
        });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        const newJobApplication = new jobApplicationModel({
          jobId,
          name,
          email,
          phone,
          coverLetter,
          portfolioUrl,
          additionalInfo,
        });
        let folder = "jobApplications";
        let resume = await uploadToCloudinary([req.file],folder);
        if (!resume) {
            return res.status(500).json({ message: "Failed to upload resume" });
        }
        newJobApplication.resumeUrl = resume[0].url;

        await newJobApplication.save();
        res.status(201).json({ message: "Job application created successfully", jobApplication: newJobApplication });
        
    } catch (error) {
        console.error("Error creating job application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get all job applications
export const getAllJobApplications = async (req, res) => {
    try {
        const jobApplications = await jobApplicationModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Job applications fetched successfully",
            jobApplications
        });
        
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get job application by ID
export const getJobApplicationById = async (req, res) => {
    try {
        const { jobId } = req.params;

        const jobApplication = await jobApplicationModel.findOne({ jobId });
        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }
        res.status(200).json({
            message: "Job application fetched successfully",
            jobApplication
        });

    } catch (error) {
        console.error("Error fetching job application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get job application by filters
export const getJobApplicationsByFilters = async (req, res) => {
    try {
        const { jobId, status } = req.params;

        let filter = {};
        if (jobId) filter.jobId = jobId;
        if (status) filter.status = status;

        const jobApplications = await jobApplicationModel.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Job applications fetched successfully",
            jobApplications 
        });
        
    } catch (error) {
        console.error("Error fetching job applications by filters:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// edit
export const editJobApplication = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updates = req.body;

        const jobApplication = await jobApplicationModel.findOneAndUpdate({ jobId }, updates, { new: true });
        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        res.status(200).json({ message: "Job application updated successfully", jobApplication });
        
    } catch (error) {
        console.error("Error updating job application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// delete
export const deleteJobApplication = async (req, res) => {
    try {
        const { id } = req.params;

        const jobApplication = await jobApplicationModel.findOneAndDelete({ _id : id });
        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }
        if(jobApplication.resumeUrl){
            await deleteFromCloudinary(jobApplication.resumeUrl);
        }

        res.status(200).json({ message: "Job application deleted successfully" });

    } catch (error) {
        console.error("Error deleting job application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}