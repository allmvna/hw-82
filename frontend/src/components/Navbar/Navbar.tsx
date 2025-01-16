import {AppBar, Box, Container, Toolbar, Typography,} from "@mui/material";

const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <AppBar
          position="static"
          sx={{
            padding: "10px",
            borderBottom: "1px solid",
              backgroundColor: "#000000",
          }}
        >
          <Toolbar>
            <Container>
              <Typography
                variant="h5"
                sx={{color: "#ffff", textTransform: 'uppercase', textAlign: 'center' }}
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
