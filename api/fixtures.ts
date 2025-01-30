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


    const [user1, user2] = await User.create([
        { username: "user@shop.com", password: "123", role: "user", token: randomUUID() },
        { username: "admin@shop.com", password: "456", role: "admin", token: randomUUID() },
    ]);

    const [artist1, artist2, artist3, artist4] = await Artist.create([
        { name: 'The Weeknd', photo: 'fixtures/weeknd.jpg', information: 'Canadian singer, songwriter, and record producer.', isPublished: true },
        { name: 'Dua Lipa', photo: 'fixtures/dualipa.jpg', information: 'British-Albanian pop singer.', isPublished: true  },
        { name: 'Ed Sheeran', photo: 'fixtures/edsheeran.webp', information: 'English singer-songwriter and musician.', isPublished: true  },
        { name: 'Eminem', photo: 'fixtures/eminem.jpg', information: 'American rapper, songwriter, and record producer', isPublished: false  },
    ]);

    const [album1, album2, album3, album4, album5, album6, album7] = await Album.create([
        { name: 'After Hours', artist: artist1._id, releaseYear: 2020, coverImage: 'fixtures/after-house.jpeg', isPublished: true  },
        { name: 'Starboy', artist: artist1._id, releaseYear: 2016, coverImage: 'fixtures/starboy.jpeg', isPublished: true  },
        { name: 'Future Nostalgia', artist: artist2._id, releaseYear: 2020, coverImage: 'fixtures/future-nostalgia.jpeg', isPublished: true  },
        { name: 'Club Future Nostalgia', artist: artist2._id, releaseYear: 2021, coverImage: 'fixtures/club-future-nostalgia.jpeg', isPublished: true  },
        { name: 'Divide', artist: artist3._id, releaseYear: 2017, coverImage: 'fixtures/divide.jpeg', isPublished: true  },
        { name: 'Multiply', artist: artist3._id, releaseYear: 2014, coverImage: 'fixtures/multiply.jpeg', isPublished: true  },
        { name: 'The Marshall Mathers LP', artist: artist4._id, releaseYear: 2000, coverImage: 'fixtures/the-marshall-mathers-lp.jpg', isPublished: false  },
    ]);

    const [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15, track16, track17, track18, track19, track20, track21, track22, track23] = await Track.create([

        { name: 'Blinding Lights', album: album1._id, duration: 200, trackNumber: 1, isPublished: true  },
        { name: 'Save Your Tears', album: album1._id, duration: 215, trackNumber: 2, isPublished: true  },
        { name: 'In Your Eyes', album: album1._id, duration: 220, trackNumber: 3, isPublished: true  },
        { name: 'Heartless', album: album1._id, duration: 190, trackNumber: 4, isPublished: true  },
        { name: 'Too Late', album: album1._id, duration: 180, trackNumber: 5, isPublished: true  },


        { name: 'Starboy', album: album2._id, duration: 210, trackNumber: 1, isPublished: true  },
        { name: 'I Feel It Coming', album: album2._id, duration: 220, trackNumber: 2 , isPublished: true },
        { name: 'Party Monster', album: album2._id, duration: 230, trackNumber: 3, isPublished: true  },
        { name: 'Reminder', album: album2._id, duration: 200, trackNumber: 4, isPublished: true  },
        { name: 'Rockin', album: album2._id, duration: 225, trackNumber: 5, isPublished: true  },


        { name: 'Don’t Start Now', album: album3._id, duration: 183, trackNumber: 1, isPublished: true  },
        { name: 'Physical', album: album3._id, duration: 195, trackNumber: 2, isPublished: true  },
        { name: 'Levitating', album: album3._id, duration: 200, trackNumber: 3, isPublished: true  },
        { name: 'Break My Heart', album: album3._id, duration: 210, trackNumber: 4, isPublished: true  },
        { name: 'Good in Bed', album: album3._id, duration: 180, trackNumber: 5, isPublished: true  },


        { name: 'Physical (Mark Ronson Remix)', album: album4._id, duration: 230, trackNumber: 1, isPublished: true  },
        { name: 'Levitating (The Blessed Madonna Remix)', album: album4._id, duration: 240, trackNumber: 2, isPublished: true  },
        { name: 'Hallucinate (Paul Woolford Remix)', album: album4._id, duration: 220, trackNumber: 3, isPublished: true  },
        { name: 'Don’t Start Now (Dominic Fike Remix)', album: album4._id, duration: 210, trackNumber: 4, isPublished: true  },
        { name: 'Break My Heart (Jax Jones Midnight Snack Remix)', album: album4._id, duration: 225, trackNumber: 5, isPublished: true  },


        { name: 'Shape of You', album: album5._id, duration: 234, trackNumber: 1, isPublished: true  },
        { name: 'Castle on the Hill', album: album5._id, duration: 215, trackNumber: 2, isPublished: true  },
        { name: 'Galway Girl', album: album5._id, duration: 205, trackNumber: 3, isPublished: true  },
        { name: 'Perfect', album: album5._id, duration: 210, trackNumber: 4, isPublished: true  },
        { name: 'Happier', album: album5._id, duration: 215, trackNumber: 5, isPublished: true  },


        { name: 'Sing', album: album6._id, duration: 230, trackNumber: 1, isPublished: true  },
        { name: 'Don’t', album: album6._id, duration: 240, trackNumber: 2, isPublished: true  },
        { name: 'Nina', album: album6._id, duration: 200, trackNumber: 3, isPublished: true  },
        { name: 'The Man', album: album6._id, duration: 225, trackNumber: 4, isPublished: true  },
        { name: 'Tenerife Sea', album: album6._id, duration: 215, trackNumber: 5, isPublished: true  },

        { name: 'Stan', album: album7._id, duration: 220, trackNumber: 1, isPublished: false  },
        { name: 'The Real Slim Shady', album: album7._id, duration: 215, trackNumber: 2, isPublished: false  },
        { name: 'The Way I Am', album: album7._id, duration: 210, trackNumber: 3, isPublished: false  },
    ]);

    const [history1, history2, history3] = await TrackHistory.create([
        { user: user1._id, track: track1._id, datetime: new Date() },
        { user: user2._id, track: track3._id, datetime: new Date() },
    ]);

    await db.close();
};


run().catch(console.error);