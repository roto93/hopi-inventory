import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import * as path from 'path';
import init from './configs/passportConfig';
import authRoutes from './routes/authRoutes';
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes';
import MongoStore from 'connect-mongo'
import eventRoutes from './routes/eventRoutes';
import categoryRoutes from './routes/categoryRoutes';
import costRoutes from './routes/costRoutes';
import productRoutes from './routes/productRoutes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}


const app = express();


// allow to server to accept request from different origin
app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true
}))


// json parser
app.use(express.json())


// client can access static files at /assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));


// If no database name is specified in the connection string,
// MongoDB will default to using a database named "test".
// If "test" doesn't exist, MongoDB will create it when saving a document.
// 
// Alternatively, specify a different database name in the connection string:
// const uri = 'mongodb+srv://<username>:<password>@<clustername>.mongodb.net/mydatabase';
mongoose.connect(process.env.MONGO_URL)
  .then((m) => {

    // set up sessions, persist sessions when server restart
    app.use(flash())
    app.use(session({
      secret: 'test',
      resave: true,
      store: MongoStore.create({ client: mongoose.connection.getClient() as any }),
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3, // 设置 session 的有效时间，单位毫秒
      },
    }));


    // use passport.js
    init(passport)
    app.use(passport.initialize())
    app.use(passport.session())


    // Routes
    app.use('/auth', authRoutes)
    app.use('/user', userRoutes)
    app.use('/event', eventRoutes)
    app.use('/category', categoryRoutes)
    app.use('/cost', costRoutes)
    app.use('/product', productRoutes)


    // start listening
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Connecting to database and listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);

  })
  .catch(e => console.error(e))