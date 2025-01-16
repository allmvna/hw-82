import {Alert, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbums} from "./sliceAlbums.tsx";
import {Link, useParams} from "react-router-dom";


const Albums = () => {
    const { artistName } = useParams();
    const { albums,isLoading, error } = useAppSelector((state) => state.albums);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (artistName) {
            dispatch(fetchAlbums(artistName));
        }
    }, [artistName, dispatch]);

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
                Error loading albums
            </Alert>
        );
    }

    return (
        <>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: "#000" }}>
                Albums of {artistName}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {albums.map((album) => (
                    <Grid size={4} key={album.name}>
                        <Link to={`/albums/${album.name}/tracks`} style={{ textDecoration: "none" }}>
                        <Card sx={{ minWidth: 300, border: "3px solid #ddd", borderRadius: "10px" }}>
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
                                            width: "300px",
                                            height: "400px",
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