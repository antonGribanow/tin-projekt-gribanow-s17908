var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoute');
const gameRouter = require('./routes/gameRoute');
const collectionRouter = require('./routes/collectionRoute');
const userApiRouter = require('./routes/api/UserApiRoute');
const gameApiRouter = require('./routes/api/GameApiRoute');
const collectionApiRouter = require('./routes/api/CollectionApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users-list', userRouter);
app.use('/games-list', gameRouter);
app.use('/collections-list', collectionRouter);
app.use('/api/users', userApiRouter);
app.use('/api/games', gameApiRouter);
app.use('/api/collections', collectionApiRouter);

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
