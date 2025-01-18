import {AppBar, Box, Container, Toolbar, Typography,} from "@mui/material";

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
              <Typography
                variant="h5"
                sx={{color: "#ffff", textTransform: 'uppercase'}}
              >
                 Music App
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
