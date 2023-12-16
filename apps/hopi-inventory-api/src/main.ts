import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import * as path from 'path';
import init from './configs/passportConfig';
import authRoutes from './routes/authRoutes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}


// mock database
export const users = []

const app = express();
app.use(cors({
  origin: "http://localhost:4200", // allow to server to accept request from different origin
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true
}))
app.use(express.json()) // json parser
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

init(passport)
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/auth', authRoutes)


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
