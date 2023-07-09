import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/database.js"
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import authRoute from "./routes/authRoute.js"
dotenv.config();


const app = express();

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

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running.., port ' + process.env.APP_PORT)
});