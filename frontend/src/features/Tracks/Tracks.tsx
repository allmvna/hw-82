import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {Alert, Button, Card, CardContent, CircularProgress, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {selectUser} from "../users/userSlice.ts";
import {addTrackToHistory} from "../TrackHistory/thunkTrackHistory.ts";
import {deleteTrack, fetchAlbumDetails, fetchTracks} from "./thunkTracks.ts";
import {selectAlbumInfo, selectErrorTracks, selectLoadingTracks, selectTrack} from "./sliceTracks.ts";

const Tracks = () => {
    const { albumName } = useParams<{ albumName: string }>();
    const albumInfo = useAppSelector(selectAlbumInfo);
    const tracks = useAppSelector(selectTrack);
    const loading = useAppSelector(selectLoadingTracks);
    const error = useAppSelector(selectErrorTracks);
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
            alert("You are not logged in!");
            return;
        }

        dispatch(addTrackToHistory({ track: trackId, token: user.token }));
    };

    const handleDelete = async (id: string) => {
        try {
            if (!user?.token || user?.role !== 'admin') {
                alert("You do not have permission to delete this!");
                return;
            }

            await dispatch(deleteTrack(id));
            if (albumName != null) {
                dispatch(fetchTracks(albumName));
            }
        } catch (error) {
            console.log("Error deleting track:", error);
        }
    };


    if (loading) {
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

    if (!loading && !error && tracks.length === 0) {
        return (
            <Alert severity="info" sx={{ textAlign: "center", mt: 4 }}>
                No tracks found in the album "{albumName}".
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
                            {user?.role === 'admin' && (
                            <Button
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'color 0.3s, transform 0.3s',
                                    '&:hover': {
                                        color: 'blue',
                                        transform: 'scale(1.2)',
                                    },
                                }}
                                onClick={() => handleDelete(track._id)}
                            >
                                Delete
                            </Button>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
};

export default Tracks;
