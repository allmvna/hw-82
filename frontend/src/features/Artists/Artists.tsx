import Grid from "@mui/material/Grid2";
import {Alert, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchArtists} from "./sliceArtists.ts";
import {Link} from "react-router-dom";

const Artists = () => {
    const { artists, isLoading, error } = useAppSelector((state) => state.artists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

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
                Error loading artists
            </Alert>
        );
    }

    return (
        <>
            <Typography
                variant="h4"
                sx={{ mb: 2, textAlign: "center", fontWeight: 'bold', mt: 3 }}
            >
                Artists
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {artists.map((artist) => (
                    <Grid size={4} key={artist.name}>
                        <Link to={`/albums/${artist.name}`} style={{ textDecoration: "none" }}>
                        <Card
                            sx={{
                                minWidth: 300,
                                borderRadius: "10px",
                                cursor: "pointer",
                                '&:hover': {
                                    transform: "scale(1.05)",
                                    transition: "all 0.3s ease",
                                },
                                transition: "all 0.3s ease",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "center",
                                    alignItems: "center",
                                }}
                            >
                                {artist.photo && (
                                    <CardMedia
                                        component="img"
                                        src={`${axiosAPI.defaults.baseURL}/${artist.photo}`}
                                        title={artist.name}
                                        sx={{
                                            borderRadius: "10px",
                                            width: "100%",
                                            height: "500px",
                                            objectFit: "cover",
                                            mb: 2,
                                        }}
                                    />
                                )}
                                <Typography
                                    sx={{ fontSize: 25, fontWeight: "bold", flexGrow: 1, color: 'grey' }}
                                >
                                    {artist.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>

                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Artists;