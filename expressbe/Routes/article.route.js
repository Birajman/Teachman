const router = require('express').Router()
const ArticleController = require('../Api/controller/article.controller')
const AuthCheck = require('../Api/middleware/auth_middleware')
const uploader = require('../Api/middleware/uploader.middleware')
const article_ctrl = new ArticleController()

router.route("/")
    .post(AuthCheck, uploader.single('image'), article_ctrl.createArticle)
    .get(article_ctrl.fetAllArticle)

router.route("/:id")
    .get(article_ctrl.getArticleID)
    .put(uploader.single('image'), article_ctrl.updateArticle)
    .delete(article_ctrl.deleteArticle)


module.exports = router