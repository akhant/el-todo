import { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
const express = require('express'),
  path = require('path'),
  //favicon = require('serve-favicon'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  app = express();


  dotenv.config()
//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 app.use("/api", routes);

app.get('/', (req: Request, res: Response) => {
  res.send('server is ok');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next();
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.listen(3005, () => {
  console.log('listening on 3005');
});
export default app;
