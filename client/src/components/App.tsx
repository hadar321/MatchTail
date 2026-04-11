import "@mantine/core/styles.css";
import { createTheme, Flex, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostsList } from "./posts/posts-list";
import { Header } from "./home/header";
import { LoginForm } from "./authentication/login";
import { SignUpForm } from "./authentication/sign-up-form";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  defaultRadius: "md",
});

const backgroundStyle: React.CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(180deg, #FFEDD5 0%, #FFF7ED 25%, #FFFFFF 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme} >
      {/* <Header /> */}
      <div style={backgroundStyle}>
        <Flex h={"100%"} align={"center"} justify={"center"}>
          <Header />
        </Flex>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/postsList" element={<PostsList />}></Route>
            <Route path="/signup" element={<SignUpForm />}></Route>
          </Routes>
        </Router>
      </div>
    </MantineProvider>
  );
};


export { App };