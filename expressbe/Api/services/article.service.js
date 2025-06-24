const ArticleModel = require("../model/article.model");

class ArticleService {
  createArticle_srv = async (data) => {
    let user_Data = new ArticleModel(data);
    return await user_Data.save();
  };

  fetchAllDateArticle = async () => {
    return await ArticleModel.find();
  };
  getArticleServiceID = async (id) => {
    try {
      return await ArticleModel.findById(id);
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
  UpdateArticle_srv = async (data, id) => {
    try {
      let response = await ArticleModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return response;
    } catch (err) {}
  };
  DeleteArticleIDService = async (id) => {
    try {
      let response =  await ArticleModel.findByIdAndDelete(id);
      return response
    } catch (err) {
      throw {
        status: 400,
        msg: err,
      };
    }
  };
}

module.exports = ArticleService;
