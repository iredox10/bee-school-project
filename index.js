const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const ejs  = require('ejs')
const methodOverride = require('method-override')
require('dotenv').config()
// const cookieParser = require('cookie-parser')

// middlewares
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
// app.use(cookieParser)
app.use(routes)

mongoose
	.connect(process.env.DB_URL )
	.then((result) => app.listen(process.env.PORT || 5000))
	.catch((err) => console.log(err));


