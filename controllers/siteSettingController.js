import { deleteFromCloudinary } from "../config/cloudinaryService.js";
import SiteSetting from "../models/siteSettingModel.js";

export const getSiteSetting = async (req, res) => {
  try {
    const siteSetting = await SiteSetting.findOne();
    res.status(200).json({ success: true, data: siteSetting });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch site settings" });
  }
};

export const updateSiteSetting = async (req, res) => {
  try {
    const {
      siteTitle,
      email,
      contactNo,
      facebook,
      instagram,
      twitter,
      linkedin,
      iframe,
      address
    } = req.body;

    const data = {
      siteTitle,
      email,
      contactNo,
      facebook,
      instagram,
      twitter,
      linkedin,
      iframe,
      address
    };
    let siteSetting = await SiteSetting.findOne();

    if(req.file){
        if(siteSetting.logo){
            await deleteFromCloudinary(siteSetting.logo);
        }
        const foldername = "siteSetting";
        const file = req.file;
        const result = await uploadToCloudinary([file], foldername);
        data.logo = result[0].url;
        if (!data.logo) {
          return res.status(400).json({ success: false, message: "Logo upload failed" });
        }
    }

    if (siteSetting) {
      Object.assign(siteSetting, data);
    } else {
      siteSetting = new SiteSetting(data);
    }

    await siteSetting.save();
    res.status(200).json({ success: true, data: siteSetting });
  } catch (error) {
    console.error("Error updating site setting:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};