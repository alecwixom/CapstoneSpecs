require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/database')
const {PORT} = process.env
const {User} = require('./models/user')
const {Post} = require('./models/post')
const {getAllPosts, getCurrentUserPosts, addPost, deletePost, editPost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()
app.use(express.static(__dirname + '/../build'))
app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

//auth
app.post('/register', register)
app.post('/login', login)

//no auth
app.get('/posts', getAllPosts)

//auth required
app.post('/posts', isAuthenticated, addPost)
app.get('/userposts/:userId', getCurrentUserPosts)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`));
    })
    .catch(err => console.log(err))