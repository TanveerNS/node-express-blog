const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 5000;

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/nsblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

//listen port
app.listen(PORT, function(){
  console.log(`Server running on http://localhost:${PORT}`)
});
