//Requiring Dependences
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); //for parsing cookies

const connectDB = require('./connection.js'); //requring mongoDB connection file(contains connection function)

//Middlewares
const logsCounter = require('./middlewares/logsCounter.js');
const jsonPlug = require('./middlewares/jsonPlug.js');
const restrictToLoggedinUsersOnly = require('./middlewares/auth.js');

//Routes
const index = require('./routes/index.js');
const url = require('./routes/url.js');
const redirect = require('./routes/redirect.js');
const userRoute = require('./routes/user.js');
const loginRoute = require('./routes/login.js');

connectDB();//Connection to mongoDB database


//Middlewares..
app.use(jsonPlug);
app.use(cookieParser()); //for parsing cookies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/generate', restrictToLoggedinUsersOnly);
app.use('/id/:id', restrictToLoggedinUsersOnly);

dotenv.config({
    path: './.env',
})

app.get('/', index);

app.get('/id/:shortID', redirect);

app.post('/generate', url);
app.get('/generate', url);

app.post('/user/signin', userRoute);
app.get('/user/signin', userRoute);

app.post('/user/login', loginRoute);
app.get('/user/login', loginRoute);

app.listen(process.env.PORT, () => {
    console.log(`App is listening on http//localhost:${process.env.PORT}`);
})