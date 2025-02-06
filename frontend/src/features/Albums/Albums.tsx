import {Alert, Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteAlbum, fetchAlbums, toggleAlbumPublished} from "./thunkAlbums.ts";
import {selectAlbumByArtist, selectErrorAlbum, selectLoadingAlbum} from "./sliceAlbums.ts";
import {selectUser} from "../users/userSlice.ts";


const Albums = () => {
    const { artistName } = useParams();
    const albums = useAppSelector(selectAlbumByArtist);
    const error = useAppSelector(selectErrorAlbum);
    const loading = useAppSelector(selectLoadingAlbum);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);


    useEffect(() => {
        if (artistName) {
            dispatch(fetchAlbums(artistName));
        }
    }, [artistName, dispatch]);

    const handleDelete = (id: string) => {

        if (!user?.token || user?.role !== 'admin') {
            alert("You do not have permission to delete this!");
            return;
        }

        dispatch(deleteAlbum(id));
        navigate('/');
    };

    const handleTogglePublish = (albumId: string) => {
        if (user?.role !== 'admin') {
            alert("You do not have permission to perform this action!");
            return;
        }

        dispatch(toggleAlbumPublished(albumId));
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
                                cursor: "pointer"
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
                                <Grid display='flex' alignItems='center'>
                                    {!album.isPublished && user?.role === 'admin' && (
                                        <Button
                                            onClick={() => handleTogglePublish(album._id)}
                                            variant="contained" sx={{ backgroundColor : 'black', mt: '5px'}}
                                        >
                                            Publish
                                        </Button>
                                    )}
                                    {user?.role === 'admin' && (
                                        <Button
                                            variant="contained" sx={{ backgroundColor : 'black', mt: '5px'}}
                                            onClick={() => handleDelete(album._id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Grid>
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