const Blog = require('../models/blog.model');
const readingTime = require('reading-time');
const verifyToken = require('../middleware/auth')

const createArticle = async (req, res, next) =>{
    
    
    const newArticle = new Blog({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        body: req.body.body,
        reading_time: readingTime(req.body.body),
        author: req.user._id
        
    })
    
    try{
        const savedArticle = await newArticle.save();
        
        res.status(201).json(savedArticle) 
     } 
     catch(err){
         next(err)
     }
}

const updateState = async (req, res) => {
    
        const { id } = req.params;
        const { state } = req.body;
        const user = req.user._id

        // const article = await Blog.findById(id)
        try{
            const article = await Blog.findOne({id, author: req.user._id})
            console.log(user)
            console.log(article.author)
            
            

            if (!article) {
                console.log('you are not the author')
                return res.status(404).json({ status: false, article: null })
            }
            // console.log(article.author)
            // console.log(req.user._id)
            // if(article.author !== req.user._id){
            //     return res.status(400).json({message: 'You are not the owner of the article'})
            // }

            if(article.state === 'published'){
                return res.status(400).json({message: 'Article already published'})
            }

            article.state = state;

            await article.save()

            return res.json({ status: true, article })
        }
         catch(err){
            console.log(err)
            res.json(err)
    }
}

const editArticle = async (req, res, next) => {

    const { id } = req.params;
    const update = Object.keys(req.body);
    const allowedUpdate = ['description', 'title', 'body', 'tags']
    const isValidOperation = update.every((update) => {
        return allowedUpdate.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try{
        
        const article = await Blog.findById(id)
        update.forEach((update) => article[update] = req.body[update])

        if (!article) {
            return res.status(404).json({ status: false, article: null })
        }
        
        const newArticle = await article.save()

        return res.json({ status: true, newArticle })
        
    } catch(err){
        next(err)
    }
}

const getArticles = async (req, res) => {
    
    const { state} = req.query;
    const findQuery = {};

    try{
        if (state === 'published') {
            findQuery.state = state;
            const articles = await Blog.find(findQuery)
            return res.json({ status: true, articles })
        }
        else {
            return res.json({ status: false, message: 'not allowed'})
        }
    } catch(err){
        return res.json(err);
    }
    

    
}

const getArticleById = async (req, res) => {

    const articleId = req.params.id;
    try{
        const article = await Blog.findById(articleId)

    if (article.state !== 'published') {
        return res.status(404).json({ status: false, article: null })
    }

    return res.json({ status: true, article })
    } catch(err){
        return res.json(err);
    }
    
}


module.exports = {
    createArticle,
    updateState,
    editArticle,
    getArticles,
    getArticleById
}