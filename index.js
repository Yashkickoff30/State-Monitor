const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Routes
const apiRouter = require('./routes/api');
const webRouter = require('./routes/web');

const app = express();

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
app.use('/', webRouter);

// DB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to DB!')
);

// PORT selection and firing up the Server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
