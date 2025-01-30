import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {fetchAlbumDetails, fetchTracks} from "./sliceTracks.ts";
import {Alert, Button, Card, CardContent, CircularProgress, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {selectUser} from "../users/userSlice.ts";
import {addTrackToHistory} from "../TrackHistory/thunkTrackHistory.ts";

const Tracks = () => {
    const { albumName } = useParams<{ albumName: string }>();
    const { tracks, albumInfo, isLoading, error } = useAppSelector((state) => state.tracks);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (albumName) {
            dispatch(fetchTracks(albumName));
            dispatch(fetchAlbumDetails(albumName));
        }
    }, [albumName, dispatch]);

    const handleClick = (trackId: string) => {
        if (!user?.token) {
            alert("Вы не авторизованы!");
            return;
        }

        dispatch(addTrackToHistory({ track: trackId, token: user.token }));
    };

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error" style={{ marginTop: "20px", textAlign: "center" }}>
                Error loading tracks
            </Alert>
        );
    }

    return (
        <>
            {albumInfo && (
                <Typography variant="h5" style={{ textAlign: "center", marginTop: "30px", fontWeight: 'bold' }}>
                    {albumInfo.artistName} - {albumInfo.albumName}
                </Typography>
            )}

            <Typography variant="h4" style={{color: 'white', textAlign: "center", marginTop: "20px"}}>
                Tracks
            </Typography>
            <Grid container spacing={3} style={{ padding: "20px" }}>
            {tracks?.map((track) => (
                <Grid size={12} key={track.name}>
                    <Card sx={{borderRadius: '15px', cursor: 'pointer'}}>
                        <CardContent  sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                          <Grid size={8}>
                              <Typography variant="h6" gutterBottom>
                                  {track.trackNumber}. {track.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                  Duration: {track.duration} sec
                              </Typography>
                          </Grid>
                            <Grid size={4}
                                  sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      mr: 4
                            }}>
                                {user && (
                                    <Button
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'color 0.3s, transform 0.3s',
                                            '&:hover': {
                                                color: 'blue',
                                                transform: 'scale(1.2)',
                                            },
                                        }}
                                        onClick={() => handleClick(track._id)}
                                    >Play</Button>
                                )}

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
};

export default Tracks;
