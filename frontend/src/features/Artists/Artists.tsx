import Grid from "@mui/material/Grid2";
import {Alert, Button, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {deleteArtist, fetchArtists, toggleArtistPublished} from "./thunkArtists.ts";
import {selectArtist, selectErrorArtist, selectLoadingArtist} from "./sliceArtists.ts";
import {selectUser} from "../users/userSlice.ts";

const Artists = () => {
    const artists = useAppSelector(selectArtist);
    const loading = useAppSelector(selectLoadingArtist);
    const error = useAppSelector(selectErrorArtist);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        try {
            if (!user?.token || user?.role !== 'admin') {
                alert("You do not have permission to delete this!");
                return;
            }
            dispatch(deleteArtist(id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleTogglePublish = (artistId: string) => {
        if (user?.role !== 'admin') {
            alert("You do not have permission to perform this action!");
            return;
        }

        dispatch(toggleArtistPublished(artistId));
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
                Error loading artists
            </Alert>
        );
    }

    if (!loading && !error && artists.length === 0) {
        return (
            <Alert severity="info" sx={{ textAlign: "center", mt: 4 }}>
               Not found artists
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
                                <Grid display='flex' alignItems='center' gap='10px'>
                                    {!artist.isPublished && user?.role === 'admin' && (
                                    <Button
                                        onClick={() => handleTogglePublish(artist._id)}
                                        variant="contained" sx={{ backgroundColor : 'black', mt: '5px'}}
                                    >
                                        Publish
                                    </Button>
                                )}
                                    {user?.role === 'admin' && (
                                        <Button
                                            variant="contained" sx={{ backgroundColor : 'black', mt: '5px'}}
                                            onClick={() => handleDelete(artist._id)}
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

export default Artists;