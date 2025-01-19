import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import {fetchAlbumDetails, fetchTracks } from "./sliceTracks.ts";
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Tracks = () => {
    const { albumName } = useParams<{ albumName: string }>();
    const { tracks, albumInfo, isLoading, error } = useAppSelector((state) => state.tracks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (albumName) {
            dispatch(fetchTracks(albumName));
            dispatch(fetchAlbumDetails(albumName));
        }
    }, [albumName, dispatch]);

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
                <Typography variant="h4" style={{ textAlign: "center", color: 'white', marginTop: "20px", fontWeight: 'bold' }}>
                    {albumInfo.artistName} - {albumInfo.albumName}
                </Typography>
            )}

            <Typography variant="h4" style={{color: 'white', textAlign: "center", marginTop: "20px", textDecoration: 'underline' }}>
                Tracks
            </Typography>
            <Grid container spacing={3} style={{ padding: "20px" }}>
            {tracks?.map((track) => (
                <Grid size={12} key={track.name}>
                    <Card sx={{borderRadius: '15px', cursor: 'pointer'}}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {track.trackNumber}. {track.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Duration: {track.duration} sec
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
};

export default Tracks;
