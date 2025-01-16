import mongoose from 'mongoose';
import config from "./config";
import User from "./models/User/User";
import {randomUUID} from "crypto";
import TrackHistory from "./models/TrackHistory/TrackHistory";
import Track from "./models/Track/Track";
import Album from "./models/Album/Album";
import Artist from "./models/Artist/Artist";


const run = async () => {

    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('user');
        await db.dropCollection('album');
        await db.dropCollection('artist');
        await db.dropCollection('track');
        await db.dropCollection('trackHistory');

    } catch (e) {
        console.log("Collections does not exist, skipping drop...");
    }


    const [user1, user2, user3] = await User.create([
        { username: "user 1", password: "123", token: randomUUID() },
        { username: "user 2", password: "456", token: randomUUID() },
        { username: "user 3", password: "789", token: randomUUID() }
    ]);

    const [artist1, artist2, artist3] = await Artist.create([
        { name: 'The Weeknd', photo: 'fixtures/the-weeknd.jpeg', information: 'Canadian singer, songwriter, and record producer.' },
        { name: 'Dua Lipa', photo: 'fixtures/dua-lipa.jpeg', information: 'British-Albanian pop singer.' },
        { name: 'Ed Sheeran', photo: 'fixtures/ed-sheeran.jpeg', information: 'English singer-songwriter and musician.' },
    ]);

    const [album1, album2, album3] = await Album.create([
        { name: 'After Hours', artist: artist1._id, releaseYear: 2020, coverImage: 'fixtures/after-house.jpeg' },
        { name: 'Future Nostalgia', artist: artist2._id, releaseYear: 2020, coverImage: 'fixtures/future-nostalgia.jpeg' },
        { name: 'Divide', artist: artist3._id, releaseYear: 2017, coverImage: 'fixtures/divide.jpeg' },
    ]);

    const [track1, track2, track3, track4] = await Track.create([
        { name: 'Blinding Lights', album: album1._id, duration: 200, trackNumber: 1 },
        { name: 'Save Your Tears', album: album1._id, duration: 215, trackNumber: 2 },
        { name: 'Don’t Start Now', album: album2._id, duration: 183, trackNumber: 1 },
        { name: 'Shape of You', album: album3._id, duration: 234, trackNumber: 1 },
    ]);

    const [history1, history2, history3] = await TrackHistory.create([
        { user: user1._id, track: track1._id, datetime: new Date() },
        { user: user2._id, track: track3._id, datetime: new Date() },
        { user: user3._id, track: track4._id, datetime: new Date() },
    ]);

    await db.close();
};


run().catch(console.error);