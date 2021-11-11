import React from "react";
import { Container } from "@material-ui/core";
import TopBar from "./components/TopBar";

function MainLayout({children}) {
  return (
    <Container maxWidth={false} >
      <TopBar />
      {children}
    </Container>
  );
}



export default MainLayout;
