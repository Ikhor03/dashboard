import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import sequelizeStore from "connect-session-sequelize";
import db from "./config/database.js"
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import authRoute from "./routes/authRoute.js"
dotenv.config();


const app = express();
const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({db});

//create table from model
// (async () => {
//     await db.sync();
// })()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',

}))
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store : store,
    cookie: {
        secure: 'auto'
    }
}))
app.use('/api',userRoute);
app.use('/api',productRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.json({
        "welcome": "welcome to USER API"
    })
})

// store.sync(); //create table

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running.., port ' + process.env.APP_PORT)
});