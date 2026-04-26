import { useForm } from "@mantine/form";
import { Button, Card, Stack, TextInput, Title, Container, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../api/auth";

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
            <Title order={2} align="center" fw={700} c="blue.7" mb="sm">Welcome Back</Title>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              radius="md"
              key={form.key("email")}
              {...form.getInputProps("email")}
              error={form.errors.email}
            />
            <TextInput
              type="password"
              label="Password"
              placeholder="Your password"
              radius="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
              error={form.errors.password}
            />
            <Button type="submit" radius="md" mt="md" fullWidth>Log In</Button>
            <Text c="dimmed" size="sm" align="center" mt="md">
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