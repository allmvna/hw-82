import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {createAlbum} from "../thunkAlbums.ts";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import {selectLoadingAlbum} from "../sliceAlbums.ts";
import {selectArtist} from "../../Artists/sliceArtists.ts";
import {fetchArtists} from "../../Artists/thunkArtists.ts";


interface FormState {
    name: string;
    artist: string;
    releaseYear: string;
    coverImage: File | null;
}

const initialState: FormState = {
    name: "",
    artist: "",
    releaseYear: "",
    coverImage: null,
};

const AlbumForm = () => {
    const [form, setForm] = useState(initialState);
    const artists = useAppSelector(selectArtist);
    const loading = useAppSelector(selectLoadingAlbum);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);


    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.artist || !form.releaseYear || !form.coverImage) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('artist', form.artist);
        formData.append('releaseYear', form.releaseYear);
        formData.append('coverImage', form.coverImage);

        try {
            await dispatch(createAlbum(formData));
            setForm(initialState);
            navigate('/');
        } catch (error) {
            console.error('Error creating album:', error);
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: name === "releaseYear" ? (value ? Number(value) : "") : value,
        }));
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const selectChangeHandler = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };


    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    mt: 4,
                    textAlign: "center",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    color: "#041f4e",
                }}
            >
                Add New Album
            </Typography>
            <form onSubmit={submitFormHandler}>
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sx={{
                        maxWidth: 500,
                        margin: "0 auto",
                        mt: 4,
                        padding: "20px",
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.9)",
                    }}
                >
                    <Grid>
                        <TextField
                            id="name"
                            name="name"
                            label="Album name"
                            value={form.name || ""}
                            onChange={inputChangeHandler}
                            fullWidth
                            type="text"
                        />
                    </Grid>

                    <FormControl fullWidth>
                        <InputLabel id="artist-label">Artist</InputLabel>
                        <Select
                            labelId="artist-label"
                            id="artist"
                            name="artist"
                            value={form.artist}
                            label="Artist"
                            onChange={selectChangeHandler}
                            fullWidth
                        >
                            {loading ? (
                                <MenuItem value="">Loading...</MenuItem>
                            ) : (
                                (artists || []).map((artist) => (
                                    <MenuItem key={artist._id} value={artist._id}>
                                        {artist.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>

                    <Grid>
                        <TextField
                            id="releaseYear"
                            name="releaseYear"
                            label="Release Year"
                            value={form.releaseYear || ""}
                            onChange={inputChangeHandler}
                            fullWidth
                            type="number"
                        />
                    </Grid>

                    <Grid>
                        <FileInput
                            name="coverImage"
                            label="Cover Image"
                            onGetFile={fileEventChangeHandler}
                        />
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: loading ? "gray" : "linear-gradient(90deg, #1E3A8A, #2563EB)",
                                borderRadius: "20px",
                                textTransform: "uppercase",
                                padding: "12px",
                                opacity: loading ? 0.5 : 1,
                                "&:hover": {
                                    background: loading ? "gray" : "linear-gradient(90deg, #2563EB, #1E3A8A)",
                                    transform: loading ? "none" : "scale(1.05)",
                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                },
                            }}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Album"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default AlbumForm;
