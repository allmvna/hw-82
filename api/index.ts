import express from 'express';
import cors from 'cors';
import artistRouter from "./routes/artist/artist";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import albumRouter from "./routes/album/album";
import trackRouter from "./routes/track/track";
import userRouter from "./routes/user/user";
import trackHistoryRouter from "./routes/trackHistory/trackHistory";
import config from "./config";
import path from "path";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistoryRouter);
app.use('/fixtures', express.static(path.join(__dirname, 'fixtures')));

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', err => {
        mongoDb.disconnect();
    })
};


run().catch(e => console.error(e));


