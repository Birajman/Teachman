const CustomizeArtModel = require("../model/customize_art.model");

class CustomizeArtService {
  storeArt = async (data) => {
    try {
      let response = new CustomizeArtModel(data);
      return await response.save();
    } catch (err) {
      throw err;
    }
  };
  fetchedData = async () => {
    return await CustomizeArtModel.find();
  };
  CustomizeByID = async (id) => {
    try {
      return await CustomizeArtModel.findById(id);
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
  updateArt = async (data, id) => {
    try {
      let response = await CustomizeArtModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return response;
    } catch (err) {}
  };
  DelateByID = async (id) => {
    try {
      return await CustomizeArtModel.deleteMany({ _id: { $in: id } });
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
  TrashByID = async (id) => {
    try {
      let response = await CustomizeArtModel.updateMany(
        { _id: { $in: id } },
        { $set: { isTrashed: true, trashedAt: new Date() } }
      );
      return response
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
  RestoreByID = async (id) => {
    try {
      let response = await CustomizeArtModel.updateMany(
        { _id: { $in: id } },
        { $set: { isTrashed: false} }
      );
      return response
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
}
module.exports = CustomizeArtService;
