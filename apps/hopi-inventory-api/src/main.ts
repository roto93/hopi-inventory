import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import * as path from 'path';
import init from './configs/passportConfig';
import userRoutes from './routes/userRoutes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

init(passport)

// mock database
export const users = []

const app = express();
app.use(cors())
app.use(express.json()) // json parser
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/user', userRoutes)

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
