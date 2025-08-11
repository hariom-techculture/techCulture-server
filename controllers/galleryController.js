import { deleteFromCloudinary, uploadToCloudinary } from "../config/cloudinaryService.js";
import galleryModel from "../models/galleryModel.js";

// create gallery
export const createGalleryController = async (req, res)=>{
    try{
        const {title, category, galleryType} = req.body;
        
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        const newGallery = new galleryModel({
            title,
            category,
            galleryType
        });

        if(req.file){
            let foldername = "Gallery";
            const file = req.file;
            const result = await uploadToCloudinary([file], foldername);
            const url = result[0].url;
            newGallery.url = url || "";
        }

        await newGallery.save();

        res.status(201).json({
            success: true,
            message: "Gallery created successfully",
            gallery: newGallery
        });

    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get all gallery images
export const getAllGallery = async (req, res)=>{
    try{
        const {galleryType} = req.body;
        const gallery = await galleryModel.find({galleryType}).sort({date: -1});
        res.status(200).json({
            success: true,
            message: "Gallery fetched successfully",
            gallery
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get by id 
export const getGalleryById = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await galleryModel.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: "Gallery data not found" });
        }
        return res.status(200).json({
            message: "Gallery data fetched successfully",
            gallery
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// delete gallery
export const deleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await galleryModel.findByIdAndDelete(id);
        if (!gallery) {
            return res.status(404).json({ message: "Gallery data not found" });
        }
        if(gallery.url){
            await deleteFromCloudinary(gallery.url);
        }   
        return res.status(200).json({
            message: "Gallery data deleted successfully",
            gallery
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// update gallery
export const updateGalleryImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, galleryType } = req.body;

        const gallery = await galleryModel.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: "Gallery data not found" });
        }

        if(req.file){
            if(gallery.url){
                await deleteFromCloudinary(gallery.url);
            }
            const foldername = "Gallery";
            const file = req.file;
            const result = await uploadToCloudinary([file], foldername);
            gallery.url = result[0].url || "";
        }

        gallery.title = title || gallery.title;
        gallery.category = category || gallery.category;
        gallery.galleryType = galleryType || gallery.galleryType;

        await gallery.save();
        
        return res.status(200).json({
            message: "Gallery data updated successfully",
            gallery
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
