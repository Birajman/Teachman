const slugify = require("slugify");
const CustomizeArtService = require("../services/customize_art.service");
const CustomizeArtModel = require("../model/customize_art.model");
class CustomizeArtController {
  constructor() {
    this.customize_art_srv = new CustomizeArtService();
  }
  createCustomizeArt = async (req, res, next) => {
    try {
      let data = req.body;
      data.publish_by = req.auth_user.firstName + " " + req.auth_user.lastName;
      let store = await this.customize_art_srv.storeArt(data);
      res.json({
        result: store,
        msg: "Customize Art has been created successfully!",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  getUserCustomizeArt = async (req, res, next) => {
    try {
      let result = await this.customize_art_srv.fetchedData();
      res.json({
        result: result,
        msg: "Fetched All Data",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  getCustomizeByID = async (req, res, next) => {
    try {
      let result = await this.customize_art_srv.CustomizeByID(req.params.id);
      res.json({
        result: result,
        msg: "Customize Data by ID has been found successfully",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  updateCustomizeArt = async (req, res, next) => {
    try {
      let data = req.body;
      let store = await this.customize_art_srv.updateArt(data, req.params.id);
      res.json({
        result: store,
        msg: "Customize Art has been updated successfully!",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  deleteCustomizeArt = async (req, res, next) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ status: false, msg: "No IDs provided" });
      }
      const result = await this.customize_art_srv.DelateByID(ids);
      res.json({
        result,
        msg: "Customize Art deleted successfully",
        status: true,
      });
    } catch (err) {}
  };
  trashCustomizeArt = async(req, res, next) => {
    try{
      const {ids} = req.body;
       if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ status: false, msg: "No IDs provided" });
      }
      console.log("I", ids)
      const result = await this.customize_art_srv.TrashByID(ids);
      res.json({
        result,
        msg: "Customize Art moved to trash successfully",
        status: true,
      });

    }catch(err){

    }
  }
  reStoreCustomizeArt = async(req, res, next) => {
    try{
      const {ids} = req.body;
       if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ status: false, msg: "No IDs provided" });
      }
      console.log("I", ids)
      const result = await this.customize_art_srv.RestoreByID(ids);
      res.json({
        result,
        msg: "Customize Art has been restored successfully",
        status: true,
      });

    }catch(err){

    }
  }
  getTrashList = async (req, res) => {
  try {
    const allTrashed = await CustomizeArtModel.find({ isTrashed: true });
    const now = Date.now();
    const validTrash = [];

    for (let design of allTrashed) {
      const diff = now - new Date(design.trashedAt).getTime();
      const twoDays = 2 * 24 * 60 * 60 * 1000;

      if (diff >= twoDays) {
        await CustomizeArtModel.deleteOne({ _id: design._id });
      } else {
        console.log("OK")
        validTrash.push(design);
      }
    }
    return res.json({ status: true, designs: validTrash });
  } catch (error) {
    console.error("Trash List Error:", error);
    return res.status(500).json({ status: false, msg: "Server error" });
  }
};
}
module.exports = CustomizeArtController;
