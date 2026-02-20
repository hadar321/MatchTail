import "@mantine/core/styles.css";
import { createTheme, Flex, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostsList } from "./posts/posts-list";
import { Header } from "./home/header";
import { LoginForm } from "./authentication/login";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  defaultRadius: "md",
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Flex h={"100%"} align={"center"} justify={"center"}>
        <LoginForm />
      </Flex>
      <Router>
        <Routes>
          <Route path="/postsList" element={<PostsList />}></Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};


export { App };