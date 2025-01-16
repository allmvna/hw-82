import Navbar from "./components/Navbar/Navbar.tsx";
import {Container} from "@mui/material";
import Artists from "./features/Artists/Artists.tsx";

const App = () => {
  return (
    <>
      <header><Navbar/></header>
      <main>
          <Container>
              <Artists/>
          </Container>
      </main>
    </>
  );
};

export default App;
