// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

import * as config from './src/server/config';
import * as bodyParser from 'body-parser';
import * as logger from './src/server/logger';
import * as api from './src/server/api';
import * as session from 'express-session';
import * as passport from 'passport';
import * as methodOverride from 'method-override';
import * as partials from 'express-partials';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';
const RedisSessionStore = connectRedis(session);


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// setup passport
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
// Express server
const app = express();


// Add body parser.
app.use(partials());
app.use( cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Add session manager
const sess = {
  secret: "dcex",
  // genid: req => {return model.guid()},
  // store: new RedisSessionStore(model.redisOption),
  saveUninitialized: false,
  resave: false,
  proxy: true,
  httpOnly: true,  
  secure: false,
  signed: false,
  cookie: {
   path: '/',
   domain: '.dcexploration.com',
   maxAge: 1000000 * 60 * 24 // 24 hours
  }
};
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.use('/api', api);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

process.on('uncaughtException', err => logger.error('uncaught exception:', err.toString()));
process.on('unhandledRejection', error => logger.error('unhandled rejection:', error.toString()));