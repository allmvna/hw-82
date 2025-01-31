import {Alert, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchAlbums} from "./thunkAlbums.ts";
import {selectAlbumByArtist, selectErrorAlbum, selectLoadingAlbum} from "./sliceAlbums.ts";


const Albums = () => {
    const { artistName } = useParams();
    const albums = useAppSelector(selectAlbumByArtist);
    const error = useAppSelector(selectErrorAlbum);
    const loading = useAppSelector(selectLoadingAlbum);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (artistName) {
            dispatch(fetchAlbums(artistName));
        }
    }, [artistName, dispatch]);


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
                Error loading albums
            </Alert>
        );
    }


    if (!loading && !error && albums.length === 0) {
        return (
            <Alert severity="info" sx={{ textAlign: "center", mt: 4 }}>
                No albums found for {artistName}.
            </Alert>
        );
    }

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: 'bold', mt: 3 }}>
                Albums of {artistName}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {albums.map((album) => (
                    <Grid size={4} key={album.name}>
                        <Link to={`/albums/${album.name}/tracks`} style={{ textDecoration: "none" }}>
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
                                    alignItems: "center",
                                }}
                            >
                                {album.coverImage && (
                                    <CardMedia
                                        component="img"
                                        src={`${axiosAPI.defaults.baseURL}/${album.coverImage}`}
                                        title={album.name}
                                        sx={{
                                            borderRadius: "8px",
                                            width: "100%",
                                            height: "500px",
                                            objectFit: "cover",
                                            mb: 2,
                                        }}
                                    />
                                )}
                                <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                                    {album.name}
                                </Typography>
                                <Typography sx={{ fontSize: 20 }}>
                                    {album.releaseYear}
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
export default Albums;