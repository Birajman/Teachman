const generateRandom = require("../../Helpers/randomNumber");
const ArticleService = require("../services/article.service");
const slugify = require("slugify");

class ArticleController {
  constructor() {
    this.article_srv = new ArticleService();
  }
  createArticle = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      data["slug"] = slugify(data.heading, {
        lower: true,
      });
      data["article_order"] = generateRandom(15);
      data.publish_by = req.auth_user.firstName+" "+ req.auth_user.lastName

      let store = await this.article_srv.createArticle_srv(data);

      res.json({
        result: store,
        msg: "Article has been created successfully!",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  fetAllArticle = async (req, res, next) => {
    try {
      let result = await this.article_srv.fetchAllDateArticle();
      res.json({
        result: result,
        msg: "Fetched All Data",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  getArticleID = async (req, res, next) => {
    try {
      let result = await this.article_srv.getArticleServiceID(req.params.id);
      res.json({
        result: result,
        msg: "Article Data by ID",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  updateArticle = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }

      let store = await this.article_srv.UpdateArticle_srv(data, req.params.id);
      res.json({
        result: store,
        msg: "Your Article has been Updated Successfully",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  deleteArticle = async (req, res, next) => {
    try {
      let content = await this.article_srv.DeleteArticleIDService(req.params.id);
      if (content) {
        res.json({
          result: content,
          msg: "Article has been Deleted Successfully",
          status: true,
        });
      } else {
        next({
          status: 404,
          msg: "Article does not exist anymore.",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
module.exports = ArticleController;
