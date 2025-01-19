import {AppBar, Box, Button, Container, Toolbar, Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {NavLink} from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <AppBar
          position="static"
          sx={{
            padding: "10px",
              border: 'none',
              background: "linear-gradient(to top, #003366, #000000)"
          }}
        >
          <Toolbar>
              <Container>
                  <Grid container spacing={2} justifyContent='space-between'>
                      <Typography
                          variant="h5"
                          sx={{color: "#ffff", textTransform: 'uppercase'}}
                      >
                          Music App
                      </Typography>
                      <Button component={NavLink} to="/users" variant='outlined'
                              sx={{
                                  color:'white',
                                  borderColor: 'white',
                                  marginLeft: 'auto',
                                  '&:hover': {
                                      color: 'blue',
                                      borderColor: 'blue',
                                      transform: "scale(1.05)",
                                      transition: "all 0.3s ease",
                                  }
                      }}>
                          Sign up
                      </Button>
                      <Button component={NavLink} to="/login" variant='outlined'
                              sx={{
                                  color:'white',
                                  borderColor: 'white',
                                  '&:hover': {
                                      color: 'blue',
                                      borderColor: 'blue',
                                      transform: "scale(1.05)",
                                      transition: "all 0.3s ease",
                                  }
                              }}>
                          Sign in
                      </Button>
                  </Grid>
              </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
