import  { ChangeEvent, FormEvent, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import {createArtist} from "../thunkArtists.ts";
import FileInput from "../../../components/FileInput/FileInput.tsx";

const initialState = {
    name: "",
    information: "",
    photo: null as File | null,
};

const ArtistForm = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.information || !form.photo) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('information', form.information);

        if (form.photo) {
            formData.append('photo', form.photo);
        }

        try {
            await dispatch(createArtist(formData));
            setForm(initialState);
            navigate("/");
        } catch (error) {
            console.error("Error when adding artist:", error);
        }
    };


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const fileEventChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
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
                Add New Artist
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
                            label="Artist Name"
                            value={form.name}
                            onChange={inputChangeHandler}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            id="information"
                            name="information"
                            label="Information"
                            value={form.information}
                            onChange={inputChangeHandler}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid>
                        <FileInput
                            name="photo"
                            label="Artist Photo"
                            onGetFile={fileEventChangeHandler}
                        />
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
                                borderRadius: "20px",
                                textTransform: "uppercase",
                                padding: "12px",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #2563EB, #1E3A8A)",
                                    transform: "scale(1.05)",
                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                },
                            }}
                        >
                            Create Artist
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ArtistForm;
