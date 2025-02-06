import {Route, Routes} from "react-router-dom";
import Artists from "./features/Artists/Artists.tsx";
import Albums from "./features/Albums/Albums.tsx";
import {Alert, Container} from "@mui/material";
import Tracks from "./features/Tracks/Tracks.tsx";
import TrackHistory from "./features/TrackHistory/TrackHistory.tsx";
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import AlbumForm from "./features/Albums/component/AlbumForm.tsx";
import ArtistForm from "./features/Artists/component/ArtistForm.tsx";
import TrackForm from "./features/Tracks/component/TrackForm.tsx";

const App = () => {

  return (
      <>
          <header>
              <AppToolbar/>
          </header>
          <main>
              <Container>
                  <Routes>
                      <Route path="/" element={<Artists/>}/>
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/artists" element={<Artists/>}/>
                      <Route path="/new_album" element={<AlbumForm/>}/>
                      <Route path="/new_track" element={<TrackForm/>}/>
                      <Route path="/new_artist" element={<ArtistForm/>}/>
                      <Route path="/albums/:artistName" element={<Albums />} />
                      <Route path="/albums/:albumName/tracks" element={<Tracks />} />
                      <Route path="/track_history" element={<TrackHistory/>}/>
                      <Route path="*" element={<Alert severity="error">Page not found</Alert>}/>
                  </Routes>
              </Container>
          </main>
      </>
  );
};
export default App;
