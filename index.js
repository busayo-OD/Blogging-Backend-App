const express = require('express');
const {connectToMongoDB} = require('./src/database/db');
const authRouter = require('./src/routes/user.route');
const blogRouter = require('./src/routes/blog.route');
const bodyParser = require('body-parser');
require("dotenv").config()

const app = express()

const PORT = process.env.PORT

// Connect to MongoDB
connectToMongoDB();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', authRouter );
app.use('/blogs', blogRouter );

// home route
app.get('/', (req, res) => {
    return res.json({ status: true })
})

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})





app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
