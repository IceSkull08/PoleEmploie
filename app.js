const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const session = require('express-session');
const session = require('./session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins');
const recruiterRouter = require('./routes/recruiter');
const candidatureRouter = require('./routes/candidature');
const loginRouter = require('./routes/login');
const organisationRouter = require('./routes/organisation');

// API routes td4 REST vuejs
const apiRouter = require('./routes/api');
var cors = require('cors');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// autre version debut tp4
// const deuxHeures = 1000 * 60 * 60 * 2;
// app.use(session({
//   secret: "un secret pour tester",
//   saveUninitialized: true,
//   cookie: { maxAge: deuxHeures },
//   resave: false
// }));


// console.log("debug : app.use(session.init())")
app.use(session.init()) // session.init() retourne un objet session (sera attaché à req)


// check user before app.use (path, router)
app.all("*", function (req, res, next) {
  // console.log("debug : app.all()")
  // console.log(req.session)
  if(req.path.startsWith("/api/")) {
    return next();
  }
  
  const nonSecurePaths = ["/login", "/signup","/logout"];
  const adminPaths = ["/admin","/admins"]; //list des urls admin
  const recruterPaths = ["/recruiter"]; //list des urls recruteur
  if (nonSecurePaths.includes(req.path)) {
    console.log("debug non secure path")
    return next();}
  //authenticate user
  if (adminPaths.includes(req.path)) {
    // console.log("debug admin path");
    if (session.isConnected(req.session, "admin")) return next();
    else res.redirect("/login");
      // res
      //   .status(403)
      //   .render("error", { message: " Unauthorized access", error: {} });
  }else if (recruterPaths.includes(req.path)) {
    // console.log("debug recruter path");
    if (session.isConnected(req.session, "recruteur")) return next();
    // else  res.status(403).render("error", { message: " Unauthorized access", error: {} });
    else res.redirect("/login");

  }
  else {
    if (session.isConnected(req.session)) return next();
    // not authenticated
    else res.redirect("/login");
  }
});




app.use('/', indexRouter);


app.get('/profil', (req, res) => {
  // console.log("TODO router profil")
  if (req.session.user) {
    res.send('Bienvenue sur votre profil, ' + req.session.user + '!');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  // console.log("session detruite",session);
  res.redirect('/login');
});

app.use('/users', usersRouter);
app.use('/admins', adminsRouter);
app.use('/recruiter', recruiterRouter);
app.use('/candidature', candidatureRouter);
app.use('/login', loginRouter);
app.use('/organisation', organisationRouter);


// API routes td4 REST vuejs
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
