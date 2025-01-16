import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbums} from "./sliceAlbums.tsx";
import {useParams} from "react-router-dom";


const Albums = () => {
    const { artistName } = useParams();
    const { albums } = useAppSelector((state) => state.albums);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (artistName) {
            dispatch(fetchAlbums(artistName));
        }
    }, [artistName, dispatch]);

    return (
        <>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center", color: "#000" }}>
                Albums of {artistName}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {albums.map((album) => (
                    <Grid size={4} key={album.name}>
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
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
export default Albums;