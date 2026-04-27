import { useForm } from "@mantine/form";
import { Button, Card, Stack, TextInput, PasswordInput, Title, Container, Text, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { login as apiLogin, googleLogin as apiGoogleLogin } from "../../api/auth";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      },
    validate: {
      email: (value) => (value.trim() ? null : "Email is required"),
      password: (value) => (value.trim() ? null : "Password is required"),
    },
  });
    
    const handleGoogleSuccess = async (credentialResponse: any) => {
      try {
        const credential = credentialResponse.credential;
        const data = await apiGoogleLogin(credential);
        if (data && data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
          if (data._id) localStorage.setItem("userId", data._id);
          navigate("/postsList");
        } else {
          alert("Google Login failed: no token returned");
        }
      } catch (err: unknown) {
        console.error("Google Login Error:", err);
        alert("Google Login failed");
      }
    };

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
          const data = await apiLogin(values.email, values.password);
          // expected { accessToken, refreshToken, _id }
          if (data && data.accessToken) {
            localStorage.setItem("token", data.accessToken);
            if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
            if (data._id) localStorage.setItem("userId", data._id);
            navigate("/postsList");
          } else {
            alert("Login failed: no token returned");
          }
        } catch (err: unknown) {
          const error = err as { response?: { data?: any; status?: number }; message?: string };
          const resp = error?.response?.data;
          let msg: string;
          if (typeof resp === 'string') msg = resp;
          else if (resp && typeof resp === 'object') msg = resp.message ?? JSON.stringify(resp);
          else msg = error?.message ?? 'Login failed';
          alert(msg);
        }
    };

  return (
    <Container size="xs" mt={120}>
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack gap="md">
            <Title order={2} ta="center" fw={700} c="blue.7" mb="sm">Welcome Back</Title>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              radius="md"
              key={form.key("email")}
              {...form.getInputProps("email")}
              error={form.errors.email}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              radius="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
              error={form.errors.password}
            />
            <Button type="submit" radius="md" mt="md" fullWidth>Log In</Button>
            <Group justify="center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google Login Failed")}
              />
            </Group>
            <Text c="dimmed" size="sm" ta="center" mt="md">
              Don't have an account?{" "}
              <Text 
                component="span" 
                c="blue" 
                style={{ cursor: "pointer" }} 
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Text>
            </Text>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export { LoginForm };