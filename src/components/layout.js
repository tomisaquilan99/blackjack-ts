import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  styled,
} from "@mui/material";

const MyAppBar = styled(AppBar)({
  backgroundColor: "#2196F3",
});

const FullWidthContainer = styled(Container)({
  position: "relative",
  "@media (min-width: 600px)": {
    paddingTop: 100,
    maxWidth: "initial",
  },
});

const BackgroundDiv = styled("div")({
  backgroundImage: `url(https://img.freepik.com/vector-premium/fondo-mesa-poker-color-verde_47243-1094.jpg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: -1,
});

const Layout = ({ children }) => {
  return (
    <div>
      <CssBaseline />
      <MyAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Mi Aplicación</Typography>
        </Toolbar>
      </MyAppBar>
      <BackgroundDiv />
      <FullWidthContainer>{children}</FullWidthContainer>
    </div>
  );
};

export default Layout;
