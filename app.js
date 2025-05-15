const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const session = require('express-session');
var session = require('./session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminsRouter = require('./routes/admins');
const recruiterRouter = require('./routes/recruiter');
const candidatureRouter = require('./routes/candidature');
const loginRouter = require('./routes/login');
const organisationRouter = require('./routes/organisation');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// autre version debut tp4
// const deuxHeures = 1000 * 60 * 60 * 2;
// app.use(session({
//   secret: "un secret pour tester",
//   saveUninitialized: true,
//   cookie: { maxAge: deuxHeures },
//   resave: false
// }));


// check user before app.use (path, router)
app.all("*", function (req, res, next) {
  const nonSecurePaths = ["/login", "/signup"];
  const adminPaths = ["/admin"]; //list des urls admin
  if (nonSecurePaths.includes(req.path)) {
    console.log("debug non secure path")
    return next();}
  //authenticate user
  if (adminPaths.includes(req.path)) {
    console.log("debug admin path")
    if (session.isConnected(req.session, "admin")) return next();
    else
      res
        .status(403)
        .render("error", { message: " Unauthorized access", error: {} });
  } else {
    if (session.isConnected(req.session)) return next();
    // not authenticated
    else res.redirect("/login");
  }
});


app.post('/login', (req, res) => {
  console.log("todo // Vérification des informations d'identification de l'utilisateur")
  // if (req.body.username === 'user' && req.body.password === pwd) {

  if (true) {
    // Création d'une session utilisateur
    session.creatSession()

    console.log(req.session) //BUG req.session non def 
    req.session.user = req.body.username;


    // Ajouter le rôle aussi dans la session
    req.session.role = 'user';
    res.send('Authentification réussie !');
  } else {
    res.send('Nom d\'utilisateur ou mot de passe incorrect.');
  }
});






// app.use('/', indexRouter);

// app.get('/', (req, res) => {
//   session = req.session;
//   console.log("session.userid =" + session.userid)
//   if (session.userid) {
//     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
//   } else
//     res.redirect("/login");
// });

app.get('/profil', (req, res) => {
  console.log("TODO router profil")
  if (req.session.user) {
    res.send('Bienvenue sur votre profil, ' + req.session.user + '!');
  } else {
    res.redirect('/login');
  }
});

app.use('/users', usersRouter);
app.use('/admins', adminsRouter);
app.use('/recruiter', recruiterRouter);
app.use('/candidature', candidatureRouter);
app.use('/login', loginRouter);
app.use('/organisation', organisationRouter);

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
