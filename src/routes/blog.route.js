const blogRouter = require('express').Router();
const blogController = require('../controllers/blog.controller');
const verifyToken = require('../middleware/auth');


blogRouter.post('/create', verifyToken, blogController.createArticle);
blogRouter.patch('/state/:id', verifyToken, blogController.updateState);
blogRouter.patch('/edit/:id', blogController.editArticle);
blogRouter.get('', blogController.getArticles);
blogRouter.get('/:id', blogController.getArticleById);


module.exports = blogRouter;