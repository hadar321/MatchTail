import "@mantine/core/styles.css";
import { createTheme, Flex, MantineProvider, Drawer, NavLink, Button, Burger } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { PostsList } from "./posts/posts-list";
import { Header } from "./home/header";
import { LoginForm } from "./authentication/login";
import { SignUpForm } from "./authentication/sign-up-form";
import { Search } from "./search";
import { Profile } from "./profile";
import { CreatePost } from "./create-post";
import { IconSearch, IconUser, IconLogout, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

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

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const isAuthenticatedRoute = ['/postsList', '/search', '/profile', '/createPost'].includes(location.pathname);

  return (
    <div style={backgroundStyle}>
      <Flex h={"100%"} align={"center"} justify={"center"} style={{ width: '100%', position: 'relative' }}>
        <Header />
        {isAuthenticatedRoute && (
          <Burger
            opened={drawerOpened}
            onClick={() => setDrawerOpened((o) => !o)}
            size="lg"
            style={{ position: 'absolute', left: 50, top: 50 }}
          />
        )}
      </Flex>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="Menu"
        padding="lg"
        size="md"
      >
        <Flex direction="column" h="100%">
          <div>
            <NavLink
              label="Posts"
              leftSection={<IconUser size="1rem" />}
              onClick={() => { navigate('/postsList'); setDrawerOpened(false); }}
            />
            <NavLink
              label="Create Post"
              leftSection={<IconPlus size="1rem" />}
              onClick={() => { navigate('/createPost'); setDrawerOpened(false); }}
            />
            <NavLink
              label="Search"
              leftSection={<IconSearch size="1rem" />}
              onClick={() => { navigate('/search'); setDrawerOpened(false); }}
            />
            <NavLink
              label="Profile"
              leftSection={<IconUser size="1rem" />}
              onClick={() => { navigate('/profile'); setDrawerOpened(false); }}
            />
          </div>
          <Button
            bottom={1}
            leftSection={<IconLogout size="2rem" />}
            onClick={() => { navigate('/'); setDrawerOpened(false); }}
            style={{ marginTop: 'auto' }}
          >
            Logout
          </Button>
        </Flex>
      </Drawer>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/postsList" element={<PostsList />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </MantineProvider>
  );
};

export { App };