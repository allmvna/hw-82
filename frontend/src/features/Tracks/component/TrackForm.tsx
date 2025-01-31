import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {createTrack} from "../thunkTracks.ts";
import {selectLoadingTracks} from "../sliceTracks.ts";
import {selectALlAlbums} from "../../Albums/sliceAlbums.ts";
import {fetchAllAlbums} from "../../Albums/thunkAlbums.ts";


const initialState = {
    name: '',
    album: '',
    duration: '',
    trackNumber: 0,
};

const TrackForm = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useAppDispatch();
    const allAlbums = useAppSelector(selectALlAlbums);
    const loading = useAppSelector(selectLoadingTracks);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllAlbums());
    }, [dispatch]);


    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.album || !form.trackNumber) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await dispatch(createTrack(form));
            setForm(initialState);
            navigate('/');
        } catch (error) {
            console.error('Error adding track:', error);
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const selectChangeHandler = (e: SelectChangeEvent<string>) => {
        setForm((prevState) => ({ ...prevState, album: e.target.value }));
    };


    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    mt: 4,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    color: '#041f4e',
                }}
            >
                Add New Track
            </Typography>
            <form onSubmit={submitFormHandler}>
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    sx={{
                        maxWidth: 500,
                        margin: '0 auto',
                        mt: 4,
                        padding: '20px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
                    }}
                >
                    <Grid>
                        <TextField
                            id="name"
                            name="name"
                            label="Track name"
                            value={form.name}
                            onChange={inputChangeHandler}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <FormControl fullWidth>
                            <InputLabel id="album-label">Album</InputLabel>
                            <Select
                                labelId="album-label"
                                id="album"
                                name="album"
                                value={form.album}
                                label="Album"
                                onChange={selectChangeHandler}
                                fullWidth
                            >
                                {loading ? (
                                    <MenuItem value="">Loading...</MenuItem>
                                ) : (
                                    allAlbums.map((album) => (
                                        <MenuItem key={album._id} value={album._id}>
                                            {album.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid>
                        <TextField
                            id="duration"
                            name="duration"
                            label="Duration"
                            value={form.duration}
                            onChange={inputChangeHandler}
                            fullWidth
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            id="trackNumber"
                            name="trackNumber"
                            label="Track Number"
                            value={form.trackNumber}
                            onChange={inputChangeHandler}
                            fullWidth
                            type="number"
                        />
                    </Grid>

                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: 'linear-gradient(90deg, #1E3A8A, #2563EB)',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                padding: '12px',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #2563EB, #1E3A8A)',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                                },
                            }}
                        >
                            Create Track
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default TrackForm;
