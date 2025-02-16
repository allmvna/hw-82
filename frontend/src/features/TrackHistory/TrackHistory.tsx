import {useEffect} from "react";
import {fetchTrackHistory} from "./thunkTrackHistory.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/userSlice.ts";
import {TrackHistoryItem} from "../../types";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import {Alert, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {selectTrackHistory, selectTrackHistoryLoading, selectTrackHistoryLoadingError} from "./sliceTrackHistory.ts";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const trackHistory = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);
    const error = useAppSelector(selectTrackHistoryLoadingError);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (user?.token) {
            dispatch(fetchTrackHistory({ token: user.token }));
        }
    }, [dispatch, user?.token]);


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
                Error loading track history
            </Alert>
        );
    }


    return (
        <>
            <Typography variant="h5" style={{ textAlign: "center", marginTop: "30px", fontWeight: 'bold', marginBottom: "20px" }}>Track History</Typography>
            {trackHistory.length > 0 ? (
                <Grid container spacing={3}>
                    {trackHistory.map((item: TrackHistoryItem) => (
                        <Grid size={12} key={item._id} mt={2}>
                            <Card>
                                <CardContent>
                                    <Typography color="success" variant="h6" fontWeight="bold">
                                        {item.trackName}
                                    </Typography>
                                    <Typography fontSize="16px" fontWeight="bold">
                                        Artist: {item.artistName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        listened to {dayjs(item.dateListened).format('MMM DD, YYYY h:mm A')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Alert severity="info">No track history found</Alert>
            )}
        </>
    );
};

export default TrackHistory;