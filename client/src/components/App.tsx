import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostsList } from "./posts/posts-list";

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  defaultRadius: "md",
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <h1>MatchTail</h1>
      <Router>
        <Routes>
          <Route path="/postsList" element={<PostsList />}></Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};


export { App };