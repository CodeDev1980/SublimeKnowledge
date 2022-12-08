const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')
const SitemapGenerator = require('sitemap-generator');
const app = new express();
// Setting App
require('dotenv').config();
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan())
app.use(bodyParser.urlencoded({exntended:true}));
app.use(fileUpload());
app.use(flash())
app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

// create generator
const generator = SitemapGenerator('https://sublimeknowledge.herokuapp.com/', {
    stripQuerystring: true
});

// register event listeners
generator.on('done', () => {
    // sitemaps created
});

// start the crawler
generator.start();

/////////////////////////////////////////////////////
// DB Connection
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
if(!mongoose){
    console.log('No DB connection')
} else {
    console.log('DB connection')
}

////////////////////////////////////////////////////////
// MiddleWares
const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleWare = require('./middleware/authMiddleware');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening')
})

/////////////////////////////////////////////////////////////
// Pages
const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const panelController = require('./controllers/panel');
const paymentController = require('./controllers/payment')
const thankYouController = require('./controllers/thankyou');
////////////////////////////////////////////////////////////////
// NOT WORKING FEATURE YET
// const sendContactController = require('./controllers/sendForm');
///////////////////////////////////////////////////////////////
const productsController = require('./controllers/products')
const healthController = require('./controllers/health')
const wealthController = require('./controllers/wealth')
const loveController = require('./controllers/love')
const registerController = require('./controllers/register');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout')
const userRegisterController = require('./controllers/userRegister')
const registerUserController = require('./controllers/createRegister')
////////////////////////////////////////////////////////////////////////////
/////// Users
app.get('/auth/register', redirectIfAuthenticated, registerController);
app.post('/users/register', storeUserController)
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/user/login', loginUserController)
app.get('/auth/logout', logoutController)
app.get('/panel', authMiddleWare, panelController);
app.get('/createRegister', registerUserController)
app.post('/register/store', userRegisterController);

const deleteRegisterController = require('./controllers/deleteRegister');
app.get('/deleteRegister/:id', authMiddleWare, deleteRegisterController);

//////////////////////////////////////////////////////////////////////////
// Review
const reviewsController = require('./controllers/reviews')
app.get('/reviews', reviewsController)
const newReviewController = require('./controllers/newReview')
app.get('/createReview', newReviewController)
const storeReviewController = require('./controllers/storeReview')
app.post('/review/store', storeReviewController)

//////////////////////////////////////////////////////////////////////
// Blogs
const blogsController = require('./controllers/blogs');
app.get('/blogs', blogsController);
const singlePostController = require('./controllers/singlePost');
app.get('/singlePost/:id', singlePostController)
const newPostController = require('./controllers/newPost');
app.get('/create', newPostController);
const storePostController = require('./controllers/storePost');
app.post('/post/store', storePostController);
const deletePostController = require('./controllers/deletePost');
app.get('/deletePost/:id', authMiddleWare, deletePostController);
/////////////////////////////////////////
//nodemailer

/////////////////////////////////////////////////////////////////////////
// Pages
app.get('/', homeController)
app.get('/about', aboutController)
app.get('/products', productsController)
app.get('/payment', paymentController)
app.get('/register/thankyou', thankYouController)
app.get('/health', healthController)
app.get('/wealth', wealthController)
app.get('/love', loveController)
/////////////////////////////////////////////////////////////////////////////
// Waiting to connect to a service for this feature, DO NOT UNCOMMENT
// app.post("/contact", sendContactController, async (req, res, next) => {
//     const { yourname, youremail, yoursubject, yourmessage } = req.body;
//     try {
//       await mainMail(yourname, youremail, yoursubject, yourmessage);
      
//       res.send("Message Successfully Sent!");
//     } catch (error) {
//       res.send("Message Could not be Sent");
//     }
//   });
////////////////////////////////////////////////////////////////////////////

app.use((req,res) => res.render('notFound'));
