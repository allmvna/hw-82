import Grid from "@mui/material/Grid2";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import axiosAPI from "../../axiosAPI.ts";
import {useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { fetchArtists } from "./sliceArtists.tsx";

const Artists = () => {
    const { artists } = useAppSelector((state) => state.artists);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);


    return (
        <>
            <Typography
                variant="h4"
                sx={{ mb: 2, textAlign: "center", color: "#000" }}
            >
                Artists
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {artists.map((artist) => (
                    <Grid size={4} key={artist.name}>
                        <Card
                            sx={{
                                minWidth: 300,
                                border: "3px solid #ddd",
                                borderRadius: "10px",
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                {artist.photo && (
                                    <CardMedia
                                        component="img"
                                        src={`${axiosAPI.defaults.baseURL}/${artist.photo}`}
                                        title={artist.name}
                                        sx={{
                                            borderRadius: "8px",
                                            width: "300px",
                                            height: "400px",
                                            mb: 2
                                        }}
                                    />
                                )}
                                <Typography
                                    sx={{ fontSize: 25, fontWeight: "bold", flexGrow: 1 }}
                                >
                                    {artist.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Artists;