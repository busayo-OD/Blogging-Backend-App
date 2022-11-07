const blogRouter = require('express').Router();
const blogController = require('../controllers/blog.controller');
const auth = require('../middleware/auth');


blogRouter.post('/create', auth, blogController.createArticle);
blogRouter.patch('/state/:id', auth, blogController.updateState);
blogRouter.patch('/edit/:id', auth, blogController.editArticle);
blogRouter.get('', blogController.getArticles);
blogRouter.get('/owner', auth, blogController.ownerArticles)
blogRouter.get('/:id', blogController.getArticleById);
blogRouter.delete('/delete/:id', auth, blogController.deleteArticleById);


module.exports = blogRouter;